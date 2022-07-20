from statistics import mean, stdev
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from numpy import mean,std
from sklearn import metrics
from sklearn.model_selection import cross_val_score,train_test_split
from sklearn.feature_extraction.text import CountVectorizer,TfidfTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import pandas as pd
import numpy as np
import re
import nltk
import pickle
nltk.download('stopwords')
nltk.download('wordnet')

def preprocess(X):
    
    documents = []
    for sen in range(0, len(X)):
        # Remove all the special characters
        document = re.sub(r'\W', ' ', str(X[sen]))

        # remove all single characters
        document = re.sub(r'\s+[a-zA-Z]\s+', ' ', document)

        # Remove single characters from the start
        document = re.sub(r'\^[a-zA-Z]\s+', ' ', document) 

        # Substituting multiple spaces with single space
        document = re.sub(r'\s+', ' ', document, flags=re.I)

        # Converting to Lowercase
        document = document.lower()

        # Lemmatization
        document = document.split()

        document = [stemmer.lemmatize(word) for word in document]
        document = ' '.join(document)

        documents.append(document)
    return documents

def vectorize_train(X_train):
    vectorizer = CountVectorizer(max_features=2500, min_df=5, max_df=0.9, stop_words=stopwords.words('english'))
    X_train_vectorized = vectorizer.fit_transform(X_train).toarray()
    filename = 'vectorizer_model.sav'
    pickle.dump(vectorizer, open(filename, 'wb'))
    return X_train_vectorized
	
def vectorize_test(X_test):
    pickled_model = pickle.load(open('vectorizer_model.sav', 'rb'))    # Load trained model
    X_test_vectorized = pickled_model.transform(X_test).toarray()
    return X_test_vectorized

def tfidf_train(X_train):
    tfidfconverter = TfidfTransformer()
    train_data_tfidf = tfidfconverter.fit_transform(X_train).toarray()
    filename = 'tfidf_model.sav'
    pickle.dump(tfidfconverter, open(filename, 'wb'))
    return train_data_tfidf

def tfidf_test(X_test):
    pickled_model = pickle.load(open('tfidf_model.sav', 'rb'))    # Load trained model
    test_data_tfidf = pickled_model.transform(X_test).toarray()
    return test_data_tfidf


################################################# CODE STARTS HERE ########################################################
data=pd.read_csv('hebakharya2.csv',nrows=3780)
#data=data.head(10000)
data = np.asanyarray(data)

stemmer = WordNetLemmatizer()
stop_words = stopwords.words('english')
X = data["tags"]
y = data["title"]
y = y.astype(int)


#Train-Test-Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

#Train Data Preprocessing
x_train_preprocessed = preprocess(X_train)
x_train_vectorized = vectorize_train(x_train_preprocessed)
x_train_tfidf = tfidf_train(x_train_vectorized)

#Model Training
clf_rf = RandomForestClassifier(n_estimators=2000, random_state=0)
clf_rf.fit(x_train_tfidf, y_train)

#Model Saving
filename = 'suicide_model.sav'
pickle.dump(clf_rf, open(filename, 'wb'))

#Test Data Preprocessing
x_test_preprocessed = preprocess(X_test)
x_test_vectorized = vectorize_test(x_test_preprocessed)
x_test_tfidf = tfidf_test(x_test_vectorized)

#Model Prediction
pickled_model = pickle.load(open('suicide_model.sav', 'rb'))

y_pred = pickled_model.predict(x_test_tfidf)
print("Accuracy-Majority Vote:",metrics.accuracy_score(y_test, y_pred)*100)
print('--------------------------------------------------')

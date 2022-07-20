import numpy as np
import pandas

import nltk
import keras

from keras.models import Sequential
from keras.layers import Dense
import matplotlib.pyplot as plt
import numpy
import tensorflow as tf
import numpy as np

from keras.models import Sequential
from keras.layers import Dense

from sklearn.preprocessing import LabelEncoder

from keras.preprocessing.text import Tokenizer

from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense , Activation , Dropout

import keras.preprocessing.text
import pandas as pd
import numpy as np
from flask_cors import CORS
print("all good")
import nltk
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('stopwords')
lst_stopwords = nltk.corpus.stopwords.words("english")
lst_stopwords
import json
import pandas as pd
import numpy as np## for plotting
import matplotlib.pyplot as plt
# import seaborn as sns## for processing
import re
import nltk## for bag-of-words

from tensorflow.keras import models, layers, preprocessing as kprocessing
from tensorflow.keras import backend as K## for bert language model
# import transformers
import pandas
# import string
import nltk
import keras
# import sklearn
# import time
from keras.models import Sequential
from keras.layers import Dense
import matplotlib.pyplot as plt
import numpy
import tensorflow as tf
import numpy as np
# from time import time
# from nltk.corpus import stopwords
# from pandas import read_csv
# from pandas.plotting import scatter_matrix
# from matplotlib import pyplot
from keras.models import Sequential
from keras.layers import Dense
# from keras.wrappers.scikit_learn import KerasClassifier
# from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import LabelEncoder
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.model_selection import StratifiedKFold
# from sklearn.preprocessing import StandardScaler
# from sklearn.pipeline import Pipeline
# from keras.callbacks import TensorBoard
from keras.preprocessing.text import Tokenizer
# from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense , Activation , Dropout
# from sklearn.linear_model import LogisticRegression
# from sklearn.preprocessing import LabelBinarizer
# from sklearn.preprocessing import MultiLabelBinarizer
import keras.preprocessing.text
dataframe = pandas.read_csv("hania.csv", header=0)
# dataframe.drop_duplicates(inplace = True)
data= dataframe

print(dataframe.head())
def utils_preprocess_text(text, flg_stemm=False, flg_lemm=True, lst_stopwords=None):
    ## clean (convert to lowercase and remove punctuations and   
    ##characters and then strip)
    text = re.sub(r'[^\w\s]', '', str(text).lower().strip())
            
    ## Tokenize (convert from string to list)
    lst_text = text.split()    ## remove Stopwords
    if lst_stopwords is not None:
        lst_text = [word for word in lst_text if word not in 
                    lst_stopwords]
                
    ## Stemming (remove -ing, -ly, ...)
    if flg_stemm == True:
        ps = nltk.stem.porter.PorterStemmer()
        lst_text = [ps.stem(word) for word in lst_text]
                
    ## Lemmatisation (convert the word into root word)
    if flg_lemm == True:
        lem = nltk.stem.wordnet.WordNetLemmatizer()
        lst_text = [lem.lemmatize(word) for word in lst_text]
            
    ## back to string from list
    text = " ".join(lst_text)
    return text
print(type(data['Title']))
dataframe["Title_clean"] = dataframe["Title"].apply(lambda x: 
          utils_preprocess_text(x, flg_stemm=False, flg_lemm=True,
                                lst_stopwords=lst_stopwords))
dataframe.head(10)

train_size = int(len(data) * .8)

print(int(len(data['Title'])))
print(train_size)
fig, ax = plt.subplots()
fig.suptitle("Tags", fontsize=12)
dataframe["Tags"].reset_index().groupby("Tags").count().sort_values(by= 
       "index").plot(kind="barh", legend=False, 
        ax=ax).grid(axis='x')

print(dataframe['Tags'].value_counts())
print("el taaaaiiillll")
print(dataframe.tail())
texts= data['Title_clean']
tags = data['Tags']
from sklearn.utils import shuffle
print("before")
print(tags.head())
print(texts.head())

texts , tags = shuffle(texts , tags,random_state=0)
train_posts = data['Title_clean'][:train_size]
train_tags = data['Tags'][:train_size]
print("after")
print(tags.head())
print(texts.head())

test_posts = data['Title_clean'][train_size:]
test_tags =  data['Tags']
tokenizer = Tokenizer(num_words=None,lower=False)
tokenizer.fit_on_texts(texts)

x_train = tokenizer.texts_to_matrix(train_posts, mode='tfidf')
x_test = tokenizer.texts_to_matrix(test_posts, mode='tfidf')
print(tags.head())
encoder = LabelEncoder()
encoder.fit(tags)
tagst=encoder.fit_transform(tags)

num_classes = int((len(set(tagst))))
print((len(set(tagst))))
print(tagst[3])
y_train = encoder.fit_transform(train_tags)
y_test = encoder.fit_transform(test_tags)

from keras.utils import np_utils
y_train= keras.utils.np_utils.to_categorical(y_train,num_classes)
y_test = keras.utils.np_utils.to_categorical(y_test, num_classes)


num_labels = int(len(y_train.shape))
vocab_size = len(tokenizer.word_index) + 1

max_words=vocab_size

import keras.backend as K
def f1_metric(y_true, y_pred):
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + K.epsilon())
    recall = true_positives / (possible_positives + K.epsilon())
    f1_val = 2*(precision*recall)/(precision+recall+K.epsilon())
    return f1_val

from keras.metrics import Precision , Recall , Accuracy

model = Sequential()
model.add(Dense(1024, input_shape=(max_words,)))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['categorical_accuracy','Recall','Precision'])

batch_size = 32
epochs = 10

history = model.fit(x_train, y_train,
                    batch_size=batch_size,
                    epochs=epochs,
                    verbose=1,
                    validation_split=0.1)


model.save('my_model.h1')
import pickle

# saving
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

# loading
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
#model = keras.models.load_model('my_model.h1')
# Evaluation_valus = model.evaluate(x_test,y_test,verbose=0)
print("Loss" , 'categorical_accuracy','Recall','Precision','f1_metric','TruePositives','TrueNegatives','FalsePositives','FalseNegatives')

# print(Evaluation_valus)
print(len(set(tagst)))
for i in range(len(set(tagst))):
  print(tagst[i])
# classes = ['microservice','iot','web','operating-system', 'database','machine-learning','security','algorithm']
# output_index = np.argmax(model[0])
# print()
from flask import Flask

app = Flask(__name__)
CORS(app)
  
@app.route("/TextClassification/<string:Text>",methods = ['GET'])
def home(Text):
    # classes = ['microservice','iot','web','operating-system', 'database','machine-learning','security','algorithm']
    # output_index = np.argmax(model[0])
    #model = keras.models.load_model('my_model.h1')
    x_input = Text
    input = tokenizer.texts_to_matrix([x_input],mode='tfidf')
    # c = model.predict(np.array(input))
    # cc = model.predict_classes(input)
    # xc = encoder.inverse_transform(cc)
    predict_x=model.predict(input) 
    classes_x=np.argmax(predict_x,axis=1)
    print(str(classes_x))
    
    classes = ['Algorithm','Database','IOT','Machine Learning','Microservices','Operating Systems','Security','Web']
    print(int(str(classes_x).replace('[','').replace(']','')))
    Finaloutput = classes[int(str(classes_x).replace('[','').replace(']',''))]
    return (str(Finaloutput))

app.run(host="0.0.0.0")
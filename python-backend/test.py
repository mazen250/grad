def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://Mazen:Mazen1234@cluster0.gobr9.mongodb.net/?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['Graduation']
    
# This is added so that many files can reuse the function get_database()

bdname = get_database()
Collection_name = bdname['recruiternews']
# item_details = Collection_name.find()
# for item in item_details:
#     print(item)
# recruter = Collection_name.find_one({'recruiterId': '62cf1ce1808262eb98eb800b'})
# if(recruter):
#     print(recruter["recruiterName"])
# else:
#     print("Not found")

# recruiter = Collection_name.find({'recruiterId': '62cf1ce1808262eb98eb800b'})
# for item in recruiter:
#     print(item["JobTitle"])


# users = dbname['usersdatas']
# # item_details = Collection_name.find()
# # for item in item_details:
# #     print(item)
# user = users.find_one({'account_id': '59308905'})
# if(recruter):
#     print("display name : ",user["display_name"])
# else:
#     print("Not found")
users = bdname['usersdatas']

# users = pd.read_excel('users.xlsx')
recruiter = bdname['recruiternews']
# alluser = users.find()
userSkill = []
# for user in alluser:
#     # print(user["skills"])
#     userSkill.append(user["skills"])

# print(len(userSkill))
recruiterSkill = []
# recruiter = recruiter.find()
# for rec in recruiter:
#     print(rec["skills"])
#     print(len(recruiterSkill))
#     recruiterSkill.append(rec["skills"])
# print(len(recruiterSkill))

from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)

@app.route('/test')
def test():
    name = request.args.get('name')
    print(name)
    return 'Hello ' + name

if __name__ == '__main__':
    app.run(debug=True,port=9000)
    # app.run(host='



import pandas as pd
import numpy as np
import csv
from difflib import SequenceMatcher
from flask import Flask
from flask import request
import warnings
app = Flask(__name__)
users = pd.read_excel('users.xlsx')
recruiter = pd.read_excel('recruiter.xlsx')
syn = pd.read_excel('syn.xlsx')
from sklearn.metrics.pairwise import cosine_similarity
from copy import copy
from sklearn.feature_extraction.text import TfidfVectorizer
#########################################################################################

userSkill = users['skills']
user_id = users['user_id']
recruiter_skill = recruiter['Skills']
recruiter_id = recruiter['recruiterId']
synName = syn['name']
synSyn = syn['syn']
job_title = recruiter['JobTitel']

#########################################################################################
Final = ""
AllFinal = []
Final1 = ""
AllFinal1 = []
for i in range(len(recruiter_skill)):
    recruiter_skill[i] = str(recruiter_skill[i]).replace('[', '').replace(']', '').replace('\'', '').replace(' ', '').split(
        'ｷ')
    recruiter_skill[i] = recruiter_skill[i][4:]
for i in range(len(recruiter_skill)):
    for j in range(len(recruiter_skill[i])):
        Final = str(Final) + (str(recruiter_skill[i][j])+" ")
    AllFinal.append((Final))
# print(AllFinal)
# print(type(Final))


for i in range(len(userSkill)):
    userSkill[i] = str(userSkill[i]).replace('[', '').replace(']', '').replace(' ', '').replace('\'', '').split(',')
for i in range(len(userSkill)):
    for j in range(len(userSkill[i])):
        Final1 = str(Final1) + (str(userSkill[i][j])+" ")
    AllFinal1.append((Final1))
percentageRecruiter = []
# print("before")


##############################

import numpy as np

# std_embeddings_index = {}
# with open('C:/Users/Hadeel/Downloads/numberbatch/numberbatch-en.txt',encoding='charmap') as f:
#     for line in f:
#         values = line.split(' ')
#         word = values[0]
#         embedding = np.asarray(values[1:], dtype='float32')
#         std_embeddings_index[word] = embedding

# def cosineValue(v1,v2):
#     "compute cosine similarity of v1 to v2: (v1 dot v2)/{||v1||*||v2||)"
#     sumxx, sumxy, sumyy = 0, 0, 0
#     for i in range(len(v1)):
#         x = v1[i]; y = v2[i]
#         sumxx += x*x
#         sumyy += y*y
#         sumxy += x*y
#     return sumxy/math.sqrt(sumxx*sumyy)

# def utils_preprocess_text(text, flg_stemm=False, flg_lemm=True, lst_stopwords=None):
#     ## clean (convert to lowercase and remove punctuations and   
#     ##characters and then strip)
#     text = re.sub(r'[^\w\s]', '', str(text).lower().strip())
            
#     ## Tokenize (convert from string to list)
#     lst_text = text.split()    ## remove Stopwords
#     if lst_stopwords is not None:
#         lst_text = [word for word in lst_text if word not in 
#                     lst_stopwords]
                
#     ## Stemming (remove -ing, -ly, ...)
#     if flg_stemm == True:
#         ps = nltk.stem.porter.PorterStemmer()
#         lst_text = [ps.stem(word) for word in lst_text]
                
#     ## Lemmatisation (convert the word into root word)
#     if flg_lemm == True:
#         lem = nltk.stem.wordnet.WordNetLemmatizer()
#         lst_text = [lem.lemmatize(word) for word in lst_text]
            
#     ## back to string from list
#     text = " ".join(lst_text)
#     return text


# def get_sentence_vector(sentence, std_embeddings_index = std_embeddings_index ):
#     sent_vector = 0
#     for word in sentence.lower().split():
#         if word not in std_embeddings_index :
#             word_vector = np.array(np.random.uniform(-1.0, 1.0, 300))
#             std_embeddings_index[word] = word_vector
#         else:
#             word_vector = std_embeddings_index[word]
#         sent_vector = sent_vector + word_vector
#     print(sent_vector)
#     return sent_vector

# def cosine_sim(sent1, sent2):
#     return cosineValue(get_sentence_vector(sent1), get_sentence_vector(sent2))

def sortArrays(arr):
    # Finding the length of array 'arr'
    length = len(arr)

    # Sorting using a single loop
    j = 0

    while j < length - 1:

        # Checking the condition for two
        # simultaneous elements of the array
        if (arr[j] > arr[j + 1]):
            # Swapping the elements.
            temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp

            # updating the value of j = -1
            # so after getting updated for j++
            # in the loop it becomes 0 and
            # the loop begins from the start.
            j = -1
        j += 1

    return arr


##############################
@app.route('/JobRecommendationEngine', methods=['GET'])
def JobRecommendationEngine():
    tet = []
    for j in range(len(userSkill)):
        # print('el j: ',j)
        
        # print('u: ',userSkill[j])
        del tet[:]
        warnings.filterwarnings("ignore", message="numpy.dtype size changed")
        
        
            
        docs = AllFinal
        tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf_vectorizer.fit_transform(docs)
        
        #query variable da alli hwa alskills bta3t aluser
        #allist alli esmha docs de feha aljobs skills 
        #aloutput hytl3lk cosine similarity blorder bta3 aljobs ,y3ni user skills alli gya flquery byshof alsimilarity bt3tha m3 kol alli f allist alli esmha docs ,fnty 5odi mn allist b2a alli fo2 0.7 msln, msln alsimilarity alli f index[3] kant 0.8 da m3nah en aluser da m3 aljob alrab3a alli hya recruiter_skill[3] alsimilarity bnhom 0.8 w sa3tha nrecommend le aljob de
        query = AllFinal1[j]
        query_vector = tfidf_vectorizer.transform([query])
        out = cosine_similarity(query_vector, tfidf_matrix)
        for i in range(len(out[0])):
            # print(out[0][i])
            tet.append(out[0][i])
        
        percentageRecruiter.append(tet)
        

    # 
    output = []
    idonly = []
    temp = []
    for i in range(0,len(percentageRecruiter)-1):
       
        for j in range(0,len(percentageRecruiter[i])-1):
            
            
            if (percentageRecruiter[i][j] >= 0.55):
                # print(percentageRecruiter[1][j])
                # if (user_id[i] not in temp):
                #     idonly.append(user_id[i])
                #     temp .append(user_id[i])
                output.append([user_id[i], " has percentage of ", percentageRecruiter[i][j]," with recruiter id : ",recruiter_id[j]])
                    # print(user_id[j], " has percentage of ", percentageRecruiter[i][j], " with recruiter id : ",
                # recruiter_id[i])
    print(len(output))
    return str(output)


app.run(host="0.0.0.0")

# for i in range(len(recruiter_skill)):
#     recruiter_skill[i] = recruiter_skill[i].replace('[', '').replace(']', '').replace('\'', '').replace(' ', '').split(
#         'ｷ')
#     recruiter_skill[i] = recruiter_skill[i][4:]
#
#
#
# for i in range(len(userSkill)):
#     userSkill[i] = str(userSkill[i]).replace('[', '').replace(']', '').replace(' ', '').replace('\'', '').split(',')
#
# #########################################################################################
#
#
# for i in range(0,len(userSkill)):
#     user = userSkill[i]
#     for j in range(0,len(recruiter_skill)):
#         recruiter = recruiter_skill[j]
#         # recruiter_id = recruiter_id[j]
#         similarity = SequenceMatcher(None, user, recruiter).ratio()
#
#         if (similarity > 0.7):
#             print("we recommend to user ",user_id[i]," to apply for jop with  recruiter id ",recruiter_id[j])
#


# users = pd.read_excel('users.xlsx')
# recruiter = pd.read_excel('recruiter.xlsx')
# syn = pd.read_excel('syn.xlsx')
# print(users.head())
# print(recruiter.head())


# print("user skills")
# print(userSkill.head())
# count = 0
# for i in range(len(recruiter_skill)):
#     print("recruiter id : ",recruiter_id[i])
#     for j in range(len(userSkill)):

#         count = 0
#         for k in range(len(userSkill[j])):
#             for l in range(len(recruiter_skill[i])):
#                 if(userSkill[j][k] == recruiter_skill[i][l]):
#                     # print(userSkill[j][k])

#                     count = count + 1
#                     # print(recruiter_skill[i][l])
#                     print(recruiter_id[i],"matched with user id ", user_id[j],"with count ",count,"with item ",userSkill[j][k])
#                     break
#             if(k == len(userSkill[j])):
#                 print("no match 1")
#                 break
#         if(j == len(userSkill)):
#             print("no match 2")
#             break
#     if(i == len(recruiter_skill)):
#         print("no match 3")
#         break

# print(recruiter_skill[0])
# print(userSkill[8])
# arr = []
# ids = []

# for i in range(len(recruiter_skill)):
#     lenghtr = len(recruiter_skill[i])

#     for l in range(len(userSkill)):
#         count=0

#         for j in range(len(recruiter_skill[i])):

#             for k in range(len(userSkill[l])):

#                 if(recruiter_skill[i][j] == userSkill[l][k]):
#                     # print("add")
#                     count = count + 1
#                 if(k == len(userSkill[l])):
#                         print("no user skills")
#                         break
#         perc = (count/lenghtr)*100


#         percentageUser.append(perc)
#     percentageRecruiter.append(percentageUser)
# #########################################
# print("percentage user : ",percentageUser)
# print("percentage recruiter : ",percentageRecruiter)
#
#
#
#
#

# print(max(percentageRecruiter))


# sortedRecruiter = sortArrays(percentageRecruiter)
# print first 10 recruiter
# for i in range(10):
#     print(recruiter_id[i]," : ",sortArrays(percentageRecruiter[i]))
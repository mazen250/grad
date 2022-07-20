import pandas as pd
import numpy as np
import csv
from difflib import SequenceMatcher
from flask import Flask
from flask import request
    
# This is added so that many files can reuse the function get_database()
from sklearn.metrics.pairwise import cosine_similarity
from copy import copy
from sklearn.feature_extraction.text import TfidfVectorizer

from flask_cors import CORS
import warnings
app = Flask(__name__)
CORS(app)
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

bdname = get_database()
users = bdname['usersdatas']
notificationsDb = bdname['notifications']
# users = pd.read_excel('users.xlsx')
# recruiter = bdname['recruiternews']
# recruiter = pd.read_excel('recruiter.xlsx')
# syn = pd.read_excel('syn.xlsx')
#########################################################################################
alluser = users.find()
userSkill = []
user_id = []
for user in alluser:
    # print(user["skills"])
    userSkill.append(user["skills"])
    user_id.append(user["_id"])
# userSkill = users['skills']

# user_id = users['user_id']
recruiter = bdname['recruiternews']
recruiter_skill = []
recruiter_id = []
JobTitle = []

recruiter = recruiter.find()
counterr=0
for rec in recruiter:
    if(rec["skills"]):
        # print(rec["skills"])
        counterr+=1
        print(counterr)
        recruiter_skill.append(rec["skills"])
        # print(rec["recruiterId"])
        recruiter_id.append(rec["_id"])
        
        JobTitle.append(rec["JobTitel"])

print(recruiter_skill)
# recruiter_id = recruiter['recruiterId']
# synName = syn['name']
# synSyn = syn['syn']
#job_title = recruiter['JobTitel']

#########################################################################################
Final = ""
AllFinal = []
Final1 = ""
AllFinal1 = []
for i in range(len(recruiter_skill)):
    recruiter_skill[i] = str(recruiter_skill[i]).replace('[', '').replace(']', '').replace('\'', '').replace(' ', '').split(
        '?')
    recruiter_skill[i] = recruiter_skill[i][4:]

for i in range(len(recruiter_skill)):
    for j in range(len(recruiter_skill[i])):
        Final = str(Final) + (str(recruiter_skill[i][j])+" ")
    AllFinal.append((Final))

for i in range(len(userSkill)):
    userSkill[i] = str(userSkill[i]).replace('[', '').replace(']', '').replace(' ', '').replace('\'', '').split(',')

for i in range(len(userSkill)):
    for j in range(len(userSkill[i])):
        Final1 = str(Final1) + (str(userSkill[i][j])+" ")
    AllFinal1.append((Final1))

percentageRecruiter = []
print("before")

import numpy as np

##############################

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
                

                notificationsDb.insert_one({"user_id": str(user_id[i]),"body": "You have a new job recommendation from recruiter id :   "+str(recruiter_id[j])})
                    # print(user_id[j], " has percentage of ", percentageRecruiter[i][j], " with recruiter id : ",
                # recruiter_id[i])
    print(len(output))
    return str(output)


app.run(host="0.0.0.0",port=4000)


                # notificationsDb.insert_one({"user_id": str(user_id[j]),"body": "You have a new job recommendation from recruiter id :   "+str(recruiter_id[i])})
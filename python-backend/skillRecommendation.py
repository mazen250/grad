import math
import re
from collections import Counter
import pandas as pd
import numpy as np
import csv
from difflib import SequenceMatcher
from flask import Flask
from flask import request
from difflib import SequenceMatcher
from collections import Counter
# read data from xlsx file
import pandas as pd
import numpy as np
import csv
from flask import Flask
from flask import request
from flask_cors import CORS
#from openpyxl import 
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

alluser = users.find()
userSkill = []
user_id = []
employed = []
# user_nationality = []
for user in alluser:
    # print(user["skills"])
    userSkill.append(user["skills"])
    user_id.append(user["_id"])
    employed.append(user["is_employee"])
    # user_nationality.append(user["nationality"])

recruiter = bdname['recruiternews']
recruiter_skill = []
recruiter_id = []
JobTitle = []
recommendationDb = bdname['recommendations']
notificationsDb = bdname['notifications']

# users = pd.read_excel('users.xlsx')
# userSkill = users['skills'].copy()
# user_id = users['user_id'].copy()
# employed = users['employed'].copy()
# user1 = userSkill[0]
# user_nationality = users['nationality'].copy()
counter=0
for i in range(len(userSkill)):
    userSkill[i] = str(userSkill[i]).replace('[', '').replace(']', '').replace(' ','').replace('\'', '').split(',')


@app.route('/SkillsRecommendationEngine',methods = ['GET'])
def StudentSearchEngine():
    output = []
    counter= 0
    for i in range(0,len(userSkill)):
        first_userID = user_id[i]
        first_user = userSkill[i]
        # print(employed[i])
        for j in range(0,len(userSkill)):
            second_User = userSkill[j]
            second_userID = user_id[j]
            if (first_userID != second_userID):
                # similarity = SequenceMatcher(None, first_user, second_User).ratio()

                listToStr = ' '.join([str(elem) for elem in first_user])

                # print(listToStr)

                listToStr2 = ' '.join([str(elem) for elem in second_User])

                # print(listToStr2)

                WORD = re.compile(r"\w+")

                def get_cosine(vec1, vec2):
                    intersection = set(vec1.keys()) & set(vec2.keys())
                    numerator = sum([vec1[x] * vec2[x] for x in intersection])

                    sum1 = sum([vec1[x] ** 2 for x in list(vec1.keys())])
                    sum2 = sum([vec2[x] ** 2 for x in list(vec2.keys())])
                    denominator = math.sqrt(sum1) * math.sqrt(sum2)

                    if not denominator:
                        return 0.0
                    else:
                        return float(numerator) / denominator


                def tXt_to_vec(text):
                    words = WORD.findall(text)
                    return Counter(words)


                text1 = listToStr
                text2 = listToStr2

                vector1 = tXt_to_vec(text1)
                vector2 = tXt_to_vec(text2)
                # tXt_to_vec(text2)
                cosine = get_cosine(vector1, vector2)
            else:
                continue
            if (cosine > 0.7):
                # print("first user id is: ", user_id[0])
                # print("another user id is: ", anotherUserId)
            #SingleSimilarity=[first_userID,second_userID,similarity]
                # print(first_userID, " and ", second_userID, " similarity is: ", similarity)
                #similarities.append(SingleSimilarity)
                recomendedSkills = list((Counter(userSkill[i]) - Counter(userSkill[j])).elements())
                # print(userSkill[i])
                # print(userSkill[j])
                # print("The Subtracted list is : " + str(res))
                if( not recomendedSkills):
                    continue

                if (employed[i]=="TRUE" and employed[j]=="FALSE"):
                    counter+=1
                    print(counter)
                    output.append(["we recommend to user with user id = ",str(user_id[j])," to improve his skills on ",str(recomendedSkills)])
                    recommendationDb.insert_one({"user_id":str(user_id[j]),"skills":str(recomendedSkills)})
                    notificationsDb.insert_one({"user_id":str(user_id[j]),"body":"we recommend to you to improve your skills on "+str(recomendedSkills)})
                    print("user id =" , str(user_id[i]),  "we recommend to user with user id = ",str(user_id[j])," to improve his skills on ",str(recomendedSkills))
                else:
                    continue
            else:
                continue
    print(len(output))
    return (str(output))

app.run(host="0.0.0.0",port=6000)

import pandas as pd
import numpy as np
import csv
from flask import Flask
from flask import request
from difflib import SequenceMatcher
from flask_cors import CORS
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
for user in alluser:
    # print(user["skills"])
    userSkill.append(user["skills"])
    user_id.append(user["_id"])

#users = pd.read_excel('users.xlsx')

#recruiter = pd.read_excel('recruiter.xlsx')
# syn = pd.read_excel('syn.xlsx')
#userSkill = users['skills']
#user_id = users['user_id']
recruiter = bdname['recruiternews']
recruiter_skill = []
recruiter_id = []
allRecruiter = recruiter.find()
for rec in allRecruiter:
    print(len(recruiter_id))
    print(rec["recruiterId"])
    print(rec['recruiterName'])
    recruiter_skill.append(rec["skills"])
    recruiter_id.append(rec["recruiterId"])

# recruiter_skill = recruiter['Skills']
# recruiter_id = recruiter['recruiterId']
# synName = syn['name']
# synSyn = syn['syn']


for i in range(len(recruiter_skill)):
     recruiter_skill[i] = recruiter_skill[i].replace('[', '').replace(']', '').replace('\'', '').replace(' ','').split('ｷ')
     recruiter_skill[i] = recruiter_skill[i][4:]

for i in range(len(userSkill)):
    userSkill[i] = str(userSkill[i]).replace('[', '').replace(']', '').replace(' ','').replace('\'', '').split(',')

percentageRecruiter = []
print("before")
##############################

@app.route('/BrokerEngine/<string:Text>',methods = ['GET'])
def BrokerEngine(Text):
    input = Text.split(',')
    output = []
    user_ids = []
    FinalPercentages = []
    # for i in range(len(recruiter_skill)):
    #     print(recruiter_id[i])
    #     counter=0
    percentageUser = []
    for j in range(len(userSkill)):
        counter=0
        for k in range(len(userSkill[j])):
            for l in range(len(input)):
                similarity = SequenceMatcher(None, userSkill[j][k], input[l]).ratio()
                if(similarity>0.5):
                    counter = counter + 1
                    break
            if(k == len(userSkill[j])):
                break
        if(j == len(userSkill)):
            break
        if(counter > 0):
            print(recruiter_id[0],"matched with user id ", user_id[j],"with count ",counter)
        percentage = (counter/len(input))*100
        percentageUser.append(percentage)
    coun=0
    for j in range(0,len(userSkill)-1):

        if(percentageUser[j] >= 50):
            coun = coun + 1
            #current recruiter id
            user_ids.append(user_id[j])
            FinalPercentages.append(percentageUser[j])
    sort_list(user_ids,FinalPercentages)
    FinalPercentages.sort()
    print(FinalPercentages)
    for j in range(len(FinalPercentages)):
        output.append(str(user_ids[j]))
        output.append(str(FinalPercentages[j]))
        # output.append([str(user_ids[j]),str(FinalPercentages[j])])
        print("You matched with user: ",user_ids[j]," with a percentage of: ",FinalPercentages[j])
    for i in range(len(output)):
        output[i] = str(output[i]).replace('\'','').replace('[','').replace(']','').split(',')
    id = []
    percentage = []
    for i in range(len(output)):
        for j in range(len(output[i])):
            if(str(output[i][j]).isdigit()):
                id.append(output[i][0])
                percentage.append(output[i][1])
    
    # print(id[0])
    #print(percentage[1])
    if(len(output)==0):
        output.append("No Results Found")
    ne = np.flip(output)
    return(str(ne))
def sort_list(list1, list2):
    zipped_pairs = zip(list2, list1)
    z = [x for _, x in sorted(zipped_pairs)]
    return z
app.run(host="0.0.0.0",port=7000)
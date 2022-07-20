from operator import index
from re import L
from telnetlib import SB
from typing import Final
from flask import Flask
from flask import request
import nltk
from decimal import Decimal
# from openpyxl import
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
#app = Flask(__name__)
import pandas as pd
import numpy as np
import csv
from nltk.corpus import wordnet
from nltk.corpus import stopwords
import re
import math
from collections import Counter
from difflib import SequenceMatcher
def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://Mazen:Mazen1234@cluster0.gobr9.mongodb.net/?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)
    return client['Graduation']

bdname = get_database()
users = bdname['usersdatas']
alluser = users.find()
userSkill = []
user_id = []
GoldBadges =[]
SilverBadges =[]
BronzeBadges =[]
Counter=0
for user in alluser:
    Counter+=1
    print(Counter)
    userSkill.append(user["skills"])
    user_id.append(user["_id"])
    GoldBadges.append(user["Gold"])
    SilverBadges.append(user["Silver"])
    BronzeBadges.append(user["Bronze"])



recruiter = bdname['recruiternews']
recruiter_skill = []
recruiter_id = []
JobTitle = []
CompanyName = []


recruiter = recruiter.find()
for rec in recruiter:
    if(rec["skills"]):
        recruiter_skill.append(rec["skills"])
        recruiter_id.append(rec["_id"])
        JobTitle.append(rec["JobTitel"])
        CompanyName.append(rec["CompanyName"])


questiondb = bdname['questions']

AllQuestionsTitles = []
AllQuestionsIds = []
AllQuestionsOwnerId = []
#AllQuestionsBody = []
AllQuestionsScore = []
#AllQuestionsCreationDate = []
question = questiondb.find()

for q in question:
    AllQuestionsTitles.append(q["title"])
    AllQuestionsIds.append(q["_id"])
    AllQuestionsOwnerId.append(q["account_id"])
    #AllQuestionsBody.append(q["Body"])
    AllQuestionsScore.append(q["score"])
    #AllQuestionsCreationDate.append(q["CreationDate"])

for i in range(len(userSkill)):
    userSkill[i] = str(userSkill[i]).replace('[', '').replace(']', '').replace(' ', '').replace('\'', '').split(',')

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
# @app.route('/RecruiterStudentSearchEngine/<string:Text>', methods=['GET'])
# def RecruiterStudentSearchEngine(Text):
#     StudentIds = []
#     SelectedStudentIds = []
    
#     for i in range(len(user_id)):
#         StudentIds.append(user_id[i])
#     for i in range(len(StudentIds)):
#         if (Text == str(StudentIds[i])):
#             SelectedStudentIds.append(StudentIds[i])
#     if(len(SelectedStudentIds)==0):
#         SelectedStudentIds.append("No Users Found With This Id.")
#     #  similarity = SequenceMatcher(None, user1, user2).ratio()
#     return (str(SelectedStudentIds))



@app.route('/RecruiterSearchEngine/<string:Text>',methods=['GET'])
def RecruiterSearchEngine(Text):
    MatchingProfilesIds =[]
    AllGoldBadges = []
    # tt = []
    SilverTempList = []
    GoldTempList = []
    BronzeTempList = []
    FinalTempList = []
    MatchingProfilesIdsBadges =[]
    AllSilverBadges = []
    AllBronzeBadges = []
    Text=Text.split(",")
    for i in range(len(userSkill)):
        count=0
        for j in range(len(userSkill[i])):
        
            for k in range(len(Text)):
                similarity = SequenceMatcher(None, str(userSkill[i][j]).lower(), str(Text[k]).lower()).ratio()
                if (similarity>0.7):
                    count = count + 1
        if(count==k+1):
            MatchingProfilesIds.append(str(user_id[i]))
    for i in range(len(GoldBadges)):
        for j in range(len(MatchingProfilesIds)):
            if(user_id[i]==MatchingProfilesIds[j]):
                MatchingProfilesIdsBadges.append(GoldBadges[i])
                AllGoldBadges.append(GoldBadges[i])
                AllSilverBadges.append(SilverBadges[i])
                AllBronzeBadges.append(BronzeBadges[i])
    # print(AllBronzeBadges,AllGoldBadges,AllSilverBadges)
    sort_list(MatchingProfilesIds,AllGoldBadges)
    for i in range(len(AllGoldBadges)): 
        # print(Badge)
        if AllGoldBadges[i] not in GoldTempList:
            # print(Badge)
            GoldTempList.append( AllGoldBadges[i])
            FinalTempList.append(AllGoldBadges[i])
            # print("Awel if condition: ",GoldTempList)
            # print(GoldTempList)
        else:
                for k in range(len(FinalTempList)):
                    if AllGoldBadges[i] == FinalTempList[k]:
                        # FinalTempList.remove(FinalTempList[k])
                        if AllSilverBadges[i]>AllSilverBadges[k]:
                            AllSilverBadges[k]=AllSilverBadges[i]
                        elif SilverBadges[i]<AllSilverBadges[k]:
                            FinalTempList.append(AllSilverBadges[k])
                        else:
                            if AllBronzeBadges[i]>AllBronzeBadges[k]:
                                FinalTempList[k]=(AllBronzeBadges[i])
                            elif AllBronzeBadges[i]<AllBronzeBadges[k]:
                                FinalTempList.append(AllBronzeBadges[k])
                            else:
                                FinalTempList.append(AllBronzeBadges[k])
    print(AllBronzeBadges,AllGoldBadges,AllSilverBadges)
    Output =sort_list(MatchingProfilesIds,FinalTempList)
    return(str(Output))

def sort_list(list1, list2):
    zipped_pairs = zip(list2, list1)
    z = [x for _, x in sorted(zipped_pairs)]
    return z


def CheckIfDuplicates(ListOfElements):
    if len(ListOfElements) == len(set(ListOfElements)):
        return False
    else:
        return True


@app.route('/JobTitlesSearchEngine/<string:Text>', methods=['GET'])
def JobTitlesSearchEngine(Text):
    Job_Titles = []
    SelectedJobTitles = []
    similarities = []
    for i in range(len(JobTitle)):
        Job_Titles.append(JobTitle[i])
    for i in range(len(Job_Titles)):
        similarity = SequenceMatcher(None, Job_Titles[i], Text).ratio()
        if (similarity>0.7):
            SelectedJobTitles.append(str(recruiter_id[i]))
            similarities.append(similarity)


    sort_list(SelectedJobTitles,similarities)
    return (str(SelectedJobTitles))

@app.route('/JobCompanySearchEngine/<string:Text>', methods=['GET'])
def JobCompanySearchEngine(Text):
    Company_Name = []
    SelectedCompany_Name = []
    similarities = []
    for i in range(len(CompanyName)):
        Company_Name.append(CompanyName[i])
    for i in range(len(Company_Name)):
        similarity = SequenceMatcher(None, Company_Name[i], Text).ratio()
        if (similarity>0.7):
            SelectedCompany_Name.append(str(recruiter_id[i]))
            similarities.append(similarity)
    #  similarity = SequenceMatcher(None, user1, user2).ratio()
    sort_list(SelectedCompany_Name,similarities)
    return (str(SelectedCompany_Name))

for i in range(len(recruiter_skill)):
    recruiter_skill[i] = str(recruiter_skill[i]).replace('[', '').replace(']', '').replace(' ', '').replace('\'', '').split('?')

#  one recruiter skill
@app.route('/RecruiterSkillsSearchEngine/<string:Text>', methods=['GET'])
def RecruiterSkillsSearchEngine(Text):
    RecruiterSkillsSimilarity = []
    SelectedRecruiterSkills = []
    del SelectedRecruiterSkills[:]
    similarities = []
    Text = str(Text).split(' ')
    print(SelectedRecruiterSkills)
    for i in range(len(recruiter_skill)):
        del RecruiterSkillsSimilarity[:]
        for j in range(len(recruiter_skill[i])):
            for k in range(len(Text)):
                similarity = SequenceMatcher(None, recruiter_skill[i][j], Text[k]).ratio()
                RecruiterSkillsSimilarity.append(similarity)
        for j in range(len(RecruiterSkillsSimilarity)): 
            if (RecruiterSkillsSimilarity[j]>0.7):
                    
                if(recruiter_id[i] not in SelectedRecruiterSkills):
                    SelectedRecruiterSkills.append(str(recruiter_id[i]))
                    similarities.append(similarity)
                else:
                    continue

    sort_list(SelectedRecruiterSkills,similarities)
    return (str(SelectedRecruiterSkills))
# //Questions
@app.route('/StudentSearchEngine/<string:Text>',methods = ['GET'])
def StudentSearchEngine(Text):
    test1 = []
    AllCosinesQuestionTitles = []
    TempList1 = []
    for i in range(len(AllQuestionsTitles)):
        listToStr = ' '.join([str(elem) for elem in Text])
        listToStr2 = ' '.join([str(elem) for elem in str(AllQuestionsTitles[i])])

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
        cosine = get_cosine(vector1, vector2)
        if(cosine>0.5):
            TempList1.append(AllQuestionsIds[i])
            AllCosinesQuestionTitles.append(cosine)

    sorted = sort_list(TempList1,AllCosinesQuestionTitles)

    AllCosinesQuestionTitles.sort()
    print(sorted)
    for j in range(len(sorted)):
        test1.append([str(sorted[j])])


    ne = np.flip(test1)
    return(str(ne))


app.run(host="0.0.0.0",port=8080)
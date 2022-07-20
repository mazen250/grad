import pandas as pd
import numpy as np

#read the data
questions = pd.read_excel('questionstest.xlsx')
users = pd.read_excel('userstest.xlsx')

questionOwnerID = questions['account_id']
userID = users['account_id']
questionTitle = questions['title']

#match if there is a match between the two
questionOwnerID = questionOwnerID.astype(str)
userID = userID.astype(str)

for i in range(len(userID)):
    counter = 0
    for j in range(len(questionOwnerID)):
        if userID[i] == questionOwnerID[j]:
            counter += 1
            print("user ID: ", userID[i], "question ID: ", questionOwnerID[j], "question title: ", questionTitle[j])
            break
        else:
            continue
    if counter != 0:
        print("user ID: ", userID[i], "has ", counter, "questions")


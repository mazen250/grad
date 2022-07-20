from difflib import SequenceMatcher

#read data from xlsx file
import pandas as pd
import numpy as np
import csv
users = pd.read_excel('users.xlsx')
userSkill = users['skills']
user_id = users['user_id']

user1 = userSkill[0]

for i in range(1,len(userSkill)):
    anotherUser = userSkill[i]
    anotherUserId = user_id[i]
    similarity = SequenceMatcher(None, user1, anotherUser).ratio()
    if(similarity > 0.7):
        # print("first user id is: ", user_id[0])
        # print("another user id is: ", anotherUserId)
     
        print(user_id[0], " and ", anotherUserId, " similarity is: ", similarity)
    else:
        continue

# similarity = SequenceMatcher(None, user1, user2).ratio()
# print(similarity)
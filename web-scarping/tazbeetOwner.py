import csv
from encodings.utf_8 import encode
import pandas as pd
import numpy as np
import warnings

warnings.filterwarnings("ignore")
data = pd.read_excel('questions.xlsx')
owner = data['owner']
for i in range(len(owner)):
    owner[i] = owner[i].replace('{', '').replace('}', '').replace('"', '').replace(' ','').replace(':', ' ').replace('\'','').split(',')

# print(owner[0][0])
account_id = [] #0
reputation = [] #1
user_id = [] #2
user_type = [] #3
profile_image = [] #4
display_name = [] #5
link = [] #6
counter =0
test = owner[0][0].split(' ')
f = open("newQuestions.csv", "a")
writer = csv.writer(f)
print(test[0])

# for i in range(len(owner)):
#     for j in range(len(owner[i])):
#         owner[i][j] = owner[i][j].split(' ')
#         if owner[i][j][0].__contains__('account_id'):
#             account_id.append(owner[i][j][1])
#         else:
#             if(owner[i][j][0].__contains__('reputation')):
#                 reputation.append(owner[i][j][1])
#             else:
#                 if(owner[i][j][0].__contains__('user_id')):
#                     user_id.append(owner[i][j][1])
#                 else:
#                     if(owner[i][j][0].__contains__('user_type')):
#                         user_type.append(owner[i][j][1])
#                     else:
#                         if(owner[i][j][0].__contains__('profile_image')):
#                             profile_image.append(owner[i][j][1])
#                         else:
#                             if(owner[i][j][0].__contains__('display_name')):
#                                 display_name.append(owner[i][j][1])
#                             else:
#                                 if(owner[i][j][0].__contains__('link')):
#                                     link.append(owner[i][j][1])
                               
print(len(owner))
for i in range(len(owner)):
    # print(i)
    
    test= owner[i][0].split(' ')
    if(test[0].__contains__('account_id')):
        account_id.append(test[1])
print("ownerrrr",owner[0]) 

for i in range(len(owner)):    
    test2 = owner[i][2].split(' ')
    
    if(test2[0].__contains__('user_id')):
        user_id.append(test2[1])
test = owner[0][4].split(' ')
print("display",test)
# for i in range(len(owner)):
#     test3 = owner[i][4].split(' ')
#     if(test3[0].__contains__('profile_image')):
#         text=test3[1]+test3[2]
#         profile_image.append(text)
    
# test2 = owner[0][5].split(' ')
# print("display",test2)
# for i in range(len(owner)):
#     test4 = owner[i][5].split(' ')
#     if(test4[0].__contains__('display_name')):

#         display_name.append(test4[1])
        

for i in range(len(owner)):
    writer.writerow([account_id[i],user_id[i]])

f.close()
print("accout id length : ",len(account_id))
print("user id length : ",len(user_id))
print("profile image length : ",len(profile_image))
print("display name length : ",len(display_name))

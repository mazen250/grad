import pandas as pd
import numpy as np
import csv
users = pd.read_excel('users.xlsx')
recruiter = pd.read_excel('recruiter.xlsx')
syn = pd.read_excel('syn.xlsx')
# print(users.head())
# print(recruiter.head())
userSkill = users['skills']
user_id = users['user_id']
recruiter_skill = recruiter['Skills']
recruiter_id = recruiter['recruiterId']
synName = syn['name']
synSyn = syn['syn']



print("wwww")
#test = userSkill[2].replace('[', '').replace(']', '').replace('\'', '').split(',')
for i in range(len(recruiter_skill)):
     recruiter_skill[i] = recruiter_skill[i].replace('[', '').replace(']', '').replace('\'', '').replace(' ','').split('ｷ')
     recruiter_skill[i] = recruiter_skill[i][4:]
# print("recruiter skills")
# print(recruiter_skill)


for i in range(len(userSkill)):
    userSkill[i] = str(userSkill[i]).replace('[', '').replace(']', '').replace(' ','').replace('\'', '').split(',')

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


percentageRecruiter = []
print("before")
##############################
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
firstRecCounter = 0
for i in range(len(recruiter_skill)):
    print(recruiter_id[i])
    
    counter=0
    percentageUser = []
    for j in range(len(userSkill)):
        counter=0
        for k in range(len(userSkill[j])):
            for l in range(len(recruiter_skill[i])):
                if(userSkill[j][k] == recruiter_skill[i][l]):
                    counter = counter + 1
                    break
            if(k == len(userSkill[j])):
                break
        if(j == len(userSkill)):
            break
        if(counter > 0):
            if(i==0):
                firstRecCounter = firstRecCounter + 1
            print(recruiter_id[i],"matched with user id ", user_id[j],"with count ",counter)
        percentage = (counter/len(recruiter_skill[i]))*100
        percentageUser.append(percentage)
    percentageRecruiter.append(percentageUser)
# print(max(percentageRecruiter))



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

# sortedRecruiter = sortArrays(percentageRecruiter)
#print first 10 recruiter
# for i in range(10):
#     print(recruiter_id[i]," : ",sortArrays(percentageRecruiter[i]))
test = recruiter_id[0]
coun=0
for j in range(0,len(userSkill)-1):
    
    if(percentageRecruiter[1][j] >= 50):
        coun = coun + 1
        #current recruiter id
       
        print(user_id[j]," has percentage of ",percentageRecruiter[1][j])
print(coun)        
threshhold = 50

# sorted  = sortArrays(percentageRecruiter)
# print("sorted array of recruiter : ",sorted)
# sorted = sortArrays(arr)
# print(sorted)

# print(ids)
# counter=0

# for j in range(len(recruiter_skill)):

#     counter = 0
#     for i in range(len(userSkill)):
#         if(percentageRecruiter[j][i]>=50.0):
#             counter= counter+1

    
#     print("Recruiter id ",recruiter_id[j] , " counter " ,counter)




import csv
from encodings.utf_8 import encode
import pandas as pd
import numpy as np
users = pd.read_excel('C:/Users/mazen/Desktop/Graduation-project/server/users.xlsx')
f=open('l3b.csv','a')
writer = csv.writer(f)
userSkill = users['skills']
user_id = users['user_id']

for i in range(len(userSkill)):
    userSkill[i] = userSkill[i].replace('[', '').replace(']', '').replace(' ','').replace('\'', '').split(',')
print(userSkill[0])
for i in range (0,len(userSkill)-1):
    print(i)
    for j in range(0,len(userSkill[i])-1):
        print(j)
        if(userSkill[i][j]==("Java") or userSkill[i][j]==("java")):
            if(int(user_id[i])%2==0):
                userSkill[i].append("Spring")
                userSkill[i].append("Java EE")
                userSkill[i].append("Spring Boot")
                
            else:
                userSkill[i].append("REST API")
                userSkill[i].append("MVC")
               
            #print("Skill in user ",user_id[i]," has Skills ",userSkill[i])
        if(userSkill[i][j]==("Python") or userSkill[i][j]==("python")):
            if(int(user_id[i])%2==0):
                userSkill[i].append("Django")
                userSkill[i].append("Flask")
                
            else:
                userSkill[i].append("Git")
                
        if(userSkill[i][j]==("Angular") or userSkill[i][j]==("angular")):
            if(int(user_id[i])%2==0):
                userSkill[i].append("Docker")
                
            else:
                userSkill[i].append("CSS")
                userSkill[i].append("HTML")
               
        if(userSkill[i][j]==("Node.js") or userSkill[i][j]==("node.js")):
            if(int(user_id[i])%2==0):
                userSkill[i].append("React.js")
                
        if(userSkill[i][j]==("CSS") or userSkill[i][j]==("css")):
            if(int(user_id[i])%2==0):
                userSkill[i].append("HTML")
                userSkill[i].append("javaScript")
                
        if(userSkill[i][j]==("Unnamed:0")or userSkill[i][j]==("Unnamed:0_x")):
            userSkill[i].remove(userSkill[i][j])
    writer.writerow([userSkill[i]])
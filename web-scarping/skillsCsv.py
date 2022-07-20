#read book4 csv file

import csv
import pandas as pd
import numpy as np

#read data from excel file
df = pd.read_excel('skills.csv')
# get titles of columns
# print(df.columns)
skillsrow = df.columns
data = df.drop(['Unnamed: 0', 'Unnamed: 0_x','Respondent'],axis=1)

test = data.head
#get single row
print(data.iloc[20])
f= open('skills3.csv', 'a')
writer= csv.writer(f)
#open file to write
for i in range(len(data)):
    skillList = []
    for j in range(len(data.iloc[i])):
        if data.iloc[i][j] == 1:
            skillList.append(skillsrow[j])
    writer.writerow([skillList])
    #write to new csv file
    skillList = []
    
f.close()
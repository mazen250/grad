import requests 
from pprint import pprint
from csv import reader
from stackapi import StackAPI
import pandas as pd
import csv
import json
from bs4 import BeautifulSoup
SITE = StackAPI('stackoverflow')

#testset = pd.read_csv("Answers11.csv")  
# output = (testset.values[0:, [8]])

l = open("synonyms1.csv", "a",encoding="utf-8")
writer=csv.writer(l)

# que = list()
# ans = list()
# hania = list()
# contenta = "h"
# for i in range(0,len(output)):
#     if(hania._contains_(output[i])):
#         continue
#     hania.append(output[i])
names=[]
string = ""
for i in range(1,20): 
    dataa =requests.get("https://api.stackexchange.com/2.3/tags?page="+str(i)+"&order=desc&sort=popular&site=stackoverflow&filter=!Fxb_pEWp3j6-EIiMy_s1mp(4nQ")
   
    # data = dataa['items']
    # data = data.json()
    dataa = dataa.text
    data = json.loads(dataa)
        # f.write(contenta)
    #print first object in the list
    for j in range(0,29):
        hasSyn = data['items'][j]['has_synonyms']
    
        if(hasSyn):
            name = data['items'][j]['name']
            syn = data['items'][j]['synonyms']
            # l.write(name)
            writer.writerow([name,syn])
            
        else:
            j=j+1
       
        # names.append(name)
        # writer.writerow([names[j]])
        # writer.writerow([syn])
    # l.wri
    # te(str(contenta))
# f.close()
l.close()



# dataa =requests.get("https://api.stackexchange.com/2.3/tags?page=1&order=desc&sort=popular&site=stackoverflow&filter=!Fxb_pEWp3j6-EIiMy_s1mp(4nQ")
   
#     # data = dataa['items']
#     # data = data.json()
# dataa = dataa.text
# data = json.loads(dataa)
#         # f.write(contenta)
#     #print first object in the list
# for j in range(0,29):
#     #         name = data['items'][j]['name']
# #         syn = data['items'][j]['synonyms']
# #         #write name to col in csv file
# #         print(name)
# #         print(syn)
    
#     hasSyn = data['items'][j]['has_synonyms']
    
#     if(hasSyn):
#         name = data['items'][j]['name']
#         syn = data['items'][j]['synonyms']
#         print(name)
#         print(syn)
#     else:
#         j=j+1
       

    
    
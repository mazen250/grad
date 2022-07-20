from pprint import pprint
from csv import reader
from stackapi import StackAPI
import pandas as pd
import csv
SITE = StackAPI('stackoverflow')

# testset = pd.read_csv("questions.csv")  
# link = testset['link']
# is_answered = testset['is_answered']

# output = (testset.values[0:, [8]])
# f = open("C:/Users/Hadeel/Desktop/bebo uni/que.txt", "w",encoding="utf-8")
# l = open("C:/Users/Hadeel/Desktop/bebo uni/ans.csv", "w",encoding="utf-8")
# que = list()
# ans = list()

# hania = list()
# contenta = "h"
# for i in range(0,len(output)):
#     if(hania._contains_(output[i])):
#         continue
#     hania.append(output[i])

# for i in range(0,25): 
#     dataa =SITE.fetch('questions/{ids}/answers', ids=hania[i], filter='withbody')
#     contenta = dataa['items'][0]['body']
#     if(len(contenta) !=0 ):
#         print(contenta)
#         f.write(contenta)
# f.close()
# l.close()

from operator import index
import requests as request
import pandas as pd
import json
import csv
topics = ["android","ios","frontend","backend","ai","cloud","security","algorithm","web","embedded systems","iot","database","micro services","operating-system","machine-learning"]


# for i in range(0,len(topics)): 
#     dataa =SITE.fetch('questions/{ids}/answers', ids=hania[i], filter='withbody')
#     contenta = dataa['items'][0]['body']
#     if(len(contenta) !=0 ):
#         print(contenta)
#         f.write(contenta)
# make api request and get the data
# r = request.get('https://api.stackexchange.com/2.3/questions?page=12&order=desc&sort=activity&tagged=backend&site=stackoverflow&key=Hn2Z4Hp0S6PPg70iJ47MqQ((')












# raw_data = pd.DataFrame([])
# # # so = request.Site('stackoverflow.com', impose_throttling = True)
# df1 = []
# f = open('topicss.csv', 'a', encoding="utf-8")
# writer = csv.writer(f)
# for i in range(0,len(topics)):

#     for j in range(1, 10):
#         r = request.get('https://api.stackexchange.com/2.3/questions?page='+str(j)+'&order=desc&sort=activity&tagged='+str(topics[i]+'&site=stackoverflow&key=Hn2Z4Hp0S6PPg70iJ47MqQ(('))
#         data = r.json()
#         df_temp = pd.DataFrame.from_dict(data["items"])
#         # writer.writerow(df_temp)
#         raw_data = raw_data.append(df_temp, ignore_index=True, sort=False)
#     df = raw_data
#     writer.writerow(df)
# df1.append(df)
raw_data = pd.DataFrame([])
# # so = request.Site('stackoverflow.com', impose_throttling = True)
df1 = []
f = open('topicss.csv', 'a', encoding="utf-8")
writer = csv.writer(f)

for j in range(1, 3):
        r = request.get('https://api.stackexchange.com/2.3/questions?page='+str(j)+'&order=desc&sort=activity&tagged=frontend&site=stackoverflow&key=Hn2Z4Hp0S6PPg70iJ47MqQ((')
        data = r.json()
        df_temp = pd.DataFrame.from_dict(data["items"])
        # writer.writerow(df_temp)
        raw_data = raw_data.append(df_temp, ignore_index=True, sort=False)
# df = raw_data
print(raw_data)



# r = request.get('https://api.stackexchange.com/2.3/questions?page=12&order=desc&sort=activity&tagged=backend&site=stackoverflow&key=Hn2Z4Hp0S6PPg70iJ47MqQ((')
# data = r.json()
# df_temp = pd.DataFrame.from_dict(data["items"])
# print(df_temp)
# df1 = df.append(df, ignore_index=True, sort=False)




# pd.DataFrame(df1).to_csv('topics.csv')  
# df.to_csv(r'D:\desktop-files\Graduation-Project\web-scraping\mazen.csv', index = None)
# print(raw_data)
# print(df.columns.tolist())

f.close()
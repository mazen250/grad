# import requests
# #web scraping 
# from bs4 import BeautifulSoup
# #importing the beautiful soup library

# result = requests.get("https://stackoverflow.com/questions/35521390/gradle-console-get-more-log-output")
# #getting the data from the website
# data = result.content
# soup = BeautifulSoup(data, "lxml")

# content = soup.find_all("div", {"class": "s-prose"})
# print(content)
import urllib.request

from stackapi import StackAPI 
from bs4 import BeautifulSoup

# def get_answer(url):
#     content = urllib.request.urlopen(url)
#     soup = BeautifulSoup(content,features='lxml')
#     try:
#         answer = soup.find_all('div',attrs={'class':'accepted-answer'})
#         accepted_content = answer[0].contents[1].find('div',attrs = {'class':'post-text'})
#         return accepted_content.text
#     except Exception :
#         #return error message if no accepted answer
#         return "No accepted answer"

# if __name__ == '__main__':

#     url = "https://stackoverflow.com/questions/89228/calling-an-external-command-in-python?rq=1"
#     answer=get_answer(url)
#     print(answer.strip())

def get_answer(url):
    content = urllib.request.urlopen(url)
    soup = BeautifulSoup(content,features='lxml')

    answer = soup.find_all('div',attrs={'class':'accepted-answer'})
    try:
        accepted_content = answer[0].contents[1].find('div',attrs = {'class':'s-prose js-post-body'})
        return accepted_content.text
    except Exception :
        #return error message if no accepted answer
        return "No accepted answer"
import re

def cleanhtml(raw_html):
  cleanr = re.compile('<.*?>')
  cleantext = re.sub(cleanr, '', raw_html)
  return cleantext




  
first = get_answer("https://stackoverflow.com/questions/71774133/azure-devops-trigger-another-pipeline")
if(first == "No accepted answer"):
    print("No accepted answer")
else:
    final = cleanhtml(first)
    print(final)

import requests
from bs4 import BeautifulSoup
import csv
from itertools import zip_longest


jobs = [".net","android", "asp.net", "c++","c", "c#", "css", "html", "java", "javascript", "jquery", "php", "python", "ruby", "sql", "ios"]
# print(jobs[1])
# f = open('jobTitle.csv', 'a')
# writer = csv.writer(f)
for i in range (len(jobs)):
    result = requests.get("https://wuzzuf.net/search/jobs/?q="+jobs[i]+"&a=hpb")


    data = result.content

    soup = BeautifulSoup(data, "lxml")

    # print(soup)
    job_title = []
    job_company = []
    skill = []


    job_titles = soup.find_all("h2", {"class": "css-m604qf"})
    # print(job_title)

    company_names = soup.find_all("a", {"class": "css-17s97q8"})
    # print(company_name)
    job_skills = soup.find_all("div", {"class": "css-y4udm8"})  
    for i in range (len(job_titles)):
        job_title.append(job_titles[i].text)
        # f.append(job_titles[i].text)
    

    for i in range (len(company_names)):
        job_company.append(company_names[i].text)

    for i in range (len(job_skills)):
        skill.append(job_skills[i].text)


# print(job_title)
# print(job_company)
# print(skill)

# f = open('recruiters.csv', 'a')
# writer = csv.writer(f)

# f.write("job_title,job_company,skill\n")
# for i in range (len(job_title)):
#     for j in range (len(skill[i])):
#         writer.writerow([job_title[i],job_company[i],skill[i]])
# write job_title to column in csv file

# for i in range (len(job_title)):
#     writer.writerow([job_title[i]])
print(job_title)
# f.close()


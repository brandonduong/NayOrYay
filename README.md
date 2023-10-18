# Nay or Yay

Social media webapp where users are presented a new statement/question every day and can answer whether they disagree (Nay) or agree (Yay).

## Voice your opinion to a new question every day.

Users can browse controversial questions/statements and vote on whether they disagree (Nay) or agree (Yay).

![image](https://github.com/brandonduong/NayOrYay/assets/48176127/445242be-db5f-42b7-9818-0272a3b10633)

## Category List

Categories include the Nay or Yay daily questions, or questions created by the community. Community categories are self-regulating such that the most popular are shown first.

![image](https://github.com/brandonduong/NayOrYay/assets/48176127/e500b787-cedb-47b7-9146-484c23bdd274)

## Question/Statement List

Each category has their own list of questions that were either created by Nay or Yay, or by the community. Signed in users can see their answer to each question.

![image](https://github.com/brandonduong/NayOrYay/assets/48176127/89c7d734-de9c-46be-b273-06e92dfcfc9b)

## Question/Statement

Signed in users can vote Nay or Yay depending on their opinion.

![image](https://github.com/brandonduong/NayOrYay/assets/48176127/401fba8a-b8e8-419b-820d-af8f867c9ab5)

## Votes

Each question stores who voted which option and displays the results.

![image](https://github.com/brandonduong/NayOrYay/assets/48176127/dd547551-422b-4dd8-a85d-99ae8b17d531)

## Add Category

Any user can create a category as long as the name is unique.

![image](https://github.com/brandonduong/NayOrYay/assets/48176127/85652d8a-cc9f-4c51-8643-d35ab44b0135)

## Add Question

Any user can create a question within any category.

![image](https://github.com/brandonduong/NayOrYay/assets/48176127/fd5b8eea-0e75-4d8f-8e42-bef3c34dd19a)

## Profile

Users can share their profile with others to show off their votes, organized by category.

![image](https://github.com/brandonduong/NayOrYay/assets/48176127/5142a5c5-ec85-4a5d-a0f5-853197201783)

# Project Setup
    npm install
    npm run start

## Build and Deploy
In ./ and ./client
    
    npm run build
    eb deploy ENVIRONMENT_NAME

Need ec2 instance that is connected to postgresql database from RDS. Found out the hard way AWS RDS, Elastic Beanstalk, and EC2 are expensive, so no live deployment.

# Videogames Inventory
Hi there :wave: ! This is a videogame inventory app, my test project.  

<br>

# Getting Started

First of all, after clone the project run the next command to install the dependencies:
```
npm install
```
<br>

Before you run the project, you have to create a .env file with the following properties:
```
AWS_SQS_ACCES_KEY_ID
AWS_SQS_SECRET_ACCESS_KEY
AWS_SQS_URL
DB_URL
JWT_SECRET
PORT
```

<br>

You can run your project locally by using `Docker` or running the following command: 
```
npm run dev
```
As the project uses `nodemon`, it will be nicer to work as changes are instantly shown.  

<br>

To run tests on the project run:
```
npm run test
```

<br>

To run lint on the project run:

```
npm run lint
```
<br>
<br>

# Workflow Diagram:
```mermaid
  flowchart TD
    Client --> VideogamesApi --> Atlas-MongoDB
    VideogamesApi --> AWS-SQS
    AWS-SQS --> AWS-Lambda
    AWS-Lambda --> AWS-SES
```

<br>

Our friends:
- [NodeJS :coffee:](https://nodejs.dev):
- [Express](https://expressjs.com)
- [Docker :whale:](https://www.docker.com)
- [AWS SQS](https://aws.amazon.com/sqs/)
- [AWS SES :email:](https://aws.amazon.com/ses/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Atlas MongoDB](https://www.mongodb.com/atlas)

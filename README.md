# Backend Software Web Engineer (m/f/x) Assessment at payever


# 1. Complete the Tasks
Please read through everything and follow the steps. We cannot help you technically as it’s required to solely finish the task without external help to make it equally fair for every participant.


## BACKEND ENGINEERING TASK
## ESTIMATED TIME: 240 MINUTES (you are allowed to take more time)

Your task today is to create a simple REST application from scratch. To reduce implementation time, please use the NestJS framework (this is a MUST, don’t use any other framework). The application should implement a nodeJS server API communicating with this: https://reqres.in/


## Please use the following prerequisites below:

- use TypeScript 3.4 and above. 

- use NestJS Framework, https://docs.nestjs.com/ 

- use MongoDB 4.4 and above 

- use RabbitMQ 3.7 and above




Your REST app should consist of:



## 1. POST /api/users

On the request store the user entry in db. After the creation, send an email and rabbit event. Both can be dummy sending (no consumer needed).

## 2. GET /api/user/{userId}

Retrieves data from https://reqres.in/api/users/{userId} and returns a user in JSON representation.

## 3. GET /api/user/{userId}/avatar

Retrieves image by 'avatar' URL.

On the first request it should save the image as a plain file, stored as a mongodb entry with userId and hash. Return its base64-encoded representation.

On following requests should return the previously saved file in base64-encoded. representation (retrieve from db).

## 4. DELETE /api/user/{userId}/avatar

Removes the file from the FileSystem storage.

Removes the stored entry from db.


The main goal of the task is to show your skills in the best way possible.

Done?

### 1. Your project passes eslint
### 2. The project builds and can start
### 3. All endpoints can be requested from postman
### 4. Data is stored in database successfully and rabbit event is emitted
### 5. Your application is covered with unit/functional tests


`
  ``` please set according to your enviroment, set/create the '.env' file with your updated parameters

please set according to your enviroment, set/create the '.env' file with your updated parameters
MAILER_USER= <YOUR-MAILER-USER>
MAILER_PASS=<YOUR-MAILER-PASS>
MAILER_HOST=<YOUR-MAILER-HOST>
MAILER_PORT=<YOUR-MAILER-PORT>
MONGO_URI= <YOUR-MONGO-URI>
RABBITMQ_URL=<YOUR-RABBITMQ-URL>

then install npm modules using "npm install" to install all dependencies
after installation "npm run start" will start up the application using a nest.js script, running on port 3000. 
Now you can starting sending request or running tests on localhost:3000/api

  ```

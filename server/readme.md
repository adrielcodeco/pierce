# Server

## Patterns

Clean Architecture + DI/IoC/Composition Root + Repository Pattern

## SourceCode

typescript + ts-lint + StandardJS

## Framework

ExpressJS + routing-controllers + inversify

## Database

PostgreSQL + TypeORM

## Swagger

swagger-ui-express + routing-controllers-openapi

## Auth

jsonwebtoken + bcryptjs


## conciderations

1. the modeling was not defined by you so i felt free to create in simple way for my convenience
2. the validations not specificated so i felt free to manipulate in simple way for my convenience
3. the response format was not standardized becase it consume a lot of time
4. the swagger is not handsome becase it consume a lot of time
5. the "password" and "repeat password" are frontend validations, the backend need only password, so i didnt do it on the backend
6. i dont like and dont recomend docker for prodution environment, so i used docker for dev environment only
    i recommend AWS Elastic Beanstalk or Azure App Service
7. reset password cant be validated, if the email is valid the user will receive an email to reset password

All this things, in real projects, need more care and devotion

## Steps to test

* ```yarn install --ignore-scripts```
* ```yarn docker:dev```
* run tests (choice one of these options)
    * on magestic
        * goto http://localhost:4000
        * click in button "run tests"
    * on terminal
        * ```yarn docker:dev:attach```
        * ```yarn test```


## prints

![Docker Stack](/dockerStack.png)

![Tests Result](/testsResult.png)

![Code Coverage](/codeCoverage.png)

![Majestic](/majestic.png)

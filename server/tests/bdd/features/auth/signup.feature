Feature: Signup

Scenario: Register a new user
   Given i havent an account
    When i send my email, firstName and password
    Then my account will be created

Scenario: Sinup with invalid email
   Given i havent an account
    When i send an invalid email, firstName and password
    Then my account will not be created

Scenario: Sinup password length must be more than 4 digits
   Given i havent an account
    When i send my email, firstName and password with 3 digits
    Then my account will not be created
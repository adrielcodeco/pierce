Feature: Remove items

Scenario: Remove items
   Given i have an access token
     And i have an item in database
    When i send a delete request
    Then i will receive a list of items
Feature: List items

Scenario: List items
   Given i have an access token
     And i have items in database
    When i send a list request
    Then i will receive a list of items
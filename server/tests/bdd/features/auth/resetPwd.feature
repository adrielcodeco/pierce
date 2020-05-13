Feature: Reset password

Scenario: Reset password with success
   Given i have an account
    When i send my email
    Then my password will be reset

Feature: Alter Item

Scenario Outline: Alter Item
            Given i have an access token
              And i have an item in database
             When i send the id of the item and a new <name> and <groups> for the item
             Then i will receive a response with <msgs>
 Examples:
 | name   | groups | msgs                                         |
 |        | g3     | isString,isNotEmpty                          |
 | item 2 |        | arrayUnique,arrayNotEmpty,isArray,isNotEmpty |
 | item 2 | g3,g3  | arrayUnique                                  |
 | item 2 | g3,g4  |                                              |
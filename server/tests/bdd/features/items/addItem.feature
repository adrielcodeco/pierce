Feature: Add Item

Scenario Outline: Add Item
            Given i have an access token
             When i send the <name> and <groups> of the item
             Then i will receive a response with <msgs>
 Examples:
 | name   | groups | msgs                                         |
 |        | g1     | isString,isNotEmpty                          |
 | item 1 |        | arrayUnique,arrayNotEmpty,isArray,isNotEmpty |
 | item 1 | g1,g1  | arrayUnique                                  |
 | item 1 | g1,g2  |                                              |
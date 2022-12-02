# Question service

## Database schema

| Name | Type |
|------|------|
| id | uuid |
| title | string |
| description | string |
| author | string |
| votes | int |
| answers | int |
| views | int |
| tags | [string] |
| creationDate | timestamp |
| modifiedDate | timestamp |

## API

### GET /questions

* **Description**: Returns a list of the most recent questions, in the future could be implemented to return most relevant questions.

* Request body:

```json
{
  "title": "Title of a question",
  "description": "Description of a question",
  "author": "",
  "tags": [string]
}
```

* Response
	* `200 OK`, `[Question]` - Returns a list of questions with all of the information.
	* `400 Bad Request` - Returns `Bad Request` when one of the fields is missing or wrong type.

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

* Response:
	* `200 OK`, `[Question]` - Returns a list of questions with all of the information.

### GET /questions/{id}

* **Description**: Returns a list of the most recent questions, in the future could be implemented to return most relevant questions.

* Response:
	* `200 OK`, `Question` - Returns a question.
  * `404 Not Found` - Returns `Not Found` if the question with given id does not exist.

### GET /questions/tags/{tag}

* **Description**: Returns a list of the most recent questions with given tag in the future could be implemented to return most relevant questions.

* Response:
	* `200 OK`, `Question` - Returns a list of questions.

### POST /questions

* **Description**: Creates a new question and saves it to a database.

* Request body:

```json
{
  "title": "Title of a question",
  "description": "Description of a question",
  "author": "",
  "tags": [string]
}
```

* Response:
	* `200 OK`, `Question` - Returns a questions that was created.
	* `400 Bad Request` - Returns `Bad Request` when one of the fields is missing or is of a wrong type.

### PUT /questions/{id}

* **Description**: Updates a question.

* Request body:

```json
{
  "id", "uuid of the question",
  "title": "New title or old title if it is left unchanged",
  "description": "New description or old description",
  "tags": [string]
}
```

* Response:
	* `200 OK`, `Question` - Returns a question if it was updated successfully.
	* `400 Bad Request` - Returns `Bad Request` when one of the fields is missing or is of a wrong type.
  * `401 Unauthorized` - If a user that is not an author of a question tries to modify it.
  * `404 Not Found` - If the question id is not found.

### DELETE /questions/{id}

* **Description**: Deletes a question with given id and all of the comments.

* Response:
  * `204 No Content` - If a question is deleted successfully.
  * `401 Unauthorized` - If a user that is not the author of a question tries to delete it.
  * `404 Not Found` - If a question with given id is not found.

### POST /questions/{id}/vote

* **Description**: Gives `+1` or `-1` votes to a question.

* Request body:

```json
{
  "id": "uuid",
  "votes": "upvote" or "downvote"
}
```

* Response:
  * `200 Ok` - If a vote has been successfully submitted.
  * `400 Bad Request` - If request body contains invalid information.
  * `401 Unauthorized` - If a user that is not logged in tries to vote on a question.
  * `404 Not Found` - If a question with given id is not found.

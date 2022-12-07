# Comment service

## Database schema

| Name | Type |
|------|------|
| comment_id | uuid |
| question_id | uuid |
| author_id | uuid |
| content | string |
| votes | int |
| upvotes | [uuid] |
| downvotes | [uuid] |
| creationDate | timestamp |
| modifiedDate | timestamp |

## API

### General rules - every request must contain authorization token 

### GET /comments/{questionId}

* **Description**: Returns a list of all comments on selected question.

* Response:
	* `200 OK`, `[Comment]` - Returns the list of comments.
    * `404 Not Found`       - If the question with give id does not exist.

### POST /comments/{questionId}

* **Description**: Creates a new comment on question with given id.

* Request body:

```json
{
    "content": string,  
    "userId": uuid
}
```

* Response:
	* `200 OK`, `Comment`  - Returns the comment that was created.
	* `400 Bad Request`    - Returns error message with information on what field is missing or what value has wrong type.
	* `404 Not Found`      - If the question with given id does not exist.

### PUT /comments/{commentId}

* **Description**: Updates the comment with given id.

* Request body:

```json
{
    "content": string,
    "userId": uuid
}
```

* Response:
	* `200 OK`, `Comment` - Returns comment if it was updated successfully.
	* `400 Bad Request`   - Returns error message with information on what field is missing or what value has wrong type.
    * `401 Unauthorized`  - If a user that is not an author of a comment tries to modify it.
    * `404 Not Found`     - If the comment with given id does not exists.

### DELETE /comments/{questionId}

* **Description**: Deletes all the comments for question with given id.

* Response:
    * `204 No Content`    - If the comments are deleted successfully.
    * `401 Unauthorized`  - If user is not a moderator or if request is not sent by question service.
    * `404 Not Found`     - If the comment with given id does not exist.

### DELETE /comments/{questionId}/{commentId}

* **Description**: Deletes the comment with given id.

* Response:
    * `204 No Content`    - If the comment is deleted successfully.
    * `401 Unauthorized`  - If a user that is not the author of the comment nor moderator tries to delete it.
    * `404 Not Found`     - If the comment with given id does not exist.

### PUT /comment/{commentId}/upvote

* **Description**: Gives `+1` votes to the comment.

* Request body:

```json
{
    "userId": uuid
}
```

* Response:
    * `200 Ok`            - Returns current vote count if a vote has been successfully submitted.
    * `400 Bad Request`   - If same vote has been already submitted.
    * `401 Unauthorized`  - If a user that is not logged in tries to vote on the comment.
    * `404 Not Found`     - If a comment with given id does not exist.

### PUT /comment/{commentId}/downvote

* **Description**: Gives `-1` votes to the comment.

* Request body:

```json
{
    "userId": uuid
}
```

* Response:
    * `200 Ok`            - Returns current vote count if a vote has been successfully submitted.
    * `400 Bad Request`   - If same vote has been already submitted.
    * `401 Unauthorized`  - If a user that is not logged in tries to vote on the comment.
    * `404 Not Found`     - If a comment with given id is not found.

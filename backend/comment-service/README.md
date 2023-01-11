# Comment service

## Database schema

| Name | Type |
|------|------|
| comment_id | ObjectId |
| question_id | ObjectId |
| author_id | ObjectId |
| content | string |
| votes | int |
| upvotes | [ObjectId] |
| downvotes | [ObjectId] |
| creationDate | timestamp |
| modifiedDate | timestamp |

## API

### General rules - every request must contain authorization token 

### GET /comments/{questionId}

* **Description**: Returns a list of all comments on selected question.

* Response:
	* `200 OK`, `[Comment]` - Returns the list of comments.
    * `400 Bad Requset`       - If the question ID is invalid.
    * `500 Internal Server Error`

### POST /comments/{questionId}

* **Description**: Creates a new comment on question with given id.

* Request body:

```json
{
    "content": string,  
    "userId": ObjectId
}
```

* Response:
	* `200 OK`, `Comment`  - Returns the comment that was created.
	* `400 Bad Request`    - Returns error message with information on what field is missing or what value has wrong type.
	* `404 Not Found`      - If the question with given id does not exist.
    * `500 Internal Server Error`

### PUT /comments/{commentId}

* **Description**: Updates the comment with given id.

* Request body:

```json
{
    "content": string,
    "userId": ObjectId
}
```

* Response:
	* `200 OK`, `Comment` - Returns comment if it was updated successfully.
	* `400 Bad Request`   - Returns error message with information on what field is missing or what value has wrong type.
    * `401 Unauthorized`  - If a user that is not an author of a comment tries to modify it.
    * `404 Not Found`     - If the comment with given id does not exists.
    * `500 Internal Server Error`

### DELETE /comments/{questionId}

* **Description**: Deletes all the comments for question with given id.

* Response:
    * `204 No Content`    - If the comments are deleted successfully.
    * `400 Bad Request`   - If question ID is invalid.
    * `401 Unauthorized`  - If user is not a moderator or if request is not sent by question service.
    * `500 Internal Server Error` - If internal server error occurs.

### DELETE /comments/{questionId}/{commentId}

* **Description**: Deletes the comment with given id.

* Response:
    * `204 No Content`    - If the comment is deleted successfully.
    * `401 Unauthorized`  - If a user that is not the author of the comment nor moderator tries to delete it.
    * `404 Not Found`     - If the comment with given id does not exist.
    * `500 Internal Server Error` - If internal server error occurs.

### PUT /comment/{commentId}/upvote

* **Description**: Gives `+1` votes to the comment.

* Request body:

```json
{
    "userId": ObjectId
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
    "userId": ObjectId
}
```

* Response:
    * `200 Ok`            - Returns current vote count if a vote has been successfully submitted.
    * `400 Bad Request`   - If same vote has been already submitted.
    * `401 Unauthorized`  - If a user that is not logged in tries to vote on the comment.
    * `404 Not Found`     - If a comment with given id is not found.

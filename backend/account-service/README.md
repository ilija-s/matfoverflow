# Account service

## Database schema

| Name | Type |
| -----|------|
| email | string | 
| user_id | uuid |
| username | string |
| password | string | 
| name | string |
| surname | string | 
| picturePath | string |
| year | int |
| course | string |


## API 

### Every request must contain username/author_id token

### GET /account/{username} or /account/{author_id}

* Return profile account
* Response: 
    * `200 OK`, `Profile data` - Return profile information
    * `404 Not found` - Account doesn't exist

### POST /account

* Creates a new profile with given user_id

* request json data: 
```json
 {
    "email" : string,
    "username" : string,
    "password" : string, 
    "course" : string
}
```

* Response: 
    * `201 OK`, Return true if profile was created.
    * `400 Bad request` - Missing some information
    * `403 Forbidden` - Account already exist with same username

    
### PUT /account/{username}/{password}

* Update password with given username

* Response:
    * `200 OK` - Successfully update
    * `400 Bad request` - Incorrect password
    * `404 Not found` - User does not exist.


### PUT /account/{username}/{email}

* Update email with given username

* Response:
    * `200 OK` - Successfully update
    * `400 Bad request` - Incorrect password
    * `404 Not found` - User does not exist.

    
### PUT /account/{username}

* Update username

* Response:
    * `200 OK` -  Successfully update
    * `400 Bad request` - Input new username
    * `404 Not found` - User does not exist

### DELETE /account/{username}

*DELETE account

* Response:
    * `200 OK` - Successfully deleted
    * `404 Not found` - User does not exist.














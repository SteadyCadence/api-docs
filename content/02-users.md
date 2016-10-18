## Managing a user account

This section outlines all endpoints that begin with `/api/vi/account/`.

### Login{#login}

Many endpoints of Cadasta's API require an authenticated user. To authenticate a user you need to sign API requests with an authorization token, which you can obtain by login the user in.


```
endpoint
POST /api/v1/account/login/
```

**Request payload**

Property | Description
---|---
`username` | The user's username.
`password` | The user's password.

**Response properties**

Property | Description
---|---
`auth_token` | The authorization token, use it to sign requests to the API.

**Response codes**

Property | Description
---|---
`200` | The user was logged in successfully.
`400` | Username or password were incorrect or the user has not verified their email address.

#### Example response

```json
{
  "auth_token": "UER33kHWhdLPq9nKkvENFtLvu3FF68GQ"
}
```

### Logout

Logging a user out removes the authorization token. Requests cannot be signed 
with any token obtained previously.

```endpoint
POST /api/v1/account/logout/
```

**Request payload**

No payload required.

**Response codes**

Property | Description
---|---
`200` | The user was logged out successfully.

### Register a new user

Register a new user to the platform. _Note:_ This does not log the user in.

```endpoint
POST /api/v1/account/register/
```

**Request payload**

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`password` | The user's password.
`full_name` | (optional) The user's full name.
`email` | The user's email address.

#### Example response

```json
{
    "username": "j_smith",
    "full_name": "Joe Smith",
    "email": "joe.smith@example.com",
    "email_verified": false
}
```

**Response**

The response contains a JSON object with the following properties.

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | (optional) The user's full name.
`email` | The user's email address.
`email_verified` | Boolean indicating whether the user has verified their email address.

**Response codes**

Property | Description
---|---
`201` | The user was registered successfully.
`400` | The is problem with the user data provided.

### Get the user account

Returns the account information for the user that is authenticated with the request.

```endpoint
GET /api/v1/account/
```

#### Example response

```json
{
    "username": "j_smith",
    "full_name": "Joe Smith",
    "email": "joe.smith@example.com",
    "email_verified": false
}
```

**Response**

The response contains a JSON object with the following properties.

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | (optional) The user's full name.
`email` | The user's email address.
`email_verified` | Boolean indicating whether the user has verified their email address.

**Response codes**

Property | Description
---|---
`201` | The user was returned successfully.
`401` | No authentication token was provided with the `Authorization` header.

### Update the user account

Update the user's credentials.

```endpoint
PATCH /api/v1/account/
```

**Request payload**

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | (optional) The user's full name.
`email` | The user's email address.

#### Example response

```json
{
    "username": "j_smith",
    "full_name": "Joe Smith",
    "email": "joe.smith@example.com"
}
```

**Response**

The response contains a JSON object with the following properties.

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | (optional) The user's full name.
`email` | The user's email address.
`email_verified` | Boolean indicating whether the user has verified their email address.

**Response codes**

Property | Description
---|---
`201` | The user was updated successfully.
`400` | The is problem with the user data provided.
`401` | No authentication token was provided with the `Authorization` header.

### Activate a user account

```endpoint
POST /api/v1/account/activate/
```

### Change the password

```endpoint
POST /api/v1/account/password/
```

**Request payload**

Property | Description
---|---
`new_password` | The new password.
`re_new_password` | A confirmation of the new password.
`current_password` | The current password. 

**Response codes**

Property | Description
---|---
`200` | The user's password was updated successfully.
`400` | The is problem with the user data provided, e.g. the passwords don't match.
`401` | No authentication token was provided with the `Authorization` header.


### Reset the password

Request a reset of the user's password.

```endpoint
POST /api/v1/account/password/reset/
```

**Request payload**

Property | Description
---|---
`email` | The email address of the user that wishes to reset their password.

**Response codes**

Property | Description
---|---
`200` | The request has been sent succesfully.
`400` | The email address provided is either not valid or there was no user found with that email address.

### Confirm the password reset

```endpoint
POST /api/v1/account/password/reset/confirm/
```

## Platform Users

### List platform users

```endpoint
GET /api/v1/users/
```

### Get a platform user

```endpoint
GET /api/v1/users/{username}/
```

### Update a platform user

```endpoint
PATCH /api/v1/users/{username}/
```

## Managing a user account

You can use the Cadasta API to manage user accounts, provided that you have their login and password. This section outlines how to do that. 

### Log a User In 

> Beth notes: right now, this grants me my authorization token but doesn't actually log me in. If I want to actually log in, I have to log in on the staging site. (This might be how this is supposed to work, but I'm noting it here just in case.)

```endpoint
POST /api/v1/account/login/
```

Many endpoints of Cadasta's API require an authenticated user. To authenticate a user, you need to sign API requests with an authorization token, which you can obtain by logging the user in.

Getting your authorization token is one of the first things you need to do before using the Cadasta Platform API.

**Request payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username.
`password` | CharField | x | The user's password.

#### Example response

```json
{
  "auth_token": "UER33kHWhdLPq9nKkvENFtLvu3FF68GQ"
}
```

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---
`auth_token` | The authorization token, use it to sign requests to the API.


**Response codes**

Property | Description
---|---
`200` | The user was logged in successfully.
`400` | Username or password were incorrect or the user has not verified their email address.

***









### Log a User Out 

```endpoint
POST /api/v1/account/logout/
```
Logging a user out removes their authorization token. Requests cannot be signed with any token obtained previously.

**Request payload**

No payload required.

#### Example response

Once a user is logged out, you'll see an HTTP 200 message like this one:

```
HTTP 200 OK
Allow: POST, OPTIONS
Content-Type: application/json
Vary: Accept
```

**Response codes**

Property | Description
---|---
`200` | The user was logged out successfully.

***










### Register a new user

Register a new user to the platform. _**Note:** This does not log the user in._

```endpoint
POST /api/v1/account/register/
```

**Request payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x |The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | CharField |  | The user's full name.
`email` | EmailField| x |The user's email address.
`password` | CharField | x |The user's password.
`email_verified` | BooleanField|  |Whether or not the email has been verified.

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

The response contains a JSON object with the following properties:

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | The user's full name. (optional)
`email` | The user's email address.
`email_verified` | Boolean indicating whether the user has verified their email address.

**Response codes**

Property | Description
---|---
`201` | The user was registered successfully.
`400` | The is problem with the user data provided.

***





### Get the User Account

```endpoint
GET /api/v1/account/
```
Returns the account information for the user authenticated with the request.

**Request Payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | CharField | | (optional) The user's full name.
`email` | EmailField | x | The user's email address.
`email_verified` | BooleanField | | Indicates whether the user has verified their email address.
`last_login` | DateTimeField | | Date and time of last user login.

#### Example response

```json
{
    "username": "j_smith",
    "full_name": "Joe Smith",
    "email": "joe.smith@example.com",
    "email_verified": false
    "last_login": "2016-10-20T19:20:27.848272Z"
}
```

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | (optional) The user's full name.
`email` | The user's email address.
`email_verified` | Boolean indicating whether the user has verified their email address.
`last_login` | Date and time of last user login.


**Response codes**

Property | Description
---|---
`201` | The user was returned successfully.
`401` | No authentication token was provided with the `Authorization` header.

***







### Update a User Account

```endpoint
PATCH /api/v1/account/
```

Update the user's credentials.


**Request payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | CharField | | (optional) The user's full name.
`email` | EmailField | x | The user's email address.
`email_verified` | BooleanField | | Indicates whether the user has verified their email address.
`last_login` | DateTimeField | | Date and time of the user's last login.

#### Example response

```json
{
    "username": "j_smith",
    "full_name": "Joe Smith",
    "email": "joe.smith@example.com"
    "email_verified": false,
    "last_login": "2016-10-20T19:20:27.848272Z"
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
`last_login` | Date and time of the user's last login.

**Response codes**

Property | Description
---|---
`201` | The user was updated successfully.
`400` | There is problem with the user data provided.
`401` | No authentication token was provided with the `Authorization` header.

***








### Activate a user account

> Oliver writing up a bit about how this works, as apparently it's a bit complicated

```endpoint
POST /api/v1/account/activate/
```

> Description goes here

**Request payload**

Property | Type | Required? | Description
---|---|:---:|---
`uid` | CharField | x | 
`token` | CharField | x | 


#### Example response

```json
{

}
```

**Response**

The response contains a JSON object with the following properties.

Property | Description
---|---
`uid` | 
`token` | 

**Response codes**

Property | Description
---|---

***






### Change the password

```endpoint
POST /api/v1/account/password/
```

Changes the password for a user's account.

**Request payload**

Property | Type | Required? | Description
---|---|:---:|---
`new_password` | CharField | x | The new password.
`re_new_password` | CharField | x | A confirmation of the new password.
`current_password` | CharField | x | The current password. 

#### Example response

No response is shown; only a response code (shown below).

**Response codes**

Property | Description
---|---
`200` | The user's password was updated successfully.
`400` | The is problem with the user data provided, e.g. the passwords don't match.
`401` | No authentication token was provided with the `Authorization` header.

***






### Reset the password

> Oliver to draft some language to address the following issue:

>>>Beth writes: I sent a password reset to my staging account. When I clicked on the link in the email, I go this. Tried logging out and clicking again, and I got the same response.

>>Oliver writes: That’s correct behaviour; it’s similar to activating your account. You probably received that URL via an email, right? The thing with this is, the developer need to implement that URL in the client, the client reads the two tokens (`Nw` and `4gb-…` in your case and `POST` them with `/api/v1/account/password/reset/confirm/`). We need to document this in the API docs. I’ll write something up

```endpoint
POST /api/v1/account/password/reset/
```

Request a reset of the user's password.

**Request payload**

Property | Type | Required? | Description
---|---|:---:|---
`email` | EmailField| x | The email address of the user that wishes to reset their password.

#### Example response

No response is shown; only a response code (shown below).

**Response codes**

Property | Description
---|---
`200` | The request has been sent succesfully.
`400` | The email address provided is either not valid or there was no user found with that email address.

***






### Confirm the password reset

> Oliver, this requires the UID and I'm not sure what that is. Seems similar to activating a user account. I may need your help filling in the blanks below.

```endpoint
POST /api/v1/account/password/reset/confirm/
```
Confirms that a password has been reset.

**Request Payload**

Property | Type | Required? | Description
---|---|:---:|---
`uid` | CharField| ? | 
`token` | CharField| ? | 
`new_password` | CharField | ? | The new password.
`re_new_password` | CharField | ? | A confirmation of the new password.

#### Example Response

> not sure, can't see

**Response codes**

> what other response codes go here?

Property | Description
---|---
`200` | The request has been sent succesfully.

***





## Manage Users in Relation to an Organization

If you need to see all the users 

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





### Replace a platform user

```endpoint
PATCH /api/v1/users/{username}/
```

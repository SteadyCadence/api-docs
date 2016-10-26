## Managing a User Account

> add `account` object

You can use the Cadasta API to manage user accounts, provided that you have their username and password. This section outlines how to do that, focusing on endpoints that start with: 

```endpoint
api/v1/account
```

An `account` JSON object contains the following properties:

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | CharField | | (optional) The user's full name.
`email` | EmailField | x | The user's email address.
`email_verified` | BooleanField | | Indicates whether the user has verified their email address.
`last_login` | DateTimeField | | Date and time of last user login.

***

### Log a User In 

```endpoint
POST /api/v1/account/login/
```

Getting your authorization token is one of the first things you need to do before using the Cadasta Platform API. That's because many endpoints of Cadasta's API require an authenticated user. To authenticate a user, you need to sign API requests with an authorization token, which you can obtain by logging the user in.

Note that logging a user into the API does not log them into the platform.


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


***









### Log a User Out 

```endpoint
POST /api/v1/account/logout/
```
Logging a user out removes their authorization token. Requests cannot be signed with any token obtained previously.

Note that logging a user out of the API does not log them out of the platform.

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

***










### Register a New User

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
`full_name` | CharField | | The user's full name.
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

No response is shown; only a response code.


***









## Manage Users in Relation to their Organizations

> format `users` object so that it's consistent and linkable.

This section refers to endpoints that begin with: 

```
/api/v1/users/
```

`users` is different than `account` in that it shows the organizations that the user is a part of. 

The `users` JSON object is structured like this:

* `username`: CharField (Required)
* `full_name`: CharField
* `email`: EmailField (Required)
* `organizations`: ListSerializer (Array of objects)
    * `id`: CharField
    * `slug`: SlugField
    * `name`: CharField (Required)
    * `description`: CharField
    * `archived`: BooleanField
    * `urls`: ListField
    * `contacts`: JSONField
    * `users`: ListSerializer (Array of objects)
        * `username`: CharField (Required)
        * `full_name`: CharField
        * `email`: EmailField (Required)
        * `email_verified`: BooleanField
        * `last_login`: DateTimeField
* `last_login`: DateTimeField
* `is_active`: BooleanField

Here is a table of the first tier properties:

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` |  CharField | | The user's full name.
`email` |  EmailField  | x | The user's email associated with their account.
`organizations` |  ListSerializer | | An array of properties in the `organization` object. See table below for more information.
`last_login` | DateTimeField |  | Date and time of last user login.
`is_active`| BooleanField |  | Whether or not the user is active.


Here is a table of the properties of the `organizations` object (which is contained in the `users` object):


Property | Type | Required? | Description
---|---|:---:|---
`id` | CharField |  | The ID of the organization.
`slug` | SlugField |  | The short label of the organization; usually based in URLs.
`name` | CharField | x | The name of the organization.
`description` | CharField |  | A long-form description of the organization.
`archived` | BooleanField |  | Indicates whether or not the organization has been archived.
`urls` | ListField |  | A list of URLS to websites of this organization. 
`contacts` | JSONField |  | A list of contacts for this organization. A contact is a JSON object containing name, email (optional) and tel (optional).
`users` | ListSerializer |  | An array of properties in the `users` object. See table below for more information.

And here is a table of the properties of `users`, an array of a user account associated with an organization: 

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username.
`full_name` | CharField |  | The user's full name. 
`email` | EmailField | x | The user's email associated with their Cadasta account.
`email_verified` | BooleanField |  | Whether or not the email has been verified.
`last_login` | DateTimeField |  | The last date of the user's login.


***





### List platform users

> Oliver,  need response information

```endpoint
GET /api/v1/users/
```
The above method returns all of the users in the platform. 

**Request Payload**

No request payload, however an authorization key connected to an account with appropriate permissions is required.

#### Example response

```json
{

}
```

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---


***







### Get a platform user

> Oliver, need response information

```endpoint
GET /api/v1/users/{username}/
```
Use the above method to view a single user in the platform. For example, to see the information for username `janesmith`, you'd write:

```
https://platform-staging-api.cadasta.org/api/v1/users/janesmith/
``` 

**Request Payload**

No request payload, however an authorization key connected to an account with appropriate permissions is required.

#### Example response

```json
{

}
```

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---


***




### Update a platform user

```endpoint
PATCH /api/v1/users/{username}/
```

Use the above method to update some of the fields associated with a specific username.

**Request Payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` |  CharField | | The user's full name.
`email` |  EmailField  | x | The user's email associated with their account.
`organizations` |  ListSerializer | | An array of properties in the `organization` object. See table below for more information.
`last_login` | DateTimeField |  | Date and time of last user login.
`is_active`| BooleanField |  | Whether or not the user is active.


#### Example response

```json
{

}
```

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---



***



### Replace a platform user

> Oliver, need response information

```endpoint
PUT /api/v1/users/{username}/
```

Use the above method to replace a user.

**Request Payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` |  CharField | | The user's full name.
`email` |  EmailField  | x | The user's email associated with their account.
`organizations` |  ListSerializer | | An array of properties in the `organization` object. See table below for more information.
`last_login` | DateTimeField |  | Date and time of last user login.
`is_active`| BooleanField |  | Whether or not the user is active.


#### Example response

```json
{

}
```

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---


***

## Managing a User Account

Unless simply viewing publicly available organizations and projects, individuals who use the Cadasta Platform are required to <a href="https://docs.cadasta.org/en/01-gettingstarted.html#createnewaccount" target="_blank">set up a user account</a>. 

You can use the Cadasta API to manage these accounts, provided that you have their username and password. This section outlines how to do that, focusing on endpoints that start with: 

```
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

#### Example Account JSON Object

```json
{
    "username": "janedoe",
    "full_name": "Jane Doe",
    "email": "jane@cadasta.org",
    "email_verified": true,
    "last_login": "2016-10-25T20:20:14.192918Z"
}
```

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
`password` | CharField | x | The user's password.
`username` | CharField | x | The user's username.

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---
`auth_token` | The authorization token, use it to sign requests to the API.

#### Example Response

```json
{
  "auth_token": "UER33kHWhdLPq9nKkvENFtLvu3FF68GQ"
}
```

***









### Log a User Out 

```endpoint
POST /api/v1/account/logout/
```
Logging a user out removes their authorization token. Requests cannot be signed with any token obtained previously.

Note that logging a user out of the API does not log them out of the platform.

**Response**

When the logout was successful, you receive an empty response with status code `200`.

***










### Register a New User / Create a New User Account


```endpoint
POST /api/v1/account/register/
```

Use the above method and endpoint to register a new user to the platform. Note that this does not log the user in, simply creates a new account for them.


**Request payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x |The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | CharField |  | The user's full name.
`email` | EmailField| x |The user's email address.
`password` | CharField | x |The user's password.

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | The user's full name. (optional)
`email` | The user's email address.
`email_verified` | Boolean indicating whether the user has verified their email address.

#### Example response

```json
{
    "username": "j_smith",
    "full_name": "Joe Smith",
    "email": "joe.smith@example.com",
    "email_verified": false
}
```

***





### Get the User Account

```endpoint
GET /api/v1/account/
```
The above method and endpoint returns the account information for the user authenticated with the request.

**Response**

The response contains a JSON object with the following properties:

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | (optional) The user's full name.
`email` | The user's email address.
`email_verified` | Boolean indicating whether the user has verified their email address.
`last_login` | Date and time of last user login.

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

***






### Update a User Account

```endpoint
PATCH /api/v1/account/
```

Update a user's credentials using the above method and endpoint.


**Request payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | CharField | | The user's full name.
`email` | EmailField | x | The user's email address.

**Response**

The response contains a JSON object with the following properties.

Property | Description
---|---
`username` | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` | (optional) The user's full name.
`email` | The user's email address.
`email_verified` | Boolean indicating whether the user has verified their email address.
`last_login` | Date and time of the user's last login.

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

***









### Change the password

```endpoint
POST /api/v1/account/password/
```

This method and endpoint changes the password for a user's account.

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









## Manage Platform Users

This section refers to endpoints that begin with: 

```
/api/v1/users/
```

These endpoints are primarily for use by superusers – individuals who have special account access for an instance of of the Cadasta Platform. They can be used as an entry point to see all users in the platform. 

Here is a table of the first tier properties of the :

Property | Type | Required? | Description
---|---|:---:|---
`username` | `String` | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` |  `String` | | The user's full name.
`email` |  `String` | x | The user's email associated with their account. Must be valid email address.
`organizations` |  `Array` | | An array of organizations the user is a member of. (See the `organizations object` table below for more information).
`last_login` | `String` |  | Date and time of last user login. 
`is_active`| `Boolean |  | Whether or not the user is active.

Here is a table of the properties of the `organizations` object (which is contained in the `users` object):


Property | Type | Required? | Description
---|---|:---:|---
`id` | `String` |  | The ID of the organization.
`name` | `String` | x | The name of the organization.

####Example User JSON Object

```json
[
    {
        "username": "janesmith",
        "full_name": "Jane Smith",
        "email": "j.smith@example.com",
        "last_login": "2016-10-20T19:20:27.848272Z",
        "is_active": true,
        "organizations": [{
            "id": "90ush89adh89shd89sah89sah",
            "name": "Cadasta"
        }, {
            "id": "kxzncjkxhziuhsaiojdioasjd",
            "name": "Foo Coorp."
        }]
    }
]
```

***





### List Platform Users

```endpoint
GET /api/v1/users/
```
The above method and endpoint return all of the users in the platform. 

**Response**

The response contains a [list of user objects](#manage-platform-users), including the organizations the user is a member of.

#### Example response

```json
[
    {
        "username": "janesmith",
        "full_name": "Jane Smith",
        "email": "j.smith@example.com",
        "last_login": "2016-10-20T19:20:27.848272Z",
        "is_active": true,
        "organizations": [{
            "id": "90ush89adh89shd89sah89sah",
            "name": "Cadasta"
        }, {
            "id": "kxzncjkxhziuhsaiojdioasjd",
            "name": "Foo Coorp."
        }]
    }
]
``` 

***







### Get a Platform User

```endpoint
GET /api/v1/users/{username}/
```
Use the above method to view a single user in the platform. For example, to see the information for username `janesmith`, you'd write:

```
https://platform-staging-api.cadasta.org/api/v1/users/janesmith/
``` 

**Response**

The response contains a [user object](#user-content-example-user-object), including the organizations the user is a member of.


#### Example response

```json
{
    "username": "janesmith",
    "full_name": "Jane Smith",
    "email": "j.smith@example.com",
    "last_login": "2016-10-20T19:20:27.848272Z",
    "is_active": true,
    "organizations": [{
        "id": "90ush89adh89shd89sah89sah",
        "name": "Cadasta"
    }, {
        "id": "kxzncjkxhziuhsaiojdioasjd",
        "name": "Foo Coorp."
    }]
}
```

***




### Update a Platform User

```endpoint
PATCH /api/v1/users/{username}/
```

Use the above method and endpoint to update some of the fields associated with a specific username.

**Request Payload**

All fields are optional, if a field is not present in the request payload, that field will not be updated. 

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`full_name` |  CharField | | The user's full name.
`email` |  EmailField  | | The user's email associated with their account.
`is_active`| BooleanField |  | Whether or not the user is active.

**Response**
The response contains a [user object](#user-content-example-user-object) that includes the organizations the user is a member of.

#### Example response

```json
{
    "username": "janesmith",
    "full_name": "Jane Smith",
    "email": "j.smith@example.com",
    "last_login": "2016-10-20T19:20:27.848272Z",
    "is_active": true,
    "organizations": [{
        "id": "90ush89adh89shd89sah89sah",
        "name": "Cadasta"
    }, {
        "id": "kxzncjkxhziuhsaiojdioasjd",
        "name": "Foo Coorp."
    }]
}
```
***

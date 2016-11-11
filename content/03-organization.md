## Organizations

Organizations in the Cadasta Platform represent organizations in real life. The Cadasta API allows you to work with data associated with organizations that have been added to the platform, and to add organizations as well. The endpoints for these objects start with `api/v1/organizations`.

_To learn more about organizations, <a href="https://docs.cadasta.org/en/02-organizations.html" target="_blank">see our documentation on Organizations</a>._

### Organization JSON object

An organization JSON object contains the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `id` | `String` | The ID of the organization |
| `slug` | `String` | The short label of the organization; usually used in URLs. |
| `name` | `String` | The name of the organization. |
| `description` | `String` | A long-form description of the organization. |
| `archived` | `Boolean` | Indicates whether the organization has been archived. |
| `urls` | `Array` | A list of URLs to websites of this organization. |
| `contacts` | `Array` | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\). |

##### Example Organization JSON Object

```json
{
  "id": "wS3Mp76Spqu9A0Crg9bMxB2o",
  "slug": "david-org",
  "name": "David Org",
  "description": "David Org (testing)",
  "archived": false,
  "urls": [],
  "contacts": [
    {
      "tel": null,
      "name": "David",
      "email": "david@example.com"
    },
    {
      "tel": null,
      "name": "Frank",
      "email": "frank@example.com"
    }
  ]
}
```







### List Organizations

```endpoint
GET /api/v1/organizations/
```

This method returns all of the publicly available organizations in the platform.

**Response**

The response body is an array containing an [organization JSON object](#organization-json-object).

#### Example response

```json
[
  {
    "id": "C9nWLc9znHQ5V0aaX1tmZQoN",
    "slug": "cadasta",
    "name": "Cadasta",
    "description": "",
    "archived": true,
    "urls": [],
    "contacts": []
  },
  {
    "id": "wS3Mp76Spqu9A0Crg9bMxB2o",
    "slug": "david-org",
    "name": "David Org",
    "description": "David Org (testing)",
    "archived": false,
    "urls": [],
    "contacts": [
      {
        "tel": null,
        "name": "David",
        "email": "david@example.com"
      },
      {
        "tel": null,
        "name": "Frank",
        "email": "frank@example.com"
      }
    ]
  }
]
```









### Create an Organization

```endpoint
POST /api/v1/organizations/
```

Use this endpoint to create a new organization. The user who creates this organization automatically becomes its first user, and thereby the administrator.

**Request payload**

The request payload is a JSON object containing the following properties.

| Property | Type | Required? | Description |
| --- | --- | --- | --- |
| `name` | `String` | x | The name of the organization. |
| `description` | `String` |  | A long-form description of the organization. |
| `archived` | `Boolean` |  | Indicates whether the organization has been archived. |
| `urls` | `Array` |  | A list of URLs to websites of this organization. |
| `contacts` | `Array` |  | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\); either `email` or `tel` must be provided. |

Here's how you need to format your URLs:

```
"urls": [
  "http://www.example.org",
  "http://bethsorganization.org"
]
```

Here's how you need to format your contacts:

```
"contacts": [
  {
    "name": "Orion",
    "email": "orion@example.org",
    "tel": ""
  }, 
  {
    "name": "Archimedes",
    "email": "archimedes@example.org",
    "tel": "555-555-5555"
  }
]
```

**Response**

The response body contains an [organization JSON object](#organization-json-object).

The response also contains the field `users`, which provides a list of members of this organization. In this case, there will only be one user shown: the user who created the organization.

#### Example response

```json
{
  "id": "wS3Mp76Spqu9A0Crg9bMxB2o",
  "slug": "david-org",
  "name": "David Org",
  "description": "David Org (testing)",
  "archived": false,
  "urls": [],
  "contacts": [
    {
      "tel": null,
      "name": "David",
      "email": "david@example.org"
    },
    {
      "tel": null,
      "name": "Frank",
      "email": "Frank@example.org"
    }
  ],
  "users": [
    {
       "username": "david-palomino",
       "full_name": "David Palomino",
       "email": "dave@example.org",
       "email_verified": true,
       "last_login": "2016-10-21T23:18:45.135341Z"
    }
  ]
}
```





### Get a Specific Organization

```endpoint
GET /api/v1/organizations/{organization_slug}/
```

This method gets at a specific organization. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organizations](#list-organizations).

**Response**

The response body contains an [organization JSON object](#organization-json-object).

The response also contains the field `users`, which provides a list of members of this organization.

#### Example Response

```json
{
  "id": "wS3Mp76Spqu9A0Crg9bMxB2o",
  "slug": "david-org",
  "name": "David Org",
  "description": "David Org (testing)",
  "archived": false,
  "urls": [],
  "contacts": [
    {
      "tel": null,
      "name": "David",
      "email": "david@example.org"
    },
    {
      "tel": null,
      "name": "Frank",
      "email": "frank@example.org"
    }
  ],
  "users": [
    {
      "username": "Kate",
      "full_name": "Kate",
      "email": "Kate@example.org",
      "email_verified": false,
      "last_login": "2016-07-15T00:01:29.446812Z"
    }
  ]
}
```

---

### Update an Organization

```endpoint
PATCH /api/v1/organizations/{organization_slug}/
```

This method allows you to update an organization. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organizations](#list-organizations).

**Request payload**

The request payload is a JSON object containing the following properties. All properties are optional — if a property is not presented the request payload, the property will not be updated.

| Property | Type | Required? | Description 
| --- | --- | --- | --- 
| `name` | `String` |  | The name of the organization. 
| `description` | `String` |  | A long-form description of the organization. 
| `archived` | `Boolean` |  | Indicates whether the organization has been archived. 
| `urls` | `Array` |  | A list of URLs to websites of this organization. 
| `contacts` | `Array` |  | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\); either `email` or `tel` must be provided. 

**Response**

The response body contains an [organization JSON object](#organization-json-object).

The response also contains the field `users`, which provides a list of members of this organization.

#### Example Response

```json
{
  "id": "wS3Mp76Spqu9A0Crg9bMxB2o",
  "slug": "david-org",
  "name": "David Org",
  "description": "David Org (testing)",
  "archived": false,
  "urls": [],
  "contacts": [
    {
      "tel": null,
      "name": "David",
      "email": "david@example.org"
    },
    {
      "tel": null,
      "name": "Frank",
      "email": "frank@example.org"
    }
  ],
  "users": [
    {
      "username": "Kate",
      "full_name": "Kate",
      "email": "kate@example.org",
      "email_verified": false,
      "last_login": "2016-07-15T00:01:29.446812Z"
    }
    {
      "username": "Beth",
      "full_name": "Beth",
      "email": "beth@example.org",
      "email_verified": false,
      "last_login": "2016-04-17T00:01:29.446812Z"
    }
  ]
}
```




## Organization Members

Users associated with an organization are known as **members**. The endpoint you need to access the members of an organization is: `/api/v1/organizations/{organization_slug}/users/`.

### Organization Member JSON object

A member JSON object has the following properties. These properties are similar to the [`account` JSON object](#account-object), but they include whether the user is an admin of the organization in question.

Property | Type | Description
---|---|---
`username` | `String` | The user's username.
`full_name` | `String` | The user's full name.
`email` | `String` | The user's email associated with their Cadasta account.
`email_verified` | `Boolean` | Whether or not the email has been verified.
`last_login` | `String` | The last date of the user's login.
`admin` | `Boolean` | Indicates whether or not the user is an admin of the organization of which they are a member.

#### Example Member JSON Object

```json
{ 
    "username": "Joyce", 
    "full_name": "Joyce Jones", 
    "email": "joyce@example.org", 
    "email_verified": true, 
    "last_login": "2016-10-21T23:18:45.135341Z", 
    "admin": true 
}
```


***


### List Organization Members

```endpoint
GET /api/v1/organizations/{organization_slug}/users/
```

Use this method to return all of the members of an organization.

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organizations](#list-organizations).

**Response**

The response body is an array containing an [organization JSON object](#organization-member-json-object).

#### Example Response

```json
[
{
  "id": "wS3Mp76Spqu9A0Crg9bMxB2o",
  "slug": "david-org",
  "name": "David Org",
  "description": "David Org (testing)",
  "archived": false,
  "urls": [],
  "contacts": [
     {
         "tel": null,
         "name": "David",
         "email": "david@example.org"
     },
     {
         "tel": null,
         "name": "Frank",
         "email": "frank@example.org"
     }
     ],
 "users": [
     {
         "username": "Kate",
         "full_name": "Kate",
         "email": "kate@example.org",
         "email_verified": false,
         "last_login": "2016-07-15T00:01:29.446812Z"
     }
     {
         "username": "Beth",
         "full_name": "Beth",
         "email": "beth@example.org",
         "email_verified": true,
         "last_login": "2016-04-17T00:01:29.446812Z"
     }
   ]
}]
```





### Add an Organization Member

```endpoint
POST /api/v1/organizations/{organization_slug}/users/
```

This method adds a member to the organization. Note that the person needs to have an account for this to work. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organizations](#list-organizations).

**Request Payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | `String` | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`admin` | `Boolean` |  | Indicates whether the user will have admin. Defaults to `false`.

**Response**

The response is an [organization member JSON object](#organization-member-json-object). 

#### Example Response

```json
{
    "username": "jane",
    "full_name": "Jane Doe",
    "email": "jane@example.org",
    "email_verified": false,
    "last_login": "2016-10-27T20:37:19.453868Z",
    "admin": false
}
```




### Get an Organization Member


```endpoint
GET /api/v1/organizations/{organization_slug}/users/{username}/
```
This method gets the information of a specific member of an organization. This can be helpful if you need to see whether that person is an administrator of the organization or not. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organizations](#list-organizations).
`username` | The username for a specific user, which can be found by [listing organization members](#list-organization-members).

**Response**

The response includes the properties of an [organization member JSON object](#organization-member-json-object). 


#### Example Response

```json
{
    "username": "jane",
    "full_name": "Jane Doe",
    "email": "jane@example.org",
    "email_verified": false,
    "last_login": "2016-10-27T20:37:19.453868Z",
    "admin": false
}
```




### Update an Organization Member's Admin Status

```endpoint
PATCH /api/v1/organizations/{organization_slug}/users/{username}/
```

This method updates the admin status of a specific member of an organization. If you need to change the user's account information, see how to [update a user account](#update-a-user-account). 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organizations](#list-organizations).
`username` | The username for a specific user, which can be found by [listing organization members](#list-organization-members).

**Request Payload**

You must provide the username and the admin status. 

Property | Type | Required? | Description
---|---|:---:|---
`admin` | `Boolean` | x | Indicates whether or not the user is an admin of the organization of which they are a member.

**Response**

The response is an [organization member JSON object](#organization-member-json-object). 

#### Example Response

```json
{
    "username": "jane",
    "full_name": "Jane Doe",
    "email": "jane@example.org",
    "email_verified": false,
    "last_login": "2016-10-27T20:37:19.453868Z",
    "admin": true
}
```



### Remove an Organization Member

```endpoint
DELETE /api/v1/organizations/{organization_slug}/users/{username}/
```

This method updates the information of a specific member of an organization.

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organizations](#list-organizations).
`username` | The username for a specific user, which can be found by [listing organization members](#list-organization-members).


**Response**

If the user was successfully deleted, an empty response with status code `204` will be returned. 

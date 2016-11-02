## Organizations

Organizations in the Cadasta Platform represent organizations in real life. The Cadasta API allows you to work with data associated with organizations that have been added to the platform, and to add organizations as well. The endpoint for these objects starts with:

```
GET api/v1/organizations
```

_To learn more about organizations, [see our documentation on Organizations](https://docs.cadasta.org/en/02-organizations.html)._

An organization JSON object contains the following properties:

| Property | Type | Required? | Description |
| --- | --- | :---: | --- |
| `id` | `String` | x | The ID of the organization |
| `slug` | `String` | x | The short label of the organization; usually used in URLs. |
| `name` | `String` | x | The name of the organization. |
| `description` | `String` |  | \(optional\) A long-form description of the organization. |
| `archived` | `Boolean` | x | Indicates whether the organization has been archived. |
| `urls` | `Array` | | A list of URLs to websites of this organization. |
| `contacts` | `Array` |  | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\). |

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

---


### List Organizations

```endpoint
GET /api/v1/organizations/
```

The above method returns all of the publicly available organizations in the platform.

**Response**

The response body is an array containing an [organization JSON object](#user-content-example-organization-json-object).

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

---



### Create an Organization

```endpoint
POST /api/v1/organizations/
```

Use the above endpoint to create a new organization. The user who creates this organization automatically becomes its first user, and thereby the administrator.

**Request payload**

The request payload is a JSON object containing the following properties.

| Property | Type | Required? | Description |
| --- | --- | --- | --- |
| `name` | `String` | x | The name of the organization. |
| `description` | `String` |  | A long-form description of the organization. |
| `archived` | `Boolean` |  | Indicates whether the organization has been archived. |
| `urls` | `Array` |  | A list of URLs to websites of this organization. |
| `contacts` | `Array` |  | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\); either `email` or `tel` must be provided. |

Formatting your URLs and contacts can be tricky. The using the API UI, you'll want to use the Raw HTML window. 

Here's how you need to format your URLs:

```
"urls": [
  "http://www.example.org",
  "http://bethsorganization.org"
],
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

Note that this formatting can be on a single line; they're shown on multiple lines above for easier reading.

**Response**

The response body contains an [organization JSON object](#user-content-example-organization-json-object).

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

---

### Get a Specific Organization

```endpoint
GET /api/v1/organizations/{organization_slug}/
```

The above method gets at a specific organization. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations)

**Response**

The response body contains an [organization JSON object](#user-content-example-organization-json-object).

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

The above method allows you to update an organization. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations)

**Request payload**

The request payload is a JSON object containing the following properties. All properties are optional - if a property is not presented the request payload, the property will not be updated.

| Property | Type | Required? | Description 
| --- | --- | --- | --- 
| `name` | `String` |  | The name of the organization. 
| `description` | `String` |  | \(optional\) A long-form description of the organization. 
| `archived` | `Boolean` |  | Indicates whether the organization has been archived. 
| `urls` | `Array` |  | A list of URLs to websites of this organization. 
| `contacts` | `Array` |  | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\); either `email` or `tel` must be provided. 

**Response**

The response body contains an [organization JSON object](#user-content-example-organization-json-object).

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

---

## Members

Users associated with an organization are known as **members**. The endpoint you need to access the members of an organization is:

```
api/v1/organizations/{organization_slug}/users/
```
Endpoints in this category require using an organization's slug. [Click here to learn about finding and formatting slugs](01-introduction.md#slugs). 

A member JSON object has the following properties. These properties are similar to the [`account` JSON object](02-users.md#user-content-example-account-json-object), but they include whether that user is an admin of the organization in question.

Property | Type | Required? | Description
---|---|:---:|---
`username` | `String` | x | The user's username.
`full_name` | `String` | | The user's full name.
`email` | `String` | x | The user's email associated with their Cadasta account.
`email_verified` | `Boolean` | | Whether or not the email has been verified.
`last_login` | `String` | | The last date of the user's login.
`admin` | `Boolean` | | Indicates whether or not the user is an admin of the organization of which they are a member.

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

Use the above method to return all of the members of an organization.

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations)

**Response**

The response body is an array containing an [organization JSON object](#user-content-example-organization-json-object).

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
---

### Add an Organization Member

```endpoint
POST /api/v1/organizations/{organization_slug}/users/
```

The above method adds a member to the organization. Note that the person needs to have an account for this to work. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations)

**Request Payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | `String` | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`admin` | `Boolean` |  | Indicates whether the user will have admin

**Response**

The response is an [organization member JSON object](user-content-example-member-json-object). 

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


---

### Get an Organization Member


```endpoint
GET /api/v1/organizations/{organization_slug}/users/{username}/
```
The above method gets the information of a specific member of an organization. This can be helpful if you need to see whether that person is an admininstrator of the organization or not. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations)
`username` | The username for a specific user, which can be found by [listing organization members](user-content-list-organization-members).

**Response**

The response includes the properties of an [organization member JSON object](user-content-example-member-json-object). 


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


---

### Update an Organization Member's Admin Status

```endpoint
PATCH /api/v1/organizations/{organization_slug}/users/{username}/
```

The above method updates the admin status of a specific member of an organization. If you need to change the user's account information, see how to [update a user account](02-users.md#user-content-update-a-user-account). 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations)
`username` | The username for a specific user, which can be found by [listing organization members](#user-content-list-organization-members).

**Request Payload**

You must provide the username and the admin status. 

Property | Type | Required? | Description
---|---|:---:|---
`username` | `String` | x | The user's username.
`admin` | `Boolean` | x | Indicates whether or not the user is an admin of the organization of which they are a member.

**Response**

The response is an [organization member JSON object](#user-content-example-member-json-object). 

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

---

### Remove an Organization Member

> Getting a platform error; add content when the error is resolved.

```endpoint
DELETE /api/v1/organizations/{organization_slug}/users/{username}/
```

The above method updates the information of a specific member of an organization.

Using the API UI, you can delete a member by clicking the Delete button at the top. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations)
`username` | The username for a specific user, which can be found by [listing organization members](#user-content-list-organization-members).


**Response**

Your response will be in the form of an `HTTP 204: No Content` message. 

If there's an error, then you'll get an error message or another [response code](01-introduction.md#user-content-common-response-codes). 

####Example Response

```json
HTTP 204 No Content
Allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept
```

---


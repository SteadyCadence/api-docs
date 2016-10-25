## Organization

The Cadasta API allows you to work with data associated with organizations that have been added to the platform. The endpoint for these objects start with:

```endpoint
api/v1/organizations
```

An organization JSON object contains the following properties.

> NOTE: per DRF docs, `users` is also a property. However, when I test it on the API I don't see it.

| Property | Type | Required? | Description |
| --- | --- | --- | --- |
| `id` | CharField |  | The ID of the organization |
| `slug` | SlugField |  | The short label of the organization; usually used in URLs. |
| `name` | CharField | x | The name of the organization. |
| `description` | CharField |  | \(optional\) A long-form description of the organization. |
| `archived` | BooleanField |  | Indicates whether the organization has been archived. |
| `urls` | ListField |  | A list of URLs to websites of this organization. |
| `contacts` | JSONField |  | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\). |

#### Example Organization JSON Object

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

### List organizations

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

**Response**

The response contains a JSON object with the following properties:

| Property | Description |
| --- | --- |
| `id` | The ID of the organization |
| `slug` | The short label of the organization; usually used in URLs. |
| `name` | The name of the organization. |
| `description` | \(optional\) A long-form description of the organization. |
| `archived` | `Boolean` indicating whether the organization has been archived. |
| `urls` | A list of URLs to websites of this organization. |
| `contacts` | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\). |

---

### Create an organization

> Note: need to add notes about properly formatting multiple URLs and contact information.

```endpoint
POST /api/v1/organizations/
```

Use the above endpoint to create a new organization. The user who creates this organization automatically becomes its first user, and thereby the administrator.

**Request payload**

The request payload is a JSON object containing the following properties.

| Property | Type | Required? | Description |
| --- | --- | --- | --- |
| `name` | CharField | x | The name of the organization. |
| `description` | CharField |  | A long-form description of the organization. |
| `archived` | BooleanField |  | Indicates whether the organization has been archived. |
| `urls` | ListField |  | A list of URLs to websites of this organization. |
| `contacts` | JSONField |  | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\); either `email` or `tel` must be provided. |

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

The above method gets at a specific organization. It requires using the organization's slug, which is usually generated from the organization's name. To find the slug you need, find the organization using the `GET /api/v1/organizations/` method and then get the value of the `slug` property.

For example, Example Organization might have the slug `example-organization`. The URL you'd need to access it would look like this:

```
https://platform-staging-api.cadasta.org/api/v1/organizations/example-organization/
```

**URL parameters**

| Property | Description |
| --- | --- |
| `organization_slug` | The short label of the organization, which usually contains no upper case letters or spaces. |

**Response**

The response body contains an [organization JSON object](#user-content-example-organization-json-object).

The response also contains the field `users`, which provides a list of members of this organization.

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

### Update an organization

```endpoint
PATCH /api/v1/organizations/{organization_slug}/
```

The above method allows you to update an organization. It requires using the organization's slug, which is usually generated from the organization's name. To find the slug you need, find the organizion using the `GET /api/v1/organizations/` method and then get the value of the `slug` property.

For example, Example Organization might have the slug `example-organization`. The URL you'd need to access it would look like this:

```
https://platform-staging-api.cadasta.org/api/v1/organizations/example-organization/
```

**URL parameters**

| Property | Description |
| --- | --- |
| `organization_slug` | The short label of the organization. |

**Request payload**

The request payload is a JSON object containing the following properties. All properties are optional - if a property is not presented the request payload, the property will not be updated.

| Property | Description |
| --- | --- |
| `name` | The name of the organization. |
| `description` | \(optional\) A long-form description of the organization. |
| `archived` | `Boolean` indicating whether the organization has been archived. |
| `urls` | A list of URLs to websites of this organization. |
| `contacts` | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` \(optional\) and `tel` \(optional\); either `email` or `tel` must be provided. |

**Response**

The response body contains an [organization JSON object](#user-content-example-organization-json-object).

The response also contains the field `users`, which provides a list of members of this organization.

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

```endpoint
api/v1/organizations/{organization_slug}/users/
```

The `organization_slug` is the the slug associated with the organization, and is usually generated from the organization's name. To find the slug you need, find the organizion using the `GET /api/v1/organizations/` method and then get the value of the `slug` property.

For example, Example Organization might have the slug `example-organization`. The URL you'd need to access it would look like this:

```
https://platform-staging-api.cadasta.org/api/v1/organizations/example-organization/
```

> add proper links to the object below

A member JSON object has the following properties. These properties are similar to the `account` JSON objects, but they include whether that user is an admin of the organization in question.

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username.
`full_name` | CharField | | The user's full name.
`email` | EmailField | x | The user's email associated with their Cadasta account.
`email_verified` | BooleanField | | Whether or not the email has been verified.
`last_login` | DateTimeField | | The last date of the user's login.
`admin` | BooleanField | | Indicates whether or not the user is an admin of the organization of which they are a member.

#### Example Member JSON Object

```json
{ 
    username: "Joyce", 
    full_name: "Joyce Jones", 
    email: "joyce@example.org", 
    email_verified: true, 
    last_login: "2016-10-21T23:18:45.135341Z", 
    admin: true 
}
```


***


### List organization members

```endpoint
GET /api/v1/organizations/{organization_slug}/users/
```

Use the above method to return all of the users in an organization.

**Request Payload**

No request payload is needed; only the `slug` value for the organization. 

**Response**

The response body is an array containing an [organization JSON object](#user-content-example-organization-json-object).

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
         "email_verified": true,
         "last_login": "2016-04-17T00:01:29.446812Z"
     }
   ]
}
```
---

### Add an organization member

> Getting a platform error; add content when the error is resolved.

```endpoint
POST /api/v1/organizations/{organization_slug}/users/
```

The above method adds a member to the organization. Note that the person needs to have an account for this to work. 

**Request Payload**

Property | Type | Required? | Description
---|---|:---:|---
`username` | CharField | x | The user's username (30 characters or fewer. Letters, digits and @/./+/-/_ only.)
`admin` | BooleanField |  | Indicates whether the user will have admin

**Response**

####Example Response






---

### Get an organization member

```endpoint
GET /api/v1/organizations/{organization_slug}/users/{username}/
```
The above method adds a member to the organization. Note that the person needs to have an account for this to work.



---

### Update an organization member

```endpoint
PATCH /api/v1/organizations/{organization_slug}/users/{username}/
```

---

### Remove an organization member

```endpoint
DELETE /api/v1/organizations/{organization_slug}/users/{username}/
```

---


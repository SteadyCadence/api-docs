## Organization

An organization JSON object contains the following properties.

Property | Description
---|---
`id` | The ID of the organization
`slug` | The short label of the organization; usually used in URLs.
`name` | The name of the organization.
`description`| (optional) A long-form description of the organization.
`archived` | `Boolean` indicating whether the organization has be archived.
`urls` | A list of URLs to websites of this organization.
`contacts` | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` (optional) and `tel` (optional).

#### Example organization JSON object

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

### List organizations

```endpoint
GET /api/v1/organizations/
```

**Response**

The response body is an array containing [organization JSON objects](#organization-1).


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

### Create an organization

```endpoint
POST /api/v1/organizations/
```

**Request payload**

The request payload is a JSON object containing the following properties.

Property | Description
---|---
`name` | The name of the organization.
`description`| (optional) A long-form description of the organization.
`archived` | `Boolean` indicating whether the organization has be archived.
`urls` | A list of URLs to websites of this organization.
`contacts` | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` (optional) and `tel` (optional); either `email` or `tel` must be provided.

**Response**

The response body contains an [organization JSON object](#organization-1).

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
      "email": "dpalomino@cadasta.org"
    },
    {
      "tel": null,
      "name": "Frank",
      "email": "fpichel@cadasta.org"
    }
  ],
  "users": []
}
```

### Get an organization

```endpoint
GET /api/v1/organizations/{organization_slug}/
```

**URL parameters**

Property | Description
---|---
`organization_slug` | The short label of the organization.

**Response**

The response body contains an [organization JSON object](#organization-1).

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
      "email": "dpalomino@cadasta.org"
    },
    {
      "tel": null,
      "name": "Frank",
      "email": "fpichel@cadasta.org"
    }
  ],
  "users": [
    {
      "username": "Kate",
      "full_name": "Kate",
      "email": "Kate@example.com",
      "email_verified": false,
      "last_login": "2016-07-15T00:01:29.446812Z"
    }
  ]
}
```


### Update an organization

```endpoint
PATCH /api/v1/organizations/{organization_slug}/
```

**URL parameters**

Property | Description
---|---
`organization_slug` | The short label of the organization.

**Request payload**

The request payload is a JSON object containing the following properties. All properties are optional, if a property is not present it the request payload, the property will not be updated.

Property | Description
---|---
`name` | The name of the organization.
`description`| (optional) A long-form description of the organization.
`archived` | `Boolean` indicating whether the organization has be archived.
`urls` | A list of URLs to websites of this organization.
`contacts` | A list of contacts for this organization. A contact is a JSON object containing `name`, `email` (optional) and `tel` (optional); either `email` or `tel` must be provided.

**Response**

The response body contains an [organization JSON object](#organization-1).

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
      "email": "dpalomino@cadasta.org"
    },
    {
      "tel": null,
      "name": "Frank",
      "email": "fpichel@cadasta.org"
    }
  ],
  "users": [
    {
      "username": "Kate",
      "full_name": "Kate",
      "email": "Kate@example.com",
      "email_verified": false,
      "last_login": "2016-07-15T00:01:29.446812Z"
    }
  ]
}
```

## Members

### List organization members

```endpoint
GET /api/v1/organizations/{organization_slug}/users/
```

### Add an organization member

```endpoint
POST /api/v1/organizations/{organization_slug}/users/
```

### Get an organization member

```endpoint
GET /api/v1/organizations/{organization_slug}/users/{username}/
```

### Update an organization member

```endpoint
PATCH /api/v1/organizations/{organization_slug}/users/{username}/
```

### Remove an organization member

```endpoint
DELETE /api/v1/organizations/{organization_slug}/users/{username}/
```

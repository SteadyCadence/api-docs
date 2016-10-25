## Project

The Cadasta API allows you work with data for projects that have been added to the platform. The two main endpoints you'll need to work with project data begin with:

```endpoint
/api/v1/projects/
```

and 

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/
```

A project JSON object contains the following properties.

Property | Description
---|---
`id` | The ID of the project
`slug` | The short label of the project; usually used in URLs.
`name` | The name of the project.
`description`| (optional) A long-form description of the project.
`archived` | `Boolean` indicating whether the project has be archived.
`urls` | A list of URLs to websites of this project.
`contacts` | A list of contacts for this project. A contact is a JSON object containing `name`, `email` (optional) and `tel` (optional).
`country` | The country where the project is located; represented as a two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
`access` | Indicates whether access to the project is restricted; is either `"public"` or `"private"`.
`organization` | [JSON object of the project's organization](03-organization.md#user-content-example-organization-json-object).

##### Example Project JSON Object

```json
{
  "id": "z82wdtrf8m9sh56bdph6qeig",
  "organization": {
    "id": "3r48bi5xy8xzfu5d94smpb7a",
    "slug": "example-organization",
    "name": "Example Organization",
    "description": "Example Organization is a non-profit, non-governmental organization working to empower poor and marginalized individuals and communities.",
    "archived": false,
    "urls": [
      "http://www.example.org/"
    ],
    "contacts": [
      {
        "tel": null,
        "name": "Andrew Brown",
        "email": "andrew@example.org"
      },
      {
        "tel": null,
        "name": "Megan Jones",
        "email": "megan@example.org"
      }
  ],
  "country": "NG",
  "name": "Lagos Tenure Assessment (old)",
  "description": "Security of Tenure Profiling in Lagos",
  "archived": false,
  "urls": [],
  "contacts": [],
  "access": "public",
  "slug": "lagos-tenure-assessment"
}
```

### Slugs

To get at, create, or modify projects and project members, you'll need to access a couple different kinds of slugs: 

* `organization_slug`, and 
* `project_slug`

You can find the `organization_slug` by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations) and then copying the value of the `slug` property. 

You can find the `project_slug` in a similar fashion: viewing all of the projects. If it's a public organization, you can find it
When you get the slug, add it to your endpoint so it reads something like this: 

```
https://https://platform-staging-api.cadasta.org/api/v1/organizations/example-organization/projects/
```

### List All Projects 

```endpoint
GET /api/v1/projects/
```

Use the above method to list all the publicly viewable projects in the Cadasta system. You can also see any private projects that you have access to.

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**

The response body is an array containing a [project JSON object](#user-content-example-project-json-object).

####Example Response

```json
[
    {
        "id": "pw6esdz94iztk4k23hskj73q",
        "organization": {
            "id": "rm4ahxqizjxqbzt3h8itmb3f",
            "slug": "brian-org",
            "name": "Brian Org",
            "description": "",
            "archived": false,
            "urls": [],
            "contacts": []
        },
        "country": "BD",
        "name": "Download Test",
        "description": "",
        "archived": false,
        "urls": [
            ""
        ],
        "contacts": [],
        "access": "public",
        "slug": "download-test"
    },
    {
        "id": "jugibdxzaz5i2v3uni5bt6d9",
        "organization": {
            "id": "rm4ahxqizjxqbzt3h8itmb3f",
            "slug": "brian-org",
            "name": "Brian Org",
            "description": "",
            "archived": false,
            "urls": [],
            "contacts": []
        },
        "country": "BD",
        "name": "Import Test",
        "description": "",
        "archived": false,
        "urls": [
            ""
        ],
        "contacts": [],
        "access": "public",
        "slug": "import-test-1"
    }
]


```

### List All Projects in an Organization

> Getting an error; fill in content when error is resolved

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/
```

To see all of the projects in an organization, you can use the above method. 

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**

The response body is an array containing a [project JSON object](#user-content-example-project-json-object).

####Example Response

> Getting an error, can't see

***




### Create a New Project

> Getting an error; fill in content when error is resolved


```endpoint
POST /api/v1/organizations/{organization_slug}/projects/
```

Use the above endpoint to create a new project. All projects must be connected to an organization. 

To use this method, ou'll need to get the `slug` of the organization, which you can find by [getting a specific organization by its name](03-organization.md#user-content-get-a-specific-organization) and then copying the value of the `slug` property. 

When you get the slug, add it to your endpoint so it reads something like this: 

```
https://https://platform-staging-api.cadasta.org/api/v1/organizations/example-organization/projects/
```



**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**

The response body is an array containing a [project JSON object](#user-content-example-project-json-object).

####Example Response

> Getting an error, can't see





### Get a project

> Getting an error; fill in content when error is resolved

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/
```

Use the above method

user-content-list-all-projects

### Update a project

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/
```

## Members

### List project members

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/
```

### Add a project member

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/
```

### Get a project member

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/{username}/
```

### Update a project member

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/{username}/
```

### Remove a project member

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/{username}/
```

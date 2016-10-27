## Project

The Cadasta API allows you work with data for projects that have been added to the platform. The two main endpoints you'll need to work with project data begin with:

```endpoint
GET /api/v1/projects/
```

and 

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/
```

A project JSON object contains the following properties.

Property | Type | Description
---|---|---
`id` | CharField | The ID of the project
`organization` | OrganizationSerializer | [JSON object of the project's organization](03-organization.md#user-content-example-organization-json-object).
`country` | CountryField | The country where the project is located; represented as a two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
`name` | CharField | The name of the project.
`description`| CharField | (optional) A long-form description of the project.
`archived` | BooleanField| `Boolean` indicating whether the project has be archived.
`urls` | ListField | A list of URLs to websites of this project.
`contacts` | JSONField | A list of contacts for this project. A contact is a JSON object containing `name`, `email` (optional) and `tel` (optional).
`users` | ListSerializer|  JSON Object of all the project's members // ADD LINK
`access` | ChoiceField | Indicates whether access to the project is restricted; is either `"public"` or `"private"`.
`slug` | SlugField | The short label of the project; usually used in URLs.


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

***









### Slugs

To get at, create, or modify projects and project members, you'll need to access a couple different kinds of slugs: 

* `organization_slug`, and 
* `project_slug`

You can find the `organization_slug` by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations) and then copying the value of the `slug` property. 

You can find most `project_slugs` by [viewing all of the projects in the Cadasta system](03-organization.md#user-content-list-all-projects), which returns publicly viewable projects as well as projects you have access to. If it's a private project, you must have access to it and find it by [listing all of the projects in an organization](#user-content-list-all-projects-in-an-organization). 

Once you get your slugs, add them to your endpoint outside of the curly braces. 

For example, to get at a specific project, you need to use the following endpoint:

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/
```

If the `organization_slug` is `sample-organization` and the `project_slug` is `sample-project`, then the endpoint should look like this:

```
GET /api/v1/organizations/`sample-organization`/projects/project_slug/
```

***










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

***







### List All Projects in an Organization

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/
```

To see all of the projects in an organization, use the above method. 

_Not sure how to format your slugs? [Look here!](#user-content-slugs)_

**Request Payload**

No payload required. Enter the URL for the organization in question to return all of the projects. 

**Response**

The response body is an array containing a [project JSON object](#user-content-example-project-json-object).

####Example Response

```json

[
    {
        "id": "hxk4k8aee5rh5htahhh5uenn",
        "organization": {
            "id": "gae6pjf9xygxddgyg5dq45iq",
            "slug": "example-organization",
            "name": "Example Organization",
            "description": "",
            "archived": false,
            "urls": [
                "http://example.com"
            ],
            "contacts": null
        },
        "country": "US",
        "name": "Portland Project",
        "description": "",
        "archived": false,
        "urls": [
            ""
        ],
        "contacts": [
            {
                "email": "kate@example.org",
                "tel": null,
                "name": "Kate"
            },
            {
                "email": "oliver@example.org",
                "tel": "444-555-6789",
                "name": "Oliver"
            },
            {
                "email": null,
                "tel": "555-555-5555",
                "name": "David"
            }
        ],
        "access": "public",
        "slug": "global-project"
    }
]

```

***








### Create a New Project


```endpoint
POST /api/v1/organizations/{organization_slug}/projects/
```
Use the above endpoint to create a new project. All projects must be connected to an organization. 

_Not sure how to format your slugs? [Look here!](#user-content-slugs)_


**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`country` | CountryField | x | The country where the project is located; represented as a two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/
`name` | CharField | x | The name of the project.
`description` | CharField |  | A long-form description of the project.
`archived` | BooleanField | x | Indicates whether the project has be archived.
`urls` | ListField | x | A list of URLs to websites of this project.
`contacts` | JSONField |  | A list of contacts for this project. A contact is a JSON object containing `name`, `email` (optional) and `tel` (optional).
`access` | ChoiceField | x | Indicates whether the project is a public or a private one. 

**Response**

The response body is an array containing a [project JSON object](#user-content-example-project-json-object).

####Example Response

```
{
    "id": "h8ridjt2jazkac4e97srzmh2",
    "organization": {
        "id": "gae6pjf9xygxddgyg5dq45iq",
        "slug": "example-organization",
        "name": "Example Organization",
        "description": "",
        "archived": false,
        "urls": [
            "http://example.com"
        ],
        "contacts": null
    },
    "country": "",
    "name": "Atlanta Project",
    "description": "Documenting marginalized land use in Atlanta, GA",
    "archived": false,
    "urls": [
        "http://www.atlanta-example.org"
    ],
    "contacts": null,
    "users": [],
    "access": "public",
    "slug": "atlanta-project"
}
```





### Get a Project

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/
```

Use this method to get at a specific project. 

_Not sure how to format your slugs? [Look here!](#user-content-slugs)_

**Request Payload**

No payload, only a properly formatted endpoint.

**Response**

The response body is an array containing a [project JSON object](#user-content-example-project-json-object).


#### Example Response

```json
{
    "id": "h8ridjt2jazkac4e97srzmh2",
    "organization": {
        "id": "gae6pjf9xygxddgyg5dq45iq",
        "slug": "example-organization",
        "name": "Example Organization",
        "description": "",
        "archived": false,
        "urls": [
            "http://example.com"
        ],
        "contacts": null
    },
    "country": "",
    "name": "Atlanta Project",
    "description": "Documenting marginalized land use in Atlanta, GA",
    "archived": false,
    "urls": [
        "http://www.atlanta-example.org"
    ],
    "contacts": null,
    "users": [],
    "access": "public",
    "slug": "atlanta-project"
}
```



### Update Basic Project Information

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/
```

Use the above method to update a project in an organization. The fields of the project that you can edit are shown in the request payload below. 

If you need to update project members, see the section on members. 

> Add link

**Request Payload**

> Which of these fields are required??

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`country` | CountryField | | The country where the project is located; represented as a two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
`name` | CharField | | The name of the project.
`description`| CharField | | (optional) A long-form description of the project.
`archived` | BooleanField| | `Boolean` indicating whether the project has be archived.
`urls` | ListField | | A list of URLs to websites of this project.
`contacts` | JSONField | | A list of contacts for this project. A contact is a JSON object containing `name`, `email` (optional) and `tel` (optional).
`access` | ChoiceField | | Indicates whether access to the project is restricted; is either `"public"` or `"private"`.

**Response**

The response body is an array containing a [project JSON object](#user-content-example-project-json-object).

#### Example Response

```json
{
    "id": "h8ridjt2jazkac4e97srzmh2",
    "organization": {
        "id": "gae6pjf9xygxddgyg5dq45iq",
        "slug": "example-organization",
        "name": "Example Organization",
        "description": "",
        "archived": false,
        "urls": [
            "http://example.com"
        ],
        "contacts": null
    },
    "country": "",
    "name": "Atlanta Project",
    "description": "",
    "archived": false,
    "urls": [
        "http://www.atlanta-example.org"
    ],
    "contacts": null,
    "users": [],
    "access": "public",
    "slug": "atlanta-project"
}
```


x             x
 x           x
  x         x
   x       x
    x     x
     x   x
      x x
       x

## Members

### List project members

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/
```

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**


####Example Response







### Add a project member

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/
```

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**


####Example Response









### Get a project member

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/{username}/
```

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**


####Example Response









### Update a project member

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/{username}/
```

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**


####Example Response








### Remove a project member

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/users/{username}/
```

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**


####Example Response











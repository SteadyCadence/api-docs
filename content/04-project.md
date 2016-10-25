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

##### Example project JSON object

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
  },
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


### List all projects

```endpoint
GET /api/v1/projects/
```

Use the above method to list all the publicly viewable projects in the Cadasta system. You can also see 


### List organization projects

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/
```

### Create a project

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/
```

### Get a project

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/
```

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

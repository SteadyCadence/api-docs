## Project

An project JSON object contains the following properties.

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
`organization` | [JSON object of the project's organization](#organization-1).

##### Example project JSON object

```json
{
  "id": "z82wdtrf8m9sh56bdph6qeig",
  "organization": {
    "id": "3r48bi5xy8xzfu5d94smpb7a",
    "slug": "jei",
    "name": "JEI",
    "description": "JEI is a non-profit, non-governmental organization based in Lagos and Port Harcourt, Nigeria. We empower poor and marginalized individuals and communities to lead the changes that they would like to see in their own communities -- whether greater access to justice for the poor, pro-poor urban governance and policy, or community-led in-situ upgrading and development.",
    "archived": false,
    "urls": [
      "http://www.justempower.org/"
    ],
    "contacts": [
      {
        "tel": null,
        "name": "Andrew Maki",
        "email": "andrew@example.org"
      },
      {
        "tel": null,
        "name": "Megan Chapman",
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

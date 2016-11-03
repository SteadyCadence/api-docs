## Project Resources

> Questions for Oliver
* What's the difference between a resource and a spatial resource? I don't think I know what that is...like another map or something? GPX?

For any given project, there are lots of resources that may be collected: letters, deeds, photographs, audio recordings, etc. Using the Cadasta API, you can list all the resources connected to a specific project, as well as create, view, and update individual ones.

_<a href="https://docs.cadasta.org/en/04-records.html#project-resources" target="_blank">Read more about Project Resources in our Platform Documentation</a>_

To access project resources using the API, use the following endpoint:

```
/api/v1/organizations/{organization_slug}/projects/{project_slug}/resources/
```

These methods require using both an organization and a project slug. [Click here to learn about finding and formatting slugs](01-introduction.md#user-content-formatting-urls-for-accessing-specific-objects).

**Project Resource Object Properties**

Each project resource appears as a JSON object with the following properties:

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`id` | `String` | x | A unique ID autmatically genereated for the file.
`name` | `String` | x | The name of the file (e.g. Deed of Trust)
`description` | `String` |  | A description of the file (e.g. The only deed we can find that has information relevant to the site.)
`file` | `String` | x | URL to a hosted version of the file, likely on an Amazon server or something similar.
`original_file` | `String` | x | Original file name (e.g. deed-of-trust.pdf).
`archived` | `Boolean` | x | Indicates whether the file has been archived or not.


####Example Project Resource JSON Object

```
{
	"id": "8u5dgnvgzix6kmg9hvbfdy3c",
	"name": "Deed",
	"description": "",
	"file": "https://s3-us-west-2.amazonaws.com/cadasta-platformstaging-bucket/resources/wcajeysz7ngrae3bd84af99q.pdf",
	"original_file": "Deed-of-Trust-1912.pdf",
	"archived": false
}
```

***













### List Project Resources

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/resources/
```

Use the above method and endpoint to list out all the resources associated with any given project. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).


**Response**

The response body is an array containing a series of [project resource JSON objects](#user-content-example-project-resource-json-object).

####Example Response

```JSON
[
    {
        "id": "8u5dgnvgzix6kmg9hvbfdy3c",
        "name": "Deed",
        "description": "",
        "file": "https://s3-us-west-2.amazonaws.com/cadasta-platformstaging-bucket/resources/wcajeysz7ngrae3bd84af99q.pdf",
        "original_file": "Deed-of-Trust-1912.pdf",
        "archived": false
    },
    {
        "id": "xnbqgubg99x6w54q363tjx5d",
        "name": "Ross Island - 1963",
        "description": "",
        "file": "https://s3-us-west-2.amazonaws.com/cadasta-platformstaging-bucket/resources/tab6kkdfx9c5pifzsmmh4iep.jpg",
        "original_file": "a2004-001-1012-marquam-bridge-under-construction-1963.jpg",
        "archived": false
    },
    {
        "id": "p5d2wb5xnj4bn93vve8ntzwc",
        "name": "Ross Island Aerial - 1945",
        "description": "",
        "file": "https://s3-us-west-2.amazonaws.com/cadasta-platformstaging-bucket/resources/acguba29wstyexf8uhxkvezn.jpg",
        "original_file": "a2005-001-815-ross-island-bridge-west-approach-north-at-sw-kelly-1945.jpg",
        "archived": false
    }
]

```

***









### Create a New Project Resource

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/resources/
```

Use the above endpoint and method to create a new project resource. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).

**Request Payload**

To create a new resource, you'll need to provide the following properties:

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`name` | `String` | x | The name of the file (e.g. Deed of Trust)
`description` | `String` |  | A description of the file (e.g. The only deed we can find that has information relevant to the site.)
`file` | `String` | x | URL to a hosted version of the file, likely on an Amazon server or something similar.
`original_file` | `String` | x | Original file name (e.g. deed-of-trust.pdf).
`archived` | `Boolean` | x | Indicates whether the file has been archived or not.


**Response**

The response body contains a [project resource JSON object](#user-content-example-project-resource-json-object).

####Example Response

```json
{
    "id": "rtxixdb2a5weefmzmg7kzvgr",
    "name": "Original Questionnaire",
    "description": "This is the original questionnaire we were using; we updated it on 10.31.2016.",
    "file": "https://s3-us-west-2.amazonaws.com/cadasta-resources/sample-forms/minimum_cadasta_questionnaire.xlsx",
    "original_file": "mimimum_cadasta_questionnaire.xlsx",
    "archived": false
}

```

***












### Get a Project Resource

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/resources/{resource_id}/
```

Use the above method and endpoint to get a specific project resource. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`resource_id` | The unique ID for the project resource. You can find this resource by listing all of the resources for the project, finding the project you're looking for, and then copying the ID. 

The ID should be at the top of the project resource JSON object, and will look something like this:

```
"id": "rtxixdb2a5weefmzmg7kzvgr",
```

So the endpoint you need should look something like this:

```
/api/v1/organizations/example-organization/projects/global-project/resources/rtxixdb2a5weefmzmg7kzvgr/
```

This method also requires using both an organization and a project slug. [Click here to learn about finding and formatting slugs](01-introduction.md#user-content-formatting-urls-for-accessing-specific-objects).


**Response**

The response body contains a [project resource JSON object](#user-content-example-project-resource-json-object).

####Example Response

```json
{
    "id": "rtxixdb2a5weefmzmg7kzvgr",
    "name": "Original Questionnaire",
    "description": "This is the original questionnaire we were using; we updated it on 10.31.2016.",
    "file": "https://s3-us-west-2.amazonaws.com/cadasta-resources/sample-forms/minimum_cadasta_questionnaire.xlsx",
    "original_file": "mimimum_cadasta_questionnaire.xlsx",
    "archived": false
}

```

***











### Update a Project Resource

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/resources/{resource_id}/
```

Use the above method and endpoint to update the name, description, file, orignal fila name, and archive status of any resource.

To do this, you'll need to get the project resource ID. You can find this resource by listing all of the resources for the project, finding the project you're looking for, and then copying the ID. 

The ID should be at the top of the project resource JSON object, and will look something like this:

```
"id": "rtxixdb2a5weefmzmg7kzvgr",
```

So the endpoint you need should look something like this:

```
/api/v1/organizations/example-organization/projects/global-project/resources/rtxixdb2a5weefmzmg7kzvgr/
```

**Request Payload**

Modify any value of the following fields of the project resource JSON object:

Property | Type | Description 
--- | --- | --- 
`name` | `String` | The name of the file (e.g. Deed of Trust)
`description` | `String` | A description of the file (e.g. The only deed we can find that has information relevant to the site.)
`file` | `String` | URL to a hosted version of the file, likely on an Amazon server or something similar.
`original_file` |`String` | Original file name (e.g. deed-of-trust.pdf).
`archived` | `Boolean` | Indicates whether the file has been archived or not.


**Response**

The response body contains a [project resource JSON object](#user-content-example-project-resource-json-object).

####Example Response

```json
{
    "id": "rtxixdb2a5weefmzmg7kzvgr",
    "name": "Original Questionnaire",
    "description": "This is the original questionnaire we were using; we updated it on 10.31.2016.",
    "file": "https://s3-us-west-2.amazonaws.com/cadasta-resources/sample-forms/minimum_cadasta_questionnaire.xlsx",
    "original_file": "mimimum_cadasta_questionnaire.xlsx",
    "archived": false
}

```


***









x       x
 x     x
  x   x
   x x
    x

## Spatial resources

> Oliver, not sure what these are, and when I try to use the endpoint below, it returns an empty array. Will fill in when I have more information.


***






### List All Spatial Resources

> Fill in when I have more info

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatialresources/
```

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | `String` | x | words

**Response**



####Example Response



***
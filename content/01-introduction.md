## Cadasta API documentation

Welcome to the Cadasta Platform API documentation. 

Using this platform API, you can: 

* Manage user [accounts](02-users.md) - creating them, deleting them, and amending them as needed; 
* Create and edit [organizations](03-organization.md); 
* View, create, and modify [projects](04-project.md) in the system, 
* Upload new [questionnaires](05-questionnaires.md),
* Add, modify and delete records for: 
	* [spatial units/project locations](06-records.md#user-content-spatial-units-aka-project-locations), 
	* [parties](06-records.md#user-content-parties) associated with these locations, and
	* the [relationships](06-records.md#user-content-relationships) between the two. 
* And finally add, modify, and delete [project resources](07-resources.md). 

Each of the sections listed above will outline how to use API endpoints to make these things happen.

## Topics

### Reading this Documentation

This documentation is structured primarily by related functionality and topic, and then by endpoint. 

Each endpoint is described using several parts:

* **The HTTP method.** The primary methods you'll see here are `GET`, `POST`, `PATCH`, and `DELETE`.

* **The path**, such as `/api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/`.

* **Any URL parameters**, a.k.a. parts of the endpoints wrapped in brackets. In the above path, those would be `{organization_slug}` and `{project_slug}`

In addition, each method + endpoint combination is described by a request payload, properties, and an example output. 

> Oliver, added mention of API interfaces here. 

All URLs referenced here require their own base path, likely your own local instance of the Cadasta Platform. If you'd like to use an existing base path to explore the API, you can use the one for our demo site: `https://demo.cadasta.org/`. This will take you to a basic API UI, which is better used for exploration than it is for actually interacting with the API.

### Using the API

This API works best in one of two scenarios: 

1. **You're a developer working with an individual or organization using the Cadasta Platform.** If you have administrator access to the organization you're working for, you'll be able to perform many of the key functions for that organization using your [authorization token](02-users.md#user-content-log-a-user-in). 

2. **You've created a locally-hosted version of the platform.** 

If you have any questions about using the API, please don't hesitate to [contact us](http://cadasta.org/contact/). 

### Requests

All requests are encoded in `application/json`, unless they involve some kind of file upload. Any exceptions are indicated in the documentation.

### Common Response Codes

After submitting any API request, you'll get one of the following responses. 

Property | Description
---|---
`200` | The operation has been completed successfully
`400` | There was a problem with the request payload. Usually this means required attributes are missing or the values provided are not accepted. Only applies the `POST`, `PATCH` and `PUT` requests. 
`401` | No valid authentication token was provided with the request. 
`403` | Permission denied, the user has no permission to access this resource or perform this action. 
`404` | Not found. (The object with the given ID was not in the database.)

### Formatting URLS for Accessing Specific Objects

To get at, create, or modify projects, organizations, organization members and more, you'll need to access certain IDs (such as `username`) or a couple different kinds of slugs.  

Two slugs that appear frequently are: 

* `organization_slug`, and 
* `project_slug`

You can find the `organization_slug` by locating the organization in the [list of all organziations](03-organization.md#user-content-list-organizations) and then copying the value of the `slug` property. 

You can find most `project_slugs` by [viewing all of the projects in the Cadasta system](04-projects.md#user-content-list-all-projects), which returns publicly viewable projects as well as projects you have access to. If it's a private project, you must have access to it and find it by [listing all of the projects in an organization](#user-content-list-all-projects-in-an-organization). 

Once you get your slugs, add them to your endpoint outside of the curly braces. 

For example, to get at a specific project, you need to use the following endpoint:

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/
```

If the `organization_slug` is `sample-organization` and the `project_slug` is `sample-project`, then the endpoint should look like this:

```
GET /api/v1/organizations/sample-organization/projects/sample-project/
```

This API uses many other IDs, which are explained along with the endpoint they are used in. 

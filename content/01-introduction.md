## Cadasta API documentation

Welcome to the Cadasta Platform API documentation. 

Using this platform API, you can: 

* Manage user accounts - creating them, deleting them, and amending them as needed, 
* Create and edit organizations, 
* Access JSON for all of the publicly viewable projects in the system, 
* Create and modify


- How do I list, get, create, update and delete resources via the API?
- How are responses structured; i.e. what fields are present, what data types do they have?
- What do I need to send to the server to create or update a resource?

### Using the Platform API

You can view each endpoint directly throught the Cadasta Platform API. 

First, determine which endpoint you'd like to access. Then, add it to the end of the URL `https://platform-staging-api.cadasta.org/`. For example, to get to `api/v1/organizations/`, you'd write:

https://platform-staging-api.cadasta.org/api/v1/organizations/

The page you'll see looks like this:

![](_img/api-01-ai.png)

Here you're seeing the output from the GET method - all of the publicly viewable organizations in the system. 

On the right, you can use the dropdown next to the GET button to select whether you'd like the API view or JSON. 

![](_img/api-02-ai.png)

You can also select Filters, which will take you to a pop-up window where you can filter though results. 

![](_img/api-03-ai.png)

If you'd like to post a new organization, you can scroll to the bottom of the page. Here, you can add all the fields necessary to create a new organization. Submit the information by selecting POST. 

![](_img/api-04-ai.png) 

Take a moment to explore the following endpoint using the API interface:

https://platform-staging-api.cadasta.org/api/v1/organizations/

### Using DRF Docs

If you'd like an alternative view into the API, you can visit the documentation created using Django REST Framework, or DRF Docs. You can visit that by going here:

https://platform-staging-api.cadasta.org/api/v1/docs/

To view the fields available for each endpoint, click either "Options" or the enpoint itself.

![](_img/drf-02-ai.png)

Now you can see that the following fields are available:

* `username`
* `full_name`
* `email`
* `password`
* `email_verified`

Fields with the square `R` next to them are required.

To register a new user here using the POST method, click the plugin symbol on the right. From there, you'll be taken to a pop-up window where you can register a new user. 

![](_img/drf-03-ai.png)

You can also select OPTIONS to add any needed additional fields.

![](_img/drf-04-ai.png)

When you're done, press Send. An `HTTP 200` message indicates that your data has been posted successfully. 

Take a moment to explore any endpoint using DRF docs:

https://platform-staging-api.cadasta.org/api/v1/docs/

### Authentification 

One of the first things you need to do to get started is get an authentification token, which is required by many endpoints in the Cadasta API. To authenticate a user, sign API requests with an authorization token, which you can obtain by loging the user in.

See documentation for [`/api/v1/account/login/`](02-users.md) to see how to get an authentication token. 

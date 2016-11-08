## Spatial Units (a.k.a Project Locations)


Projects in the Cadasta Platform are spatial in nature – collections of points, lines, and polygons representing areas where land rights documentation is happening. These points, lines, and polygons can be retrieved and modified using the Cadasta API.  

_<a href="https://docs.cadasta.org/en/04-records.html#project-locations" target="_blank">Read more about Project Locations in our Platform Documentation</a>_

The endpoint you need to access JSON for spatial units / project locations starts like this:

```
/api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/
```


A spatial unit / project location JSON object contains the following properties: 

Property | Type | Description
---|---|---
`type` | `String` | This field is automatically set to `Feature`.
`geometry` | `Object` | A [GeoJSON represenation](https://en.wikipedia.org/wiki/GeoJSON#Geometries) of the spatial unit's geometry. 
`properties` | `Object` | An object that gives the location a unique ID, defines the type of location it is (land `types`), and lists any attributes. (See  the `properties` table below for more information)

The `properties` object contains the following properties:

Property | Type | Description
---|---|---
`id` | `String` |  A unique ID for the spatial unit
`type` | `String` | The type of spatial unit that it is, defined by the fields in your questionnaire. (See the land `types` table below )
`attributes` | `Object` | An array of different attributes for the property. 
`project` | `Object` | An object containing basic information about the project, and within that, the organization. This field will not be present when working with a list of spatial units, as with `GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/`. See the `project` table below for more information.

The `project` object contains the following properties:

Property | Type | Description
---|---|---
`id` | `String` | A unique ID for the project
`organization` | `Object` |  An object containing the organization `id`, `slug` and `name`. (See the `organization` table below.)
`name` | `String` | The name of the project that the spatial unit is a project. 
`slug` | `String` | The project slug.

Finally, the `organization` object contains the following properties:

Property | Type | Description
---|---|---
`id` | `String` |  A unique ID for the organization.
`slug` | `String` |  The organization slug.
`name` | `String` |  The name of the organization that's housing the project. 

**Land `type` Abbreviations**

If you need to plot out the land `types`, these are the abbreviations you need:

Abbreviation | What it Represents
--- | ---
`PA` | Parcel
`CB` | Community Boundary
`BU` | Building
`AP` | Apartment
`PX` | Project Extent
`RW` | Right-of-way
`NP` | National Park Boundary
`MI` | Miscellaneous


#### Example Spatial Unit / Project Location JSON Object

```json

{
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    -122.66475677490233,
                    45.50045162361647
                ],
                [
                    -122.66956329345703,
                    45.487395598055215
                ],
                [
                    -122.66252517700195,
                    45.49954923075264
                ],
                [
                    -122.66475677490233,
                    45.50045162361647
                ]
            ]
        ]
    },
    "properties": {
        "id": "39jvd8r93jijahnvgd4s4cih",
        "type": "PA",
        "attributes": {},
        "project": {
            "id": "hxk4k8aee5rh5htahhh5uenn",
            "organization": {
                "id": "gae6pjf9xygxddgyg5dq45iq",
                "slug": "example-organization",
                "name": "Example Organization"
            },
            "name": "Portland Project",
            "slug": "portland-project"
        }
    }
}

```

***










### List Spatial Units / Project Locations

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/
```

Use the above method to get the GPS coordinates for all of the locations in a spatial unit / project location. These coordinates may be shown as a point, line or polygon.


**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).

**Response**


The response body is a GeoJSON feature collection multiple [project location / spatial unit JSON objects](#user-content-example-spatial-unit--project-location-json-object), but without the `project` property. 

Encasing these objects are the following properties:

Property | Type | Description 
--- | --- | --- 
`type` | `String` | This field is automatically set to `FeatureCollection`.
`features` | `Array` | An array of all of the [project location / spatial unit JSON objects](#user-content-example-spatial-unit--project-location-json-object) in the project. 



#### Example Response

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -122.7457809448242,
                            45.64344809984393
                        ],
                        [
                            -122.7308464050293,
                            45.640807770704704
                        ],
                        [
                            -122.74543762207031,
                            45.64068775278732
                        ],
                        [
                            -122.7457809448242,
                            45.64344809984393
                        ]
                    ]
                ]
            },
            "properties": {
                "id": "xtc4de68iawwzgtawp8avgv8",
                "type": "PA",
                "attributes": {}
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -122.66475677490233,
                            45.50045162361647
                        ],
                        [
                            -122.66956329345703,
                            45.487395598055215
                        ],
                        [     [
                            -122.66252517700195,
                            45.49954923075264
                        ],
                        [
                            -122.66475677490233,
                            45.50045162361647
                        ]
                    ]
                ]
            },
            "properties": {
                "id": "39jvd8r93jijahnvgd4s4cih",
                "type": "PA",
                "attributes": {}
            }
        }
    ]
}
```



***
















### Create a New Spatial Unit / Project Location


```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/
```

Use the above method to create a new spatial unit / project location.

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`geometry` | `Object` | x | A [GeoJSON geometry](https://en.wikipedia.org/wiki/GeoJSON#Geometries) defining the geographic coordinates of the location.
`type` | `String` | x | This refers to the possible land `types` that the location could be (e.g. `PA` = Parcel). See the **Land `type` Abbreviations**  table above for more information.
`attributes` | `Array` |  | An array of different attributes for the property. 


**Response**

The response is a complete [spatial unit / project location JSON Object](#user-content-example-spatial-unit--project-location-json-object).

#### Example Response

```json
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [
            -122.7457809448242,
            45.64344809984393
        ]
    },
    "properties": {
        "id": "n776cwdhqriaqdwsfafiajib",
        "type": "MI",
        "attributes": {},
        "project": {
            "id": "hxk4k8aee5rh5htahhh5uenn",
            "organization": {
                "id": "gae6pjf9xygxddgyg5dq45iq",
                "slug": "example-organization",
                "name": "Example Organization"
            },
            "name": "Portland Project",
            "slug": "global-project"
        }
    }
}

```

***









### Get a Spatial Unit / Project Location

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/
```

Use the above method to get the JSON object for a specific spatial unit / project location. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`spatial_unit_id` | The  uniqe ID of the spatial unit, which you can find by [listing all of the spatial units](#user-content-list-spatial-units--project-locations) for the project it's in. 


**Response**

The response is a complete [spatial unit / project location JSON Object](#user-content-example-spatial-unit--project-location-json-object).


#### Example Response

```json
{
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    -122.66475677490233,
                    45.50045162361647
                ],
                [
                    -122.66956329345703,
                    45.487395598055215
                ],
                [
                    -122.66252517700195,
                    45.49954923075264
                ],
                [
                    -122.66475677490233,
                    45.50045162361647
                ]
            ]
        ]
    },
    "properties": {
        "id": "39jvd8r93jijahnvgd4s4cih",
        "type": "PA",
        "attributes": {},
        "project": {
            "id": "hxk4k8aee5rh5htahhh5uenn",
            "organization": {
                "id": "gae6pjf9xygxddgyg5dq45iq",
                "slug": "example-organization",
                "name": "Example Organization"
            },
            "name": "Portland Project",
            "slug": "portland-project"
        }
    }
}
```

***










### Update a Spatial Unit / Project Location

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/
```

Use the above method to update the JSON object for a specific spatial unit / project location.

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`spatial_unit_id` | The  uniqe ID of the spatial unit, which you can find by [listing all of the spatial units](#user-content-list-spatial-units--project-locations) for the project it's in.  



**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`geometry` | `Object` | x | A [GeoJSON geometry](https://en.wikipedia.org/wiki/GeoJSON#Geometries) defining the geographic coordinates of the location. 
`type` | `String` | x | This refers to the possible land `types` that the location could be (e.g. `PA` = Parcel). See the land `types` table above for more information.
`attributes` | `Object` |  | An array of different attributes for the property. 


**Response**

The response is a complete [spatial unit / project location JSON Object](#user-content-example-spatial-unit--project-location-json-object).


#### Example Response

```json
{
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    -122.7457809448242,
                    45.64344809984393
                ],
                [
                    -122.7457809448235,
                    45.64344809984442
                ],
                [
                    -122.7457809448219,
                    45.64344809984999
                ],
                [
                    -122.7457809448242,
                    45.64344809984393
                ]
            ]
        ]
    },
    "properties": {
        "id": "w4rwh32mqctn9g223wnry2gx",
        "type": "PA",
        "attributes": {},
        "project": {
            "id": "hxk4k8aee5rh5htahhh5uenn",
            "organization": {
                "id": "gae6pjf9xygxddgyg5dq45iq",
                "slug": "example-organization",
                "name": "Example Organization"
            },
            "name": "Portland Project",
            "slug": "portland-project"
        }
    }
}

```

***















### Delete a Spatial Unit / Project Location

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/
```

Use the above method to delete a spatial unit / project location.

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`spatial_unit_id` | The  uniqe ID of the spatial unit, which you can find by [listing all of the spatial units](#user-content-list-spatial-units--project-locations) for the project it's in. 

**Response**

If the spatial unit was succesfully deleted, an empty response with status code `204` is returned. 







## Parties

Each project location has a relationship with people of all kinds – sometimes individuals, sometimes groups, and sometimes a corporation. These people are known as **parties** in the Cadasta system. 

_<a href="https://docs.cadasta.org/en/04-records.html#location-relationships" target="_blank">Read more about Parties in our Platform Documentation</a>_

Using the API, you can view, create, update, and delete parties for your project. 

The endpoint for parties begins like this:

```
/api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/
```

A party JSON object contains the following properties:

Property | Type | Description 
--- | --- | --- 
`id` | `String` | The autogenerated unique ID for each party.
`name` | `String` | The name of the party.
`type` | `String` | The type of party, indicating whether it's an individual (`IN`), a group (`GR`), or a corporation (`CO`).
`attributes` | `Object` | Project-specific attributes that are defined through the projects questionnaire. 
`project` | `Object` | A field with the project `id`, `name`, `slug`, and `organization`, which is itself an array including the organization `id`, `slug`, and `name`. (See the `project` and `organization` tables below for more information.) Note that this property will not appear in all responses. 

The `project` object contains the following properties:

Property | Type | Description
---|---|---
`id` | `String` | A unique ID for the project
`organization` | `Array` | An object containing the organization `id`, `slug` and `name`. (See the `organization` table below.)
`name` | `String` | The name of the project that the spatial unit is a project. 
`slug` | `String` | The project slug.

Finally, the `organization` object contains the following properties:

Property | Type | Description
---|---|---
`id` | `String` |  A unique ID for the organization.
`slug` | `String` |  The organization slug.
`name` | `String` |  The name of the organization that's housing the project. 


#### Example Party JSON Object

```json
{
    "id": "z8f83bt6fskq6wcvnp223t3q",
    "name": "Jane Doe",
    "type": "IN",
    "attributes": {},
    "project": {
        "id": "hxk4k8aee5rh5htahhh5uenn",
        "organization": {
            "id": "gae6pjf9xygxddgyg5dq45iq",
            "slug": "example-organization",
            "name": "Example Organization"
        },
        "name": "Portland Project",
        "slug": "global-project"
    }
}


```

***






### List Parties

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/
```

Use the above method to return al of the parties listed as part of a project.

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).

**Response**

The response is an array of [party JSON objects](#user-content-example-party-json-object) without the `project` property. 


#### Example Response

```json
[
    {
        "id": "ajnyj54mpma7kpexxejfv5he",
        "name": "Example Corp.",
        "type": "CO",
        "attributes": {}
    },
    {
        "id": "cnpsvntqugkncywqevhznnsz",
        "name": "Elizabeth James",
        "type": "IN",
        "attributes": {}
    },
    {
        "id": "wvvi6sbgdf77nfwbe26fgz3z",
        "name": "Portland Islands Neighborhood Association",
        "type": "GR",
        "attributes": {}
    }
]

```
***











### Create a New Party

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/
```

Use the above method to create a new party.

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`name` | CharField | x | The name of the party.
`type` | ChoiceField | x | The type of party, indicating whether it's an individual (`IN`), a group (`GR`), or a corporation (`CO`).
`attributes` | Object |  | Project-specific attributes that are defined through the projects questionnaire. 

**Response**

The response is a [party JSON object](#user-content-example-party-json-object). 

#### Example Response

```json
{
    "id": "z8f83bt6fskq6wcvnp223t3q",
    "name": "Jane Doe",
    "type": "IN",
    "attributes": {},
    "project": {
        "id": "hxk4k8aee5rh5htahhh5uenn",
        "organization": {
            "id": "gae6pjf9xygxddgyg5dq45iq",
            "slug": "example-organization",
            "name": "Example Organization"
        },
        "name": "Portland Project",
        "slug": "global-project"
    }
}

```

***










### Get a Party

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```

Use the above method to get at a specific party. 


URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`party_id` | The unique ID generated for the specific party, which can be found by [listing all of the parties](#user-content-list-parties). 


**Response**

The response contains a [party JSON object](#user-content-example-party-json-object). 

#### Example Response

```json
{
    "id": "z8f83bt6fskq6wcvnp223t3q",
    "name": "Jane Doe",
    "type": "IN",
    "attributes": {},
    "project": {
        "id": "hxk4k8aee5rh5htahhh5uenn",
        "organization": {
            "id": "gae6pjf9xygxddgyg5dq45iq",
            "slug": "example-organization",
            "name": "Example Organization"
        },
        "name": "Portland Project",
        "slug": "global-project"
    }
}
```

***














### Update a Party

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```

Use the above method to update the `name`, `type`, or `attributes` of a party.

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`party_id` | The unique ID generated for the specific party, which can be found by [listing all of the parties](#user-content-list-parties). 


**Request Payload**

You can modify any one of these fields:

Property | Type  | Required? | Description 
--- | --- | --- | ---
`name` | `String` |  | The name of the party.
`type` | `String` |  | The type of party, indicating whether it's an individual (`IN`), a group (`GR`), or a corporation (`CO`).
`attributes` | `Object` |  | Project-specific attributes that are defined through the projects questionnaire. 


**Response**

The response contains a [party JSON object](#user-content-example-party-json-object). 


#### Example Response

```json
{
    "id": "z8f83bt6fskq6wcvnp223t3q",
    "name": "Jane Doe",
    "type": "IN",
    "attributes": {},
    "project": {
        "id": "hxk4k8aee5rh5htahhh5uenn",
        "organization": {
            "id": "gae6pjf9xygxddgyg5dq45iq",
            "slug": "example-organization",
            "name": "Example Organization"
        },
        "name": "Portland Project",
        "slug": "portland-project"
    }
}

```

***















### Delete a Party

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```

Use the above method and endpoint to delete a party. 

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`party_id` | The unique ID generated for the specific party, which can be found by [listing all of the parties](#user-content-list-parties). 

**Response**

If the party was succesfully deleted, an empty response with status code 204 is returned.











## Relationships

Each location has a relationship with one or more parties, and each of those parties has a specific type of relationship with the land. For example, a municipal body may own a park, and a local tribe may have right-of-way access to it. Ownership and right-of-way-access are both types of relationships. (Note that sometimes you may also see the word "tenure" in lieu of or alongside the word "relationship.")

_<a href="https://docs.cadasta.org/en/04-records.html#location-relationships" target="_blank">Read more about Relationships in our Platform Documentation</a>_

The Cadasta API allows you to list relationships of a party and list relationships to a spatial unit / project location. You can also get, create, update, and delete relationships as well.

Endpoints in this section start with:

```
/api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/relationships/
```

or

```
/api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/relationships/
```

or

```
/api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/{relationship_id}/
```

A relationship object contains the following properties:

The response is a an array of JSON Objects, each of which has the following properties:


Property | Type | Description 
--- | --- | --- 
`rel_class`| `String` | The type of relationships; currently `"tenure"` is the only possible relatioship type.
`id` | `String`  | The unique ID of the relationship
`party` | `Array` | The object containing the party that the spatial unit is related to. (See the `party` table below for more information.)
`spatial_unit` | `Object` | The spatial unit / project location object. (See the `spatial unit` table below for more information.)
`tenure_type`| `String` |  The kind of relationship. (See the [Relationship (Tenure) Categories table](#user-content-relationship-tenure-categories) for more information.)
`attributes`| `Object`  | Project-specific attributes that are defined through the project's questionnaire. 

The `party` object has the following properties: 

Property | Type | Description 
--- | --- | --- 
`id` | `String` | The unique ID of the party. 
`name` | `String` | The name of the party.
`type` | `String` |  The type of party, e.g. an individual (`IN`), a group (`GR`), or a corporation (`CO`).

The `spatial_unit` object has the following properties:

Property | Type | Description 
--- | --- | --- 
`type` | `String` | Type of spatial unit; automatically set to `Feature`.
`geometry` | `Object` |  A [GeoJSON represenation](https://en.wikipedia.org/wiki/GeoJSON#Geometries) of the spatial unit's geometry.
`properties` | `Object` | An object that gives the location a unique ID and defines the type of location it is (land `types`). (See  the `properties` table below for more information)

#### Example Relationship JSON Object

```json
{
    "rel_class": "tenure",
    "id": "mmikx24rcjd2stgyqz495fqa",
    "party": {
        "id": "wvvi6sbgdf77nfwbe26fgz3z",
        "name": "Portland Islands Neighborhood Association",
        "type": "GR"
    },
    "spatial_unit": {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -122.7457809448242,
                        45.64344809984393
                    ],
                    [
                        -122.7308464050293,
                        45.640807770704704
                    ],
                    [
                        -122.74543762207031,
                        45.64068775278732
                    ],
                    [
                        -122.7457809448242,
                        45.64344809984393
                    ]
                ]
            ]
        },
        "properties": {
            "id": "xtc4de68iawwzgtawp8avgv8",
            "type": "PA"
        }
    },
    "tenure_type": "TN",
    "attributes": {}
}
```


**Relationship (Tenure) Categories**

Relationships fall into one of the following categories. The abbreviations on the left are what you'd use when modifying or reading a relationship using the API:

Abbreviation | What it Represents
---|---
`AL `| All Types
`CR` | Carbon Rights
`CO` | Concessionary Rights
`CU` | Customary Rights
`EA` | Easement
`ES` | Equitable Servitude
`FH` | Freehold
`GR` | Grazing Rights
`HR` | Hunting/Fishing/Harvest Rights
`IN` | Indigenous Land Rights
`JT` | Joint Tenancy
`LH` | Leasehold
`LL` | Longterm leasehold
`MR` | Mineral Rights
`OC` | Occupancy (No Documented Rights)
`TN` | Tenancy (Documented Sub-lease)
`TC` | Tenancy in Common
`UC` | Undivided Co-ownership
`WR` | Water Rights



***



















### List Relationships

Relationsips are defined between a party and a spatial unit. You can list existing relationships connected to a party or to a spatial unit.

#### List relationships to a party

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/relationships/
```

#### List relationships to a spatial unit

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/relationships/
```

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`party_id` | **Only required when listing relationships to a party.** The unique ID generated for the specific party, which can be found by [listing all of the parties](#user-content-list-parties). 
`spatial_unit_id` | **Only required when listing relationships to a spatial unit.** The unique ID generated for the specific spatial unit, which can be found by [listing all of the spatial units](#user-content-list-parties). 

**Response**

The response contains a list of relationship JSON objects. 


#### Example Response

```json
[
    {
        "rel_class": "tenure",
        "id": "mmikx24rcjd2stgyqz495fqa",
        "party": {
            "id": "wvvi6sbgdf77nfwbe26fgz3z",
            "name": "Portland Islands Neighborhood Association",
            "type": "GR"
        },
        "spatial_unit": {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -122.7457809448242,
                            45.64344809984393
                        ],
                        [
                            -122.7308464050293,
                            45.640807770704704
                        ],
                        [
                            -122.74543762207031,
                            45.64068775278732
                        ],
                        [
                            -122.7457809448242,
                            45.64344809984393
                        ]
                    ]
                ]
            },
            "properties": {
                "id": "xtc4de68iawwzgtawp8avgv8",
                "type": "PA"
            }
        },
        "tenure_type": "TN",
        "attributes": {}
    },
    {
        "rel_class": "tenure",
        "id": "f2eq96ez7rnkucwz9sr4my9y",
        "party": {
            "id": "ajnyj54mpma7kpexxejfv5he",
            "name": "Example Corp.",
            "type": "CO"
        },
        "spatial_unit": {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -122.7457809448242,
                            45.64344809984393
                        ],
                        [
                            -122.7308464050293,
                            45.640807770704704
                        ],
                        [
                            -122.74543762207031,
                            45.64068775278732
                        ],
                        [
                            -122.7457809448242,
                            45.64344809984393
                        ]
                    ]
                ]
            },
            "properties": {
                "id": "xtc4de68iawwzgtawp8avgv8",
                "type": "PA"
            }
        },
        "tenure_type": "LL",
        "attributes": {}
    },
    {
        "rel_class": "tenure",
        "id": "5ueeskcsfgf4iuwcgmji3dik",
        "party": {
            "id": "cnpsvntqugkncywqevhznnsz",
            "name": "Joan Arches",
            "type": "IN"
        },
        "spatial_unit": {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -122.7457809448242,
                            45.64344809984393
                        ],
                        [
                            -122.7308464050293,
                            45.640807770704704
                        ],
                        [
                            -122.74543762207031,
                            45.64068775278732
                        ],
                        [
                            -122.7457809448242,
                            45.64344809984393
                        ]
                    ]
                ]
            },
            "properties": {
                "id": "xtc4de68iawwzgtawp8avgv8",
                "type": "PA"
            }
        },
        "tenure_type": "WR",
        "attributes": {}
    }
]
```

***














### Create a New  Relationship

> Oliver, not sure how to format this to get it to work. Also, `attributes` may not be left blank, but I haven't seen an example of what goes into that field...

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/
```

> Oliver, is this correct?

Use the above endpoint to create a new relationship between an existing party and spatial unit.

**Request Payload**

> fill in 

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`party` | `String` | x | The name of the party.
`spatial_unit` | `String` | x | ??
`tenure_type` | `String` | x | ??
`attributes` | `Array` | x | ??


**Response**

> fill in

#### Example Response

> fill in

***














### Get a Relationship

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/{relationship_id}/
```

Use the above method and endpoint to get a specific  relationship. 

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`relationship_id` | The unique ID of the relationship, which can be found by [listing all of the relationships to a spatial unit](#user-content-list-relationships-of-a-party-to-spatial-units--project-locations). 

**Response**

The response contains a relationship JSON object.


#### Example Response

```json
{
    "rel_class": "tenure",
    "id": "f2eq96ez7rnkucwz9sr4my9y",
    "party": {
        "id": "ajnyj54mpma7kpexxejfv5he",
        "name": "Example Corp.",
        "type": "CO"
    },
    "spatial_unit": {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -122.7457809448242,
                        45.64344809984393
                    ],
                    [
                        -122.7308464050293,
                        45.640807770704704
                    ],
                    [
                        -122.74543762207031,
                        45.64068775278732
                    ],
                    [
                        -122.7457809448242,
                        45.64344809984393
                    ]
                ]
            ]
        },
        "properties": {
            "id": "xtc4de68iawwzgtawp8avgv8",
            "type": "PA"
        }
    },
    "tenure_type": "LL",
    "attributes": {}
}
```


***































### Update a Relationship

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/{relationship_id}/
```

Use the above method and endpoint to update a  relationship.

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`relationship_id` | The unique ID of the relationship, which can be found by [listing all of the relationships to a spatial unit](#user-content-list-relationships-of-a-party-to-spatial-units--project-locations). 


**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`tenure_type` | `String` | | The relationship type; see [Relationship (Tenure) Categories]() for an overview of accepted values.
`attributes` | `Object` | | Project-specific attributes that are defined through the projects questionnaire. 

**Response**

The response contains a relationship JSON object.

#### Example Response

```json
{
    "rel_class": "tenure",
    "id": "f2eq96ez7rnkucwz9sr4my9y",
    "party": {
        "id": "ajnyj54mpma7kpexxejfv5he",
        "name": "Example Corp.",
        "type": "CO"
    },
    "spatial_unit": {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -122.7457809448242,
                        45.64344809984393
                    ],
                    [
                        -122.7308464050293,
                        45.640807770704704
                    ],
                    [
                        -122.74543762207031,
                        45.64068775278732
                    ],
                    [
                        -122.7457809448242,
                        45.64344809984393
                    ]
                ]
            ]
        },
        "properties": {
            "id": "xtc4de68iawwzgtawp8avgv8",
            "type": "PA"
        }
    },
    "tenure_type": "LL",
    "attributes": {}
}
```





***












### Delete a Relationship

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/{relationship_id}/
```

Use the above method to delete a relationship from a project.

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).
`relationship_id` | The unique ID of the relationship, which can be found by [listing all of the relationships to a spatial unit](#user-content-list-relationships-of-a-party-to-spatial-units--project-locations). 


**Response**

If the relationship was succesfully deleted, an empty response with status code `204` is returned.

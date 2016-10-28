## Spatial Units (a.k.a Project Locations)

> Add introduction

The endpoint you need to access JSON for spatial units starts like this:

```
/api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/
```

A spatial unit / project location object is structured like this:

* `type` (set automatically to `FeatureCollection`)
* `features` 
	* `type` (set automatically to `Feature`)
	* `geometry`
		* `type` (whether the feature is a point, line or polygon)
		* `coordinates` (contains an array of GPS coordinates)
	* `properties`
		* `id`
		* `type` (the type of location it is)
		* `attributes`

Its JSON object contains the following properties: 

Property | Type | Description
---|---|---
`type` | ?? | This field is automatically set to FeatureCollection.
`features` | ?? | Creates an array of all of the Location Objects


#### Example Spatial Units in a Project (a.k.a Project Locations)

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
                            -122.71333694458006,
                            45.63456649809911
                        ],
                        [
                            -122.68827438354492,
                            45.62328243346257
                        ],
                        [
                            -122.66819000244142,
                            45.61463778373898
                        ],
                        [
                            -122.64501571655272,
                            45.60479086492599
                        ],
                        [
                            -122.64656066894531,
                            45.602869313350624
                        ],
                        [
                            -122.65205383300781,
                            45.60226881498576
                        ],
                        [
                            -122.67093658447266,
                            45.60310951089689
                        ],
                        [
                            -122.6905059814453,
                            45.6092342008613
                        ],
                        [
                            -122.71368026733398,
                            45.61956059488118
                        ],
                        [
                            -122.72998809814452,
                            45.62940492064501
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
                        [
                            -122.66750335693358,
                            45.481739052946516
                        ],
                        [
                            -122.66441345214844,
                            45.47903093138234
                        ],
                        [
                            -122.66372680664062,
                            45.47668378740375
                        ],
                        [
                            -122.6597785949707,
                            45.47710507685561
                        ],
                        [
                            -122.65746116638182,
                            45.47860965632908
                        ],
                        [
                            -122.654972076416,
                            45.482641731208865
                        ],
                        [
                            -122.65402793884277,
                            45.48613195107752
                        ],
                        [
                            -122.65445709228516,
                            45.48865921668583
                        ],
                        [
                            -122.65780448913574,
                            45.49052450666501
                        ],
                        [
                            -122.66063690185547,
                            45.493352409132655
                        ],
                        [
                            -122.66218185424803,
                            45.497443591159865
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
                "attributes": {}
            }
        }
    ]
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


### List Spatial Units

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/
```

Use the above method to get the GPS coordinates for all of the locations in a project. These coordinates may be shown as a point, line or polygon.

**Request Payload**

Property | Type | Required? | Description 
--- | --- | :---: | --- 
`thing` | CharField | x | words

**Response**

The response body is an array containing a [project JSON object](#user-content-example-project-json-object).

####Example Response



***










### Create a new spatial unit

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/
```
***










### Get a spatial unit

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/
```
***














### Update a spatial unit

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/
```

***














### Delete a spatial unit

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/
```















## Parties



***

### List parties

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/
```


***











### Create a new party

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/
```

***












### Get a party

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```

***















### Update a party

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```

***














### Delete a party

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```

***














## Relationships



***








### List relationships of a party

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/relationships/
```

***















### List relationships of a spatial unit

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/spatial/{spatial_unit_id}/relationships/
```

***


















### Create a new tenure relationship

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/
```

***















### Get a tenure relationship

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/{relationship_id}/
```
***











### Update a tenure relationship

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/{relationship_id}/
```

***












### Delete a tenure relationship

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/relationships/tenure/{relationship_id}/
```

***









<!-- ### Create a new party

```endpoint
POST /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/
```

### Get a party

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```

### Update a party

```endpoint
PATCH /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```

### Delete a party

```endpoint
DELETE /api/v1/organizations/{organization_slug}/projects/{project_slug}/parties/{party_id}/
```
 -->

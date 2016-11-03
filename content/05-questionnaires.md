## Questionnaires

> 11.2.2016: Beth is getting an error and can't see how the JSON object is formatted (see [Issue 19](https://github.com/Cadasta/api-docs/issues/19))

> Oliver, please fill in the `Required?` fields

Each project in the Cadasta Platform requires a questionnaire in order to work. This questionnaire creates the essential framework for data collection, either online or in the field. 

Using the API, you can get the structure of your questionnaire in JSON format, or you can replace the questionnaire being used for a project. 

> Oliver, David tells me that now you *can* update a questionnaire after the project has started. Is it just that you can't do it in the API?

Note that you **cannot** replace a questionnaire in an active project once data is being collected about it.

_To learn more about how questionnaires work, [see our documentation on Questionnaires & Custom Data Collection](https://docs.cadasta.org/en/08-XLSForms.html)._

The endpoint you'll use to work with questionnaires begins with:

```
/api/v1/organizations/{organization_slug}/projects/{project_slug}/questionnaire/
```

A questionnaire JSON object contains the following properties:

Property | Type | Description
---|---|:---:|---
`id` | `String` | The questionnaire ID.
`filename` | `String` | The file name of the questionnaire.
`title` | `String` | The questionnaire title.
`id_string` | `String` | The unique ID for the spreadsheet, as defined in the spreadsheet itself in the Settings tab.
`xls_form` | `String` | Link to an Excel spreadsheet version of the form hosted on Amazon AWS.
`version` | `String` | Time stamp when the questionnaire was last updated
`questions` | `Array` | List of questions, charted in the **Questions** section below. 
`question_groups` | `Array` | List of question groups, charted in the **Question Groups** section below.

**Question Groups**

Property | Type | Description
---|---|---
`id` | `String` | The ID of the question group.
`name` | `String` | Question group name, usually used to identify the group in the form. 
`label` | `String` | Question group label, usually displayed to the user.
`questions` | `Array` | List of questions in the group. See the Questions table below. 
`relevant` | `String` | A reference to another field and corresponding value indicating when the field is displayed. 

**Questions**

> Oliver, the API isnt' showing me the JSON at the moment; not sure what type some of the fields below are supposed to be

Property | Type | Description
---|---|---
`id` | `String` | The ID of the question.
`name` | `String` | Question name, usually used to identify fields in the form. 
`label` | `String` | Question label, usually displayed to the user.
`type` | `String` | The field type, based on the question types available through [XLSforms](http://xlsform.org/#question-types). See the table below to see how they translate.
`required` | `Boolean` | Indicates whether the field is required.
`constraint` | `String` | The range of accepted values for the field. [See XLSForms documentation](http://xlsform.org/#constraints) for more information.
`default` | `String`  | The default value of the field.
`hint`| `String` | An additional help text describing details of the field, usually displayed next to the field label.
`relevant` | `String` | A reference to another field and corresponding value indicating when the field is displayed. 
`options` | `Array` | A list of choices, only relevant if `type` is `select_one` or `select_multiple`. See **Options** table below for more information.


**Options**

Property | Type | Required? | Description
---|---|:---:|---
`id` | `String` | x | The ID of the choice option.
`name` | `String`  | x | Choice name, usually as value for the form field. 
`label` | `String`  | x | Choice label, usually displayed to the user.

**`type` Options**

Use this chart to figure out what type of question you're using in your form.

`type` | XLSform | Answer Input
---|---|---
`IN` | `integer` |	Integer (i.e., whole number) input.
`DE` | `decimal` |	Decimal input.
`TX` | `text` |	Free text response.
`S1` | `select_one` | Multiple choice question; only one answer can be selected.
`SM` | `select_multiple` | Multiple choice question; multiple answers can be selected.
`NO` | `note` |	Display a note on the screen, takes no input.
`GP` | `geopoint` |	Collect a single GPS coordinates.
`GT` | `geotrace` |	Record a line of two or more GPS coordinates.
`GS` | `geoshape` |	Record a polygon of multiple GPS coordinates; the last point is the same as the first point.
`DA` | `date` |	Date input.
`TI` | `time` |	Time input.
`DT` | `dateTime` |	Accepts a date and a time input.
`PH` | `image` / `photo`| Take a picture.
`AU` | `audio` | Take an audio recording.
`VI` | `video` | Take a video recording.
`BC` | `barcode` | Scan a barcode, requires the barcode scanner app to be installed.
`CA` | `calculate` | Perform a calculation; see the Calculation section below.
`AC` | `acknowledge` | Acknowledge prompt that sets value to “OK” if selected.

The following values are for metadata that your questionnaire may be collecting:

`type` | XLSform | Answer Input
---|---|---
`ST` | `start` | Indicates the start of the survey.
`EN` | `end` | Indicates the end of the survey.
`TD` | `today` | Day of the survey.
`DI` | `deviceid` | IMEI (International Mobile Equipment Identity)
`SI` | `subscriberid` | IMSI (International Mobile Subscriber Identity)
`SS` | `simserial` | SIM serial number.
`PN` | `phonenumber` | Phone number of the device (if available)


##### Example Questionnaire JSON Object

```json
{
    "id": "vqd89i65ed2u7yng5jbexhhr",
    "filename": "jmbibndu9khbsybnnrq8eyjr",
    "title": "StandardCadastaQuestionnaire",
    "id_string": "StandardCadastaQuestionnaire",
    "xls_form": "https://s3-us-west-2.amazonaws.com/cadasta-platformstaging-bucket/xls-forms/jmbibndu9khbsybnnrq8eyjr.xlsx",
    "xml_form": "https://s3-us-west-2.amazonaws.com/cadasta-platformstaging-bucket/xml-forms/jmbibndu9khbsybnnrq8eyjr.xml",
    "version": 2016102523562545,
    "questions": [
        {
            "id": "s82qtgpdvmsahaaay6n5nr9r",
            "name": "start",
            "type": "ST",
            "required": false,
            "constraint": null
        },
        {
            "id": "99q3wqgcgieh32uepguqt4yg",
            "name": "end",
            "type": "EN",
            "required": false,
            "constraint": null
        },
        {
            "id": "8ngex3j9xdpz3g22r43h8tzg",
            "name": "today",
            "type": "TD",
            "required": false,
            "constraint": null
        },
        {
            "id": "m5p2sd5gj7q9nmpdb76nx3yb",
            "name": "deviceid",
            "type": "DI",
            "required": false,
            "constraint": null
        },
        {
            "id": "6xv9x6pynf7bypsxksbgk3q9",
            "name": "title",
            "label": "Standard Cadasta Questionnaire",
            "type": "NO",
            "required": false,
            "constraint": null
        },
        {
            "id": "ig37c8bhy264bfsr4dtgnjpc",
            "name": "party_type",
            "label": "Party Classification",
            "type": "S1",
            "required": false,
            "constraint": null,
            "options": [
                {
                    "id": "cwudwr5sypauajikrb8scw7s",
                    "name": "GR",
                    "label": "Group"
                },
                {
                    "id": "n6qhwrkretvqe8vdgm6k77pp",
                    "name": "IN",
                    "label": "Individual"
                },
                {
                    "id": "gyfsva9pcnrmdpv2tpgje52z",
                    "name": "CO",
                    "label": "Corporation"
                }
            ]
        },
        {
            "id": "e4xa8a5v7ag66ttc52ht7t84",
            "name": "party_name",
            "label": "Party Name",
            "type": "TX",
            "required": false,
            "constraint": null
        },
        {
            "id": "bt74mfbiuyxi9trp97iyngdx",
            "name": "location_geometry",
            "label": "Location of Parcel",
            "type": "GT",
            "required": false,
            "constraint": null
        },
        {
            "id": "p8w66irketgaav2kv73gw7m2",
            "name": "location_type",
            "label": "What is the land feature?",
            "type": "S1",
            "required": false,
            "constraint": null,
            "options": [
                {
                    "id": "te7r2hx4f7j9fvfxgrg63qs4",
                    "name": "PA",
                    "label": "Parcel"
                },
                {
                    "id": "7fpvk9rvzmq74x2zpxwb529t",
                    "name": "CB",
                    "label": "Community Boundary"
                },
                {
                    "id": "nmnh3z5jc6w94v66n8z5m6bm",
                    "name": "BU",
                    "label": "Building"
                },
                {
                    "id": "jkippjh8bhjv5vfzt7kx42uz",
                    "name": "AP",
                    "label": "Apartment"
                },
                {
                    "id": "8dbfccvtnhm9qy8fup8bn4jp",
                    "name": "PX",
                    "label": "Project Extent"
                },
                {
                    "id": "7pxej52kicvu6kwqcdmhbss2",
                    "name": "RW",
                    "label": "Right-of-way"
                },
                {
                    "id": "jtxd3ft8ht73g2qstpab4mv2",
                    "name": "NP",
                    "label": "National Park Boundary"
                },
                {
                    "id": "5ci7navpwe86ry8nyxmhb7i2",
                    "name": "MI",
                    "label": "Miscellaneous"
                }
            ]
        },
        {
            "id": "dsqbc59r5zbp8yawck6aebgx",
            "name": "location_photo",
            "label": "Photo of Parcel?",
            "type": "PH",
            "required": false,
            "constraint": null
        },
        {
            "id": "79j37fqnbppgr2m9s65z5j33",
            "name": "party_photo",
            "label": "Photo of Party?",
            "type": "PH",
            "required": false,
            "constraint": null
        },
        {
            "id": "5957hex5ypfemcdh9mht562z",
            "name": "tenure_type",
            "label": "What is the social tenure type?",
            "type": "S1",
            "required": false,
            "constraint": null,
            "options": [
                {
                    "id": "jtekxhkhnpuwen4g54vb3h4g",
                    "name": "CR",
                    "label": "Carbon Rights"
                },
                {
                    "id": "6u229bv6xm8c9iqy45i9ukjn",
                    "name": "CO",
                    "label": "Concessionary Rights"
                },
                {
                    "id": "rbd3f4gj535zke7ujpba6vz9",
                    "name": "CU",
                    "label": "Customary Rights"
                },
                {
                    "id": "5abtmp5dptzy3uhivq64fnwh",
                    "name": "EA",
                    "label": "Easement"
                },
                {
                    "id": "dbwiizgfkre2qckqp7q88duw",
                    "name": "ES",
                    "label": "Equitable Servitude"
                },
                {
                    "id": "asfarppy2ngge2u7gcy5yf22",
                    "name": "FH",
                    "label": "Freehold"
                },
                {
                    "id": "ffx6bhnc6ex7g67barmm49rr",
                    "name": "GR",
                    "label": "Grazing Rights"
                },
                {
                    "id": "e67722kak2jstbdn6tjs3gpx",
                    "name": "HR",
                    "label": "Hunting/Fishing/Harvest Rights"
                },
                {
                    "id": "pgdj5xkuxfhhr53c7sizd83s",
                    "name": "IN",
                    "label": "Indigenous Land Rights"
                },
                {
                    "id": "gku7grv39nactbnm3f2wfjnb",
                    "name": "JT",
                    "label": "Joint Tenancy"
                },
                {
                    "id": "h5jz8r7924rs3w2wa3sesep2",
                    "name": "LH",
                    "label": "Leasehold"
                },
                {
                    "id": "qmbryfvmyg2rvpd9jpbkyfwh",
                    "name": "LL",
                    "label": "Longterm leasehold"
                },
                {
                    "id": "eprbpvttnvjkfk9xkjmgm9it",
                    "name": "MR",
                    "label": "Mineral Rights"
                },
                {
                    "id": "pmywyrrq2n64ap4cvur3jmaf",
                    "name": "OC",
                    "label": "Occupancy (No Documented Rights)"
                },
                {
                    "id": "am7ujvkzybe286ay99fgc42t",
                    "name": "TN",
                    "label": "Tenancy (Documented Sub-lease)"
                },
                {
                    "id": "i3ksjj7vy4t29pgu8cnacxdf",
                    "name": "TC",
                    "label": "Tenancy in Common"
                },
                {
                    "id": "7qfbfhqsipiymz4a76t88x6r",
                    "name": "UC",
                    "label": "Undivided Co-ownership"
                },
                {
                    "id": "g9vbwrfmr9efdt8mvs95g8nf",
                    "name": "WR",
                    "label": "Water Rights"
                }
            ]
        }
    ],
    "question_groups": [
        {
            "id": "6jiu82tzk6e6qnrxnt8nyjtq",
            "name": "location_attributes",
            "label": "Location Attributes",
            "questions": []
        },
        {
            "id": "wi8uh4p8whinnz9rj4vuhuym",
            "name": "party_attributes_default",
            "label": "Default Party Attributes",
            "questions": []
        },
        {
            "id": "sha9yvbbinh29z2zttz84sa7",
            "name": "tenure_relationship_attributes",
            "label": "Tenure relationship attributes",
            "questions": []
        },
        {
            "id": "7dnfddzaktmiqcz7s3v8eazf",
            "name": "meta",
            "questions": [
                {
                    "id": "vzgtigd8wisiz2i7mhdqkeqq",
                    "name": "instanceID",
                    "type": "CA",
                    "required": false,
                    "constraint": null
                }
            ]
        }
    ],
    "md5_hash": "9022d5df877e743a6afc44e1da28e624"
}


```










### Get the Project's Current Questionnaire

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/questionnaire/
```

Returns the projects current questionnaire structure. 

**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).


**Response**

The response body contains a full [questionnaire JSON object](#user-content-example-questionnaire-json-object), including questions and question groups.















### Replace the Project's Current Questionnaire

```endpoint
PUT /api/v1/organizations/{organization_slug}/projects/{project_slug}/questionnaire/
```

The above method creates a new questionnaire for the project. Questionnaires are either created by providing a link to a XLSForm or by providing a valid Questionnaire JSON object. 

**Note:** At the moment, updating the questionnaire is only possible as long as no data has been contributed to the project. If you need to change your questionnaire, you need to [create a new project](04-project.md#user-content-create-a-new-project). 


**URL Parameters**

URL Parameter | Description
---|---
`organization_slug` | The slug provided for the organization, which can be found by locating the organization in the [list of all organzations](03-organization.md#user-content-list-organizations)
`project_slug` | The slug provided for the project, which can be found by [listing all of the projects in an organization](04-project.md#user-content-list-all-projects).


**Request Payload: XLS Form Replacement**

The request payload is a JSON object containing the following properties.

Property | Description
---|---
`xls_form` | A link to a XLSForm stored on an accessible server. 


**Request Payload: Replacement by JSON Object**

> This feature is still being developed. Documentation to be completed when it's done. 

Creating a questionnaire from a JSON object requires a full [questionnaire JSON object](#user-content-example-questionnaire-json-object) provided with the request payload. 

**Response**

The response body contains a full [questionnaire JSON object](#user-content-example-questionnaire-json-object), including questions and question groups.

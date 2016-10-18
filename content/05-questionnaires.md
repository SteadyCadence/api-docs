## Questionnaires

Property | Description
---|---
id | The questionnaire ID.
title | The questionnaire title
id_string | 
version | Time stamp when the questionnaire was last updated
questions | List of questions.
question_groups | List of question groups.

**Question Groups**

Property | Description
---|---
`id` | The ID of the question group.
`name` | Question group name, usually used to identify the group in the form. 
`label` | Question group label, usually displayed to the user.
`questions` | List of questions in the group.


**Questions**

Property | Description
---|---
`id` | The ID of the question.
`name` | Question name, usually used to identify fields in the form. 
`label` | Question label, usually displayed to the user.
`type` | The field type, one of `integer`, `decimal`, `text`, `select one`, `select all that apply`, `note`, `geopoint`, `geotrace`, `geoshape`, `date`, `time`, `dateTime`, `calculate`, `acknowledge`, `photo`, `audio`, `video`, `barcode`, `start`, `end`, `today`, `deviceid`, `subsciberid`, `simserial`or `phonenumber`.
`required` | `Boolean` idicating whether the field is required.
`constraint` | (Optional) The range of accepte values for the field.
`default` | (Optional) The default value of the field.
`hint`| (Optional) An addtional help text describing details of the field, usually displayed next to the field label.
`relevant` | (Optional) A reference to another field and corresponding value indicating when the field is displayed. 
`options` | (Optional) A list of choices, only relevant if `type` is `select one` or `select all that apply`.

**Choices**

Property | Description
---|---
`id` | The ID of the choice option.
`name` | Choice name, usually as value for the form field. 
`label` | Choice label, usually displayed to the user.

### Get the project's current questionnaire

Returns the projects current questionnaire structure. 

```endpoint
GET /api/v1/organizations/{organization_slug}/projects/{project_slug}/questionnaire/
```

**Response**

The response body contains a full [questionnaire JSON object](#questionnaires-1), including questions and question groups.

### Replace the project's current questionnaire

Creates a new questionnaire for the project. Questionnaires are either created by providing a link to a XLSForm and by providing a valid Questionnaire JSON object. 

**Note:** At the moment, updating the questionnaire is only possible as long as no data has been contributed to the project.

```endpoint
PUT /api/v1/organizations/{organization_slug}/projects/{project_slug}/questionnaire/
```

**Request payload**

The request payload is a JSON object containing the following properties.

*Creating a questionnaire from an XLSForm:*

Property | Description
---|---
`xls_form` | A link to a XLSForm stored on an accessible server. 

*Creating a questionnaire from a JSON object:*

Creating a questionnaire from a JSON object requires a full [questionnaire JSON object](#questionnaires-1) provided with the request payload. 

**Response**

The response body contains a full [questionnaire JSON object](#questionnaires-1), including questions and question groups.

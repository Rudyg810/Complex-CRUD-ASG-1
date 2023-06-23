# Assignment2
POst
endpoint: POST /api/v3/app/nudges
body:
type, title, date, starttime, endtime, description
Response: id

GET, using id
endpoint: GET /api/v3/app/nudges/:id
using id:
response:
type, title, date, starttime, endtime, description, preview

Update
endpoint: PUT /api/v3/app/nudges/:id
using id: 
body:
type, title, date, starttime, endtime, description

Delete
Endpoint: DELETE /api/v3/app/nudges/:id
using id


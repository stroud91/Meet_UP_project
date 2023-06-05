A.Schema updated with values for reference

Table Users {
  id int [pk, increment]
  username varchar
  email varchar
  password varchar
  firstName varchar
  lastName varchar
}

Table Groups {
  id int [pk, increment]
  name varchar
  about text
  city varchar
  state varchar
  organizerId int [ref: > Users.id]
  type varchar
  private boolean
}

Table Memberships {
  id int [pk, increment]
  userID int [ref: <> Users.id]
  groupID int [ref: <> Groups.id]
  status varchar 
}
Table Events {
  id int [pk, increment]
  groupID int [ref: > Venues.id]
  venueID int [ref: > Venues.id]
  name varchar
  type varchar 
  startDateTime datetime
  endDateTime datetime
  description varchar
  capacity int 
  price decimal
}

Table Images {
  id int [pk, increment]
  imageURL varchar
  imageableId int
}

Table Attendees {
  id int [pk, increment]
  userID int [ref: <> Users.id]
  eventID int [ref: <> Events.id]
  status varchar 
}

Table Venues {
  id int [pk, increment]
  address varchar
  city varchar
  state varchar
  lat decimal
  long decimal
  groupId int [ref: > Groups.id]
}


Ref: "Images"."imageableId" > "Groups"."id"

Ref: "Images"."imageableId" > "Events"."id"



B.Method/URL Planner to complete API documentation (incomplete)(untested)

USERS

1. Get the Current User

Method: GET
URL: /api/users/:userId

2. Log In a User

Method: POST
URL: /api/login

3. Sign Up a User

Method: POST
URL: /api/signup

GROUPS
1.Get all Groups

Method: GET
URL: /api/groups

2.Get all Groups joined or organized by the Current User

Method: GET
URL: /api/users/:userId/groups

3.Get details of a Group from an id

Method: GET
URL: /api/groups/:groupId

4.Create a Group

Method: POST
URL: /api/groups

5.Add an Image to a Group based on the Group's id

Method: POST
URL: /api/groups/:groupId/images

6.Edit a Group

Method: PUT
URL: /api/groups/:groupId

7.Delete a Group

Method: DELETE
URL: /api/groups/:groupId


VENUES
1.Get All Venues for a Group specified by its id

Method: GET
URL: /api/groups/:groupId/venues

2.Create a new Venue for a Group specified by its id

Method: POST
URL: /api/venues/:venueId

3.Edit a Venue specified by its id

Method: PUT
URL: /api/venues/:venueId

4.Get All Venues for a Group specified by its id

Method: GET
URL: /api/groups/:groupId/venues

5.Create a new Venue for a Group specified by its id

Method: POST
URL: /api/groups/:groupId/venues

6.Edit a Venue specified by its id

Method: PUT
URL: /api/venues/:venueId

EVENTS
1.Get all Events

Method: GET
URL: /events

2.Get all Events of a Group specified by its id

Method: GET
URL: /groups/{groupId}/events

3.Get details of an Event specified by its id

Method: GET
URL: /events/{eventId}

4.Create an Event for a Group specified by its id

Method: POST
URL: /groups/{groupId}/events

5.Add an Image to a Event based on the Event's id

Method: POST
URL: /events/{eventId}/images

6.Edit an Event specified by its id

Method: PUT
URL: /events/{eventId}

7.Delete an Event specified by its id

Method: DELETE
URL: /events/{eventId}

MEMBERSHIPS

1.To get all members of a group specified by its id:

Method: GET
URL: /groups/{groupId}/members

2.To request a new membership for a group specified by id:

Method: POST
URL: /groups/{groupId}/members

3.To change the status of a membership for a group specified by id:

Method: PUT or PATCH
URL: /groups/{groupId}/members/{memberId}

4.To delete a membership to a group specified by id:

Method: DELETE
URL: /groups/{groupId}/members/{memberId}

ATTENDEES

1.To get all attendees of an event specified by its id:

Method: GET
URL: /events/{eventId}/attendees

2.To request attendance for an event specified by id:

Method: POST
URL: /events/{eventId}/attendees

3.To change the status of an attendance for an event specified by id:

Method: PUT or PATCH
URL: /events/{eventId}/attendees/{userId}

4.To delete an attendance to an event specified by id:

Method: DELETE
URL: /events/{eventId}/attendees/{userId}

IMAGES(???)

1.To delete an image for a group:

Method: DELETE
URL: /groups/{groupId}/images/{imageId}

2.To delete an image for an event:

Method: DELETE
URL: /events/{eventId}/images/{imageId}

3.To get all events with query filters:(???)

Method: GET
URL: /events?page={page}&size={size}&name={name}&type={type}&startDate={startDate}




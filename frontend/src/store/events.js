import { csrfFetch } from "./csrf";

// Actions
const LOAD_EVENTS = "events/LOAD_EVENTS";
const ADD_EVENT = "events/ADD_EVENT";
const UPDATE_EVENT = "events/UPDATE_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";
const LOAD_GROUP_EVENTS = "events/LOAD_GROUP_EVENTS";
const LOAD_EVENT_DETAIL = "events/LOAD_EVENT_DETAIL";
const ADD_EVENT_IMAGE = "events/ADD_EVENT_IMAGE";

// Action Creators
export const loadEvents = (list) => ({
  type: LOAD_EVENTS,
  list,
});

export const addEvent = (event) => ({
  type: ADD_EVENT,
  event,
});

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  event,
});

export const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId,
});

export const loadGroupEvents = (list) => ({
  type: LOAD_GROUP_EVENTS,
  list,
});

export const loadEventDetail = (detail) => ({
  type: LOAD_EVENT_DETAIL,
  detail,
});

export const addImageToEvent = (image) => ({
  type: ADD_EVENT_IMAGE,
  image,
});

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch('/api/events/');
  const list = await response.json();
  dispatch(loadEvents(list));
}

export const createEvent = (data, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const event = await response.json();
  console.log("this is the event response ", event)
  dispatch(addEvent(event));
  return event;

};

export const editEvent = (data, eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  const event = await response.json();
  dispatch(updateEvent(event));
  return response;
};


export const removeEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    await response.json();
    dispatch(deleteEvent(eventId));
    return Promise.resolve();
  }
  return Promise.reject();
};


export const getGroupEvents = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`);
  const list = await response.json();
  console.log("list is right here", list)
  dispatch(loadGroupEvents(list));
  return list
}

export const getEventDetail = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);
  const detail = await response.json();
  dispatch(loadEventDetail(detail));
}

export const addEventImage = (eventId, image) => async dispatch => {
  const response = await csrfFetch(`/api/events/${eventId}/images`, {
      method: 'POST',
      body: JSON.stringify(image)
  });

  if (response.ok) {
      const newImage = await response.json();
      dispatch(addImageToEvent(newImage));
      return newImage;
  }
}

const initialState = { list: [], groupList: [], detail: {} };

const eventsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_EVENTS:
      return { ...state, list: action.list.Events };
    case ADD_EVENT:
      return { ...state, list: [...state.list, action.event] };
    case UPDATE_EVENT:
      return { ...state, list: state.list.map(event => event.id === action.event.id ? action.event : event) };
    case DELETE_EVENT:
      return { ...state, list: state.list.filter(event => event.id !== action.eventId) };
    case LOAD_GROUP_EVENTS:
      return { ...state, groupList: action.list.Events };
    case LOAD_EVENT_DETAIL:
      return { ...state, detail: action.detail };
      case ADD_EVENT_IMAGE:
        return {
          ...state,
          detail: {
            ...state.detail,
            eventImages: [...(state.detail.eventImages || []), action.image]
          }
        };
    default:
      return state;
  }
};

export default eventsReducer;

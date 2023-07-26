import { csrfFetch } from './csrf';

const LOAD_GROUPS = 'groups/LOAD';
const LOAD_USER_GROUPS = 'groups/LOAD_USER_GROUPS';
const LOAD_GROUP_DETAILS = 'groups/LOAD_GROUP_DETAILS';
const CREATE_GROUP = 'groups/CREATE';
const UPDATE_GROUP = 'groups/UPDATE';
const DELETE_GROUP = 'groups/DELETE';
const ADD_GROUP_IMAGE = 'groups/ADD_IMAGE';


const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  groups,
});

const loadUserGroups = (userGroups) => ({
  type: LOAD_USER_GROUPS,
  userGroups,
});

const loadGroupDetails = (groupDetails) => ({
  type: LOAD_GROUP_DETAILS,
  groupDetails,
});

const createGroup = (group) => ({
  type: CREATE_GROUP,
  group,
});

const updateGroup = (group) => ({
  type: UPDATE_GROUP,
  group,
});

const deleteGroup = (groupId) => ({
  type: DELETE_GROUP,
  groupId,
});

const addGroupImage = (image) => ({
  type: ADD_GROUP_IMAGE,
  image,
});

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch(`/api/groups`);
  const data = await response.json();
  dispatch(loadGroups(data.Groups));
};

export const getUserGroups = () => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/current`);
  const data = await response.json();
  dispatch(loadUserGroups(data.Groups));
};

export const getGroupDetails = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`);
  if (response.ok) {
  const data = await response.json();
  console.log('groupid', data)
  dispatch(loadGroupDetails(data));
  } else{
    console.log("not today!!!")
  }
};

export const createNewGroup = (group) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(group),
  });
  const data = await response.json();
  dispatch(createGroup(data));
};

export const editGroup = (group) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${group.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(group),
  });
  const data = await response.json();
  console.log(data, "")
  dispatch(updateGroup(data));
};

export const removeGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (data.message === 'Successfully deleted') {
    dispatch(deleteGroup(groupId));
  }
};

const initialState = {
  groups: [],
  userGroups: [],
  groupDetails: null,
};

export const addImageToGroup = (groupId, image) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });
  const data = await response.json();
  dispatch(addGroupImage(data));
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS:
      return { ...state, groups: action.groups };
    case LOAD_USER_GROUPS:
      return { ...state, userGroups: action.userGroups };
    case LOAD_GROUP_DETAILS:
      return { ...state, groupDetails: action.groupDetails };
    case CREATE_GROUP:
      return { ...state, groups: [...state.groups, action.group] };
    case UPDATE_GROUP:
      const updatedGroups = state.groups.map((group) =>
        group.id === action.group.id ? action.group : group
      );
      return { ...state, groups: updatedGroups };
    case DELETE_GROUP:
      const remainingGroups = state.groups.filter(
        (group) => group.id !== action.groupId
      );
      return { ...state, groups: remainingGroups };
      case ADD_GROUP_IMAGE:
      return {
        ...state,
        groupDetails: {
          ...state.groupDetails,
          GroupImages: [...state.groupDetails.GroupImages, action.image],
        },
      };
    default:
      return state;
  }
};

export default groupsReducer;

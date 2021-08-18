const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  id: null,
  isLoggedIn: false,
  currentTripId: null,
};

const REG_USER_DATA = 'REG_USER_DATA';

export const registerUserData = (input) => {
  const data = input;

  return {
    type: REG_USER_DATA,
    payload: data,
  };
};

const LOGOUT = 'LOGOUT';

export const loggingOut = () => {
  return {
    type: LOGOUT,
    payload: {},
  };
};

const SET_CURRENT_TRIP_ID = `SET_CURRENT_TRIP_ID`;

export const setCurrentTripId = (tripId) => {
  return {
    type: SET_CURRENT_TRIP_ID,
    payload: tripId,
  };
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case `${REG_USER_DATA}`:
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        id: payload.id,
        isLoggedIn: payload.isLoggedIn,
      };
    case `${LOGOUT}`:
      return {
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        id: null,
        isLoggedIn: false,
        currentTripId: null,
      };
    case `${SET_CURRENT_TRIP_ID}`:
      return {
        ...state,
        currentTripId: payload,
      };

    default:
      return state;
  }
};

export default reducer;

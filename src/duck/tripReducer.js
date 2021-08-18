const initialState = [];

const LOAD_DATA_TO_STORE = `LOAD_DATA_TO_STORE`;

export const loadDataToStore = (input) => {
  return {
    type: LOAD_DATA_TO_STORE,
    payload: input,
  };
};

const ADD_NEW_TRIP_TO_STORE = `ADD_NEW_TRIP_TO_STORE`;

export const addNewTripToStore = (input) => {
  const { trip_id, trip_name } = input;

  let data = {
    tripId: trip_id,
    tripName: trip_name,
    toDoList: [],
    peopleList: [],
  };

  return {
    type: ADD_NEW_TRIP_TO_STORE,
    payload: data,
  };
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case `${LOAD_DATA_TO_STORE}`:
      return [...payload];
    case `${ADD_NEW_TRIP_TO_STORE}`:
      return [...state, payload];
    default:
      return state;
  }
};

export default reducer;

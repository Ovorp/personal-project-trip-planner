const initialState = [
  {
    tripId: 'trip id',
    userId: 'user id',
    pictureKey: 'picture key',
    pictureDescription: 'picture Description',
  },
];

const LOAD_ALL_PICTURES_BY_TRIP = `LOAD_ALL_PICTURES_BY_TRIP`;

export const loadPicturesByTripId = (pictureArr) => {
  return {
    type: LOAD_ALL_PICTURES_BY_TRIP,
    payload: pictureArr,
  };
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case `${LOAD_ALL_PICTURES_BY_TRIP}`:
      return [...state, payload];
    default:
      return state;
  }
};

export default reducer;

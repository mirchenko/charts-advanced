import {
  REQUEST_STATIONS,
  RECEIVE_STATIONS,
  RECEIVE_STATION,
  STATION_ERROR
} from '../actions/types';


const INITIAL_STATE = {
  isFetching: false,
  stations: {}
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case REQUEST_STATIONS: {
      return { ...state, isFetching: true };
    }
    case RECEIVE_STATIONS: {
      return { ...state, isFetching: false, ...action.payload };
    }
    case RECEIVE_STATION: {
      const { name, data: { time, enabled, delta } } = action.payload;
      const piece = state.stations[name];
      const newPoints = piece.points.splice(delta.length, piece.points.length);

      return {
        ...state,
        stations:
          {
            ...state.stations,
            [name]: {
              ...piece,
              time,
              enabled,
              error: null,
              points: [...newPoints, ...delta]
            }
          }
      }
    }
    case STATION_ERROR: {
      const name = action.payload;
      const piece = state.stations[name];

      return {
        ...state,
        stations:
          {
            ...state.stations,
            [name]: {
              ...piece,
              error: true
            }
          }
      }
    }
    default: return state;
  }
};
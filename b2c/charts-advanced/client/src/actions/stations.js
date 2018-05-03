import axios from 'axios';

import {
  ROOT_URL,
  SET_CLIENT_KEY,
  REQUEST_STATIONS,
  RECEIVE_STATIONS,
  RECEIVE_STATION,
  STATION_ERROR
} from "./types";


export const fetchStations = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_STATIONS });
    const res = await axios.get(`/api/v1/init`);
    dispatch({ type: RECEIVE_STATIONS, payload: res.data });
    dispatch({ type: SET_CLIENT_KEY, payload: res.data.clientKey });
  } catch(e) {
    console.log(e);
  }
};

export const fetchStation = (clientKey, stationName, time) => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/client/${clientKey}/delta/${stationName}/since/${time}`);
    dispatch({ type: RECEIVE_STATION, payload: { data: res.data, name: stationName }});
  } catch(e) {
    dispatch({ type: STATION_ERROR, payload: stationName })
  }
};
import {
  SEND_ERROR,
  SEND_PENDING,
  SEND_SUCCESS,
  FETCH_DATA,
} from './cart.actions';
const url =
  'https://extended-song-318510-default-rtdb.firebaseio.com/product.json';

export const sendData = (product) => {
  return async (dispatch) => {
    //
    const sendRequest = async () => {
      dispatch({ type: SEND_PENDING });
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Something wrong!');
      }
    };
    //
    try {
      await sendRequest();
      dispatch({ type: SEND_SUCCESS });
    } catch (error) {
      dispatch({ type: SEND_ERROR });
    }

    //
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    //

    const sendRequest = async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
    //
    try {
      const data = await sendRequest();
      dispatch({ type: FETCH_DATA, payload: data });
    } catch (error) {
      dispatch({ type: SEND_ERROR });
    }
    //
  };
};

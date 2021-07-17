import {
  SHOW_MODAL,
  SEND_ERROR,
  SEND_PENDING,
  SEND_SUCCESS,
} from './actions/cart.actions.js';
const init = {
  isShowModal: false,
  notification: null,
};

export const mainReducer = (state = init, action) => {
  if (action.type === SHOW_MODAL) {
    return {
      ...state,
      isShowModal: !state.isShowModal,
    };
  }

  if (action.type === SEND_PENDING) {
    return {
      ...state,
      notification: {
        status: "pending",
        title: "Pending",
        message: "Sending data"
      }
    }
  }

  if (action.type === SEND_SUCCESS) {
    return {
      ...state,
      notification: {
        status: "success",
        title: "Success",
        message: "Sending data successfully"
      }
    }
  }

  if (action.type === SEND_ERROR) {
    return {
      ...state,
      notification: {
        status: "error",
        title: "Error",
        message: "Sending data fail"
      }
    }
  }
  
  
  return {...state};
};

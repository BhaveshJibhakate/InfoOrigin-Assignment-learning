

import { REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_USER } from "./actiontypes";

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
      break;
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
      break;
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
      break;
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
      break;
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
      break;
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };
      break;
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default Reducer;

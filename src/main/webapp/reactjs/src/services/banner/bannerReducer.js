import * as BT from "./bannerTypes";

const initialState = {
  banner: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_BANNER_REQUEST:
    case BT.FETCH_BANNER_REQUEST:
    case BT.UPDATE_BANNER_REQUEST:
    case BT.DELETE_BANNER_REQUEST:
    case BT.FETCH_LANGUAGES_REQUEST:
    case BT.FETCH_GENRES_REQUEST:
      return {
        ...state,
      };
    case BT.BANNER_SUCCESS:
      return {
        banner: action.payload,
        error: "",
      };
    case BT.BANNER_FAILURE:
      return {
        banner: "",
        error: action.payload,
      };
    case BT.LANGUAGES_SUCCESS:
      return {
        languages: action.payload,
        error: "",
      };
    case BT.LANGUAGES_FAILURE:
      return {
        languages: "",
        error: action.payload,
      };
    case BT.GENRES_SUCCESS:
      return {
        genres: action.payload,
        error: "",
      };
    case BT.GENRES_FAILURE:
      return {
        genres: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

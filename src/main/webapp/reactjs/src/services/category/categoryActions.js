import * as BT from "./categoryTypes";
import axios from "axios";

export const saveBanner = (banner) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_BANNER_REQUEST,
    });
    axios
      .post("http://localhost:8080/rest/banners", banner)
      .then((response) => {
        dispatch(bannerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bannerFailure(error));
      });
  };
};

export const fetchBanner = (bannerId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_BANNER_REQUEST,
    });
    axios
      .get("http://localhost:8080/rest/banners/" + bannerId)
      .then((response) => {
        dispatch(bannerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bannerFailure(error));
      });
  };
};

export const updateBanner = (banner) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_BANNER_REQUEST,
    });
    axios
      .put("http://localhost:8080/rest/banners", banner)
      .then((response) => {
        dispatch(bannerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bannerFailure(error));
      });
  };
};

export const deleteBanner = (bannerId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_BANNER_REQUEST,
    });
    axios
      .delete("http://localhost:8080/rest/banners/" + bannerId)
      .then((response) => {
        dispatch(bannerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bannerFailure(error));
      });
  };
};

const bannerSuccess = (banner) => {
  return {
    type: BT.BANNER_SUCCESS,
    payload: banner,
  };
};

const bannerFailure = (error) => {
  return {
    type: BT.BANNER_FAILURE,
    payload: error,
  };
};

export const fetchLanguages = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_LANGUAGES_REQUEST,
    });
    axios
      .get("http://localhost:8080/rest/banners/languages")
      .then((response) => {
        dispatch({
          type: BT.LANGUAGES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.LANGUAGES_FAILURE,
          payload: error,
        });
      });
  };
};

export const fetchGenres = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_GENRES_REQUEST,
    });
    axios
      .get("http://localhost:8080/rest/banners/genres")
      .then((response) => {
        dispatch({
          type: BT.GENRES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.GENRES_FAILURE,
          payload: error,
        });
      });
  };
};

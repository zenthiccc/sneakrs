import axios from "axios";
import {
  SNEAKER_DELETE_FAIL,
  SNEAKER_DELETE_REQUEST,
  SNEAKER_DELETE_SUCCESS,
  SNEAKER_DETAILS_FAIL,
  SNEAKER_DETAILS_REQUEST,
  SNEAKER_DETAILS_SUCCESS,
  SNEAKER_LIST_FAIL,
  SNEAKER_LIST_REQUEST,
  SNEAKER_LIST_SUCCESS,
  SNEAKER_CREATE_REQUEST,
  SNEAKER_CREATE_SUCCESS,
  SNEAKER_CREATE_FAIL,
  SNEAKER_UPDATE_REQUEST,
  SNEAKER_UPDATE_SUCCESS,
  SNEAKER_UPDATE_FAIL,
  SNEAKER_CREATE_REVIEW_REQUEST,
  SNEAKER_CREATE_REVIEW_SUCCESS,
  SNEAKER_CREATE_REVIEW_FAIL,
  SNEAKER_TOP_REQUEST,
  SNEAKER_TOP_SUCCESS,
  SNEAKER_TOP_FAIL,
} from "../../resources/constants/sneakerConstants";

export const listSneakers =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: SNEAKER_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/sneakers?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: SNEAKER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: SNEAKER_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listSneakerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SNEAKER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/sneakers/${id}`);

    dispatch({
      type: SNEAKER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SNEAKER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteSneaker = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SNEAKER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/sneakers/${id}`, config);

    dispatch({
      type: SNEAKER_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: SNEAKER_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createSneaker = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SNEAKER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/sneakers`, {}, config);

    dispatch({
      type: SNEAKER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SNEAKER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateSneaker = (sneaker) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SNEAKER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/sneakers/${sneaker._id}`,
      sneaker,
      config
    );

    dispatch({
      type: SNEAKER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SNEAKER_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createSneakerReview =
  (sneakerId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SNEAKER_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/sneakers/${sneakerId}/reviews`, review, config);

      dispatch({
        type: SNEAKER_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: SNEAKER_CREATE_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listTopSneakers = () => async (dispatch) => {
  try {
    dispatch({ type: SNEAKER_TOP_REQUEST });

    const { data } = await axios.get(`/api/sneakers/top`);

    dispatch({
      type: SNEAKER_TOP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SNEAKER_TOP_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

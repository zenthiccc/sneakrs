import {
  SNEAKER_CREATE_FAIL,
  SNEAKER_CREATE_REQUEST,
  SNEAKER_CREATE_RESET,
  SNEAKER_CREATE_REVIEW_FAIL,
  SNEAKER_CREATE_REVIEW_REQUEST,
  SNEAKER_CREATE_REVIEW_RESET,
  SNEAKER_CREATE_REVIEW_SUCCESS,
  SNEAKER_CREATE_SUCCESS,
  SNEAKER_DELETE_FAIL,
  SNEAKER_DELETE_REQUEST,
  SNEAKER_DELETE_SUCCESS,
  SNEAKER_DETAILS_FAIL,
  SNEAKER_DETAILS_REQUEST,
  SNEAKER_DETAILS_SUCCESS,
  SNEAKER_LIST_FAIL,
  SNEAKER_LIST_REQUEST,
  SNEAKER_LIST_SUCCESS,
  SNEAKER_TOP_FAIL,
  SNEAKER_TOP_REQUEST,
  SNEAKER_TOP_SUCCESS,
  SNEAKER_UPDATE_FAIL,
  SNEAKER_UPDATE_REQUEST,
  SNEAKER_UPDATE_RESET,
  SNEAKER_UPDATE_SUCCESS,
} from "../../resources/constants/sneakerConstants";

export const sneakerListReducer = (state = { sneakers: [] }, action) => {
  switch (action.type) {
    case SNEAKER_LIST_REQUEST:
      return { loading: true, sneakers: [] };
    case SNEAKER_LIST_SUCCESS:
      return {
        loading: false,
        sneakers: action.payload.sneakers,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case SNEAKER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sneakerDetailsReducer = (
  state = { sneaker: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SNEAKER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SNEAKER_DETAILS_SUCCESS:
      return { loading: false, sneaker: action.payload };
    case SNEAKER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sneakerDeleteReducer = (state = { sneaker: {} }, action) => {
  switch (action.type) {
    case SNEAKER_DELETE_REQUEST:
      return { loading: true };
    case SNEAKER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SNEAKER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sneakerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SNEAKER_CREATE_REQUEST:
      return { loading: true };
    case SNEAKER_CREATE_SUCCESS:
      return { loading: false, success: true, sneaker: action.payload };
    case SNEAKER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SNEAKER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const sneakerUpdateReducer = (state = { sneaker: {} }, action) => {
  switch (action.type) {
    case SNEAKER_UPDATE_REQUEST:
      return { loading: true };
    case SNEAKER_UPDATE_SUCCESS:
      return { loading: false, success: true, sneaker: action.payload };
    case SNEAKER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SNEAKER_UPDATE_RESET:
      return { sneaker: {} };
    default:
      return state;
  }
};

export const sneakerCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SNEAKER_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case SNEAKER_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case SNEAKER_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case SNEAKER_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const sneakerTopReducer = (state = { sneakers: [] }, action) => {
  switch (action.type) {
    case SNEAKER_TOP_REQUEST:
      return { loading: true, sneakers: [] };
    case SNEAKER_TOP_SUCCESS:
      return { loading: false, sneakers: action.payload };
    case SNEAKER_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

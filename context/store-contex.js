import { createContext, useReducer } from "react";

const defaultValue = {
  latLong: "",
  coffeeStoresInState: [],
  voteCount: 0,
};

export const StoreContext = createContext(defaultValue);

export const ACTION_TYPES = {
  SET_LATLONG: "SET_LATLONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
  VOTE_COUNT_INCREMENT: "VOTE_COUNT_INCREMENT",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LATLONG:
      return { ...state, latLong: action.payload };
    case ACTION_TYPES.SET_COFFEE_STORES:
      return { ...state, coffeeStoresInState: action.payload };
    case ACTION_TYPES.VOTE_COUNT_INCREMENT:
      return { ...state, voteCount: state.voteCount + 1 };
    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const initState = {
    latLong: "",
    coffeeStoresInState: [],
    voteCount: 0,
  };

  const [state, dispatch] = useReducer(storeReducer, initState);

  const dispatcher = (type, payload) => {
    if (payload) {
      dispatch({
        type,
        payload,
      });
    } else
      dispatch({
        type,
      });
  };

  const upvote = () => {
    dispatcher(ACTION_TYPES.VOTE_COUNT_INCREMENT);
  };

  const setLatLong = (latLong) => {
    dispatcher(ACTION_TYPES.SET_LATLONG, latLong);
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, upvote, setLatLong }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

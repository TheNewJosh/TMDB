import React, { createContext, useReducer, ReactNode } from 'react';

type State = {
  favorites: number[];
};

type Action = { type: 'TOGGLE_FAVORITE'; payload: number };

const initialState: State = { favorites: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return state.favorites.includes(action.payload)
        ? { ...state, favorites: state.favorites.filter(id => id !== action.payload) }
        : { ...state, favorites: [...state.favorites, action.payload] };
    default:
      return state;
  }
}

const MovieContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <MovieContext.Provider value={{ state, dispatch }}>{children}</MovieContext.Provider>;
};

export default MovieContext;

export { reducer };
import {create} from "zustand";

type State = {};

type Action = {};

// define the initial state
const initialState: State = {};

export const useGlobalStore = create<State & Action>((set) => ({
  ...initialState,
}));

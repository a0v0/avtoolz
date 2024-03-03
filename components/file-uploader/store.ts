import {create} from "zustand";

type State = {
  files: File[];
};

type Action = {
  reset: () => void;
  addFiles: (files: File[]) => void;
  updateFiles: (files: File[]) => void;
};

// define the initial state
const initialState: State = {
  files: [],
};

export const useFileUploaderStore = create<State & Action>((set) => ({
  ...initialState,
  addFiles: (files) => set((state) => ({files: [...state.files, ...files]})),

  updateFiles: (files) => set({files}),
  reset: () => {
    set(initialState);
  },
}));

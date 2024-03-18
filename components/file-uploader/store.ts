import {UniqueIdentifier} from "@dnd-kit/core";
import {create} from "zustand";

type State = {
  files: File[];
  previews: {file: File; thumb: string}[];
  items: UniqueIdentifier[];
};

type Action = {
  reset: () => void;
  addFiles: (files: File[]) => void;
  updateFiles: (files: File[]) => void;
  setItems: (items: UniqueIdentifier[]) => void;
};

// define the initial state
const initialState: State = {
  files: [],
  previews: [],
  items: [],
};

export const useFileUploaderStore = create<State & Action>((set) => ({
  ...initialState,
  addFiles: (files) => {
    // TODO: also generate pdf preview
    const previews = files.map((file) => ({file, thumb: URL.createObjectURL(file)}));
    set((state) => ({
      files: [...state.files, ...files],
      previews: [...state.previews, ...previews],
    }));
  },
  updateFiles: (files) => set({files}),
  reset: () => {
    set(initialState);
  },
  setItems: (items) => set({items}),
}));

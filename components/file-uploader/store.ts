import {create} from "zustand";

type State = {
  files: File[];
  previews: {file: File; thumb: string}[];
};

type Action = {
  reset: () => void;
  addFiles: (files: File[]) => void;
  updateFiles: (files: File[]) => void;
  getPreview: (file: File) => string;
};

// define the initial state
const initialState: State = {
  files: [],
  previews: [],
};

export const useFileUploaderStore = create<State & Action>((set) => ({
  ...initialState,
  addFiles: (files) => set((state) => ({files: [...state.files, ...files]})),
  updateFiles: (files) => set({files}),
  reset: () => {
    set(initialState);
  },
  getPreview: (file) => {
    // search in previews if not found then create a new one
    const preview = initialState.previews.find((p) => p.file === file);
    if (preview) {
      return preview.thumb;
    } else {
      if (file) {
        return URL.createObjectURL(file);
      }
      return "";
    }
  },
}));

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
  setPreview: (file: File, thumb: string) => void;
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
    set((state) => ({
      files: [...state.files, ...files],
    }));
  },
  updateFiles: (files) => set({files}),
  reset: () => {
    set(initialState);
  },
  setItems: (items) => set({items}),

  setPreview: (file, thumb) => {
    set((state) => {
      const existingPreviewIndex = state.previews.findIndex((preview) => preview.file === file);

      // Check if a preview already exists for the file
      if (existingPreviewIndex !== -1) {
        // Update the existing preview
        return {
          previews: [
            ...state.previews.slice(0, existingPreviewIndex),
            {...state.previews[existingPreviewIndex], thumb},
            ...state.previews.slice(existingPreviewIndex + 1),
          ],
        };
      } else {
        // Add a new preview for the file
        return {previews: [...state.previews, {file, thumb}]};
      }
    });
  },
}));

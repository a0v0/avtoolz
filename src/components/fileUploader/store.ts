import { create } from "zustand";

type State = {
  files: File[];
  previews: { file: File; thumb: string }[];

  error: string;
};

type Action = {
  reset: () => void;
  addFiles: (files: File[]) => void;
  setPreview: (file: File, thumb: string) => void;
  setError: (error: string) => void;
  removeFiles: (files: File[]) => void;
  updateFiles: (files: File[]) => void;
};

// define the initial state
const initialState: State = {
  files: [],
  previews: [],
  error: "",
};

export const useFileUploaderStore = create<State & Action>((set) => ({
  ...initialState,
  addFiles: (files) => {
    set((state) => ({
      files: [...state.files, ...files],
    }));
  },
  reset: () => {
    set(initialState);
  },

  setPreview: (file, thumb) => {
    set((state) => {
      const existingPreviewIndex = state.previews.findIndex(
        (preview) => preview.file === file
      );

      // Check if a preview already exists for the file
      if (existingPreviewIndex !== -1) {
        // Update the existing preview
        return {
          previews: [
            ...state.previews.slice(0, existingPreviewIndex),
            { ...state.previews[existingPreviewIndex], thumb },
            ...state.previews.slice(existingPreviewIndex + 1),
          ],
        };
      } else {
        // Add a new preview for the file
        return { previews: [...state.previews, { file, thumb }] };
      }
    });
  },
  setError: (error) => set({ error }),

  removeFiles: (files) => {
    set((state) => ({
      files: state.files.filter((file) => !files.includes(file)),
    }));
  },
  updateFiles: (files) => {
    set({ files });
  },
}));

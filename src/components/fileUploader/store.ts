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
  shiftFileToLeft: (file: File) => void;
  shiftFileToRight: (file: File) => void;
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
  shiftFileToLeft: (file) => {
    set((state) => {
      const fileIndex = state.files.findIndex((f) => f === file);

      // Check if the file exists and is not already at the first position
      if (fileIndex !== -1 && fileIndex > 0) {
        const files = [...state.files];
        // @ts-ignore
        // Swap the current file with the one to the left
        [files[fileIndex], files[fileIndex - 1]] = [
          files[fileIndex - 1],
          files[fileIndex],
        ];
        return { files };
      } else {
        // File not found or already at the first position - do nothing
        return state;
      }
    });
  },

  shiftFileToRight: (file) => {
    set((state) => {
      const fileIndex = state.files.findIndex((f) => f === file);

      // Check if the file exists and is not already at the last position
      if (fileIndex !== -1 && fileIndex < state.files.length - 1) {
        const files = [...state.files];
        // @ts-ignore
        // Swap the current file with the one to the right
        [files[fileIndex], files[fileIndex + 1]] = [
          files[fileIndex + 1],
          files[fileIndex],
        ];
        return { files };
      } else {
        // File not found or already at the last position - do nothing
        return state;
      }
    });
  },
}));

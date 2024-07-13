import { OPreviewProps } from "@/libs/previews";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  files: File[];
  metadata: OPreviewProps[];
  error: string;
};

type Action = {
  reset: () => void;
  addFiles: (files: File[]) => void;

  setError: (error: string) => void;
  removeFiles: (files: File[]) => void;
  updateFiles: (files: File[]) => void;
  shiftFileToLeft: (file: File) => void;
  shiftFileToRight: (file: File) => void;

  setPreview: (preview: OPreviewProps) => void;
};

// define the initial state
const initialState: State = {
  files: [],
  metadata: [],
  error: "",
};
export const useFileUploaderStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialState,
      addFiles: (files) => {
        set((state) => ({
          files: [...state.files, ...files],
        }));
      },
      reset: () => {
        set(initialState);
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

      setPreview: (previewProp) => {
        set((state) => {
          const existingPreviewIndex = state.metadata.findIndex(
            (preview) => preview.file === previewProp.file
          );

          // Check if a preview already exists for the file
          if (existingPreviewIndex !== -1) {
            // Update the existing preview
            return {
              metadata: [
                ...state.metadata.slice(0, existingPreviewIndex),
                { ...state.metadata[existingPreviewIndex], ...previewProp },
                ...state.metadata.slice(existingPreviewIndex + 1),
              ],
            };
          } else {
            // Add a new preview for the file
            return { metadata: [...state.metadata, previewProp] };
          }
        });
      },
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
// export const useFileUploaderStore = create<State & Action>(
//   persist(
//     (set) => ({

//     }),
//     {
//       name: "file-uploader",
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );

import { FileError } from "react-dropzone";

export interface FileUploadError extends FileError {
  title: string;
}

export type ErrorCodes = "invalidFile" | "unknown";
export const XErrors: Record<ErrorCodes, FileUploadError> = {
  invalidFile: {
    title: "Invalid File",
    message:
      "One or more of the files you have selected are not supported, invalid, or corrupted.",
    code: "invalid-file",
  },
  unknown: {
    title: "Unknown Error",
    message: "An unknown error occurred while processing your files.",
    code: "unknown",
  },
};

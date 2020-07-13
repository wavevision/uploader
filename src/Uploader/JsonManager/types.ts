export interface JsonFile {
  id: string;
  contentType: string | null;
  originalName: string;
  size: number;
  uploadedAt?: string;
  urls?: {
    download?: string;
    preview?: string;
  };
}

export type JsonFiles = JsonFile[];

export interface JsonData {
  defaultFiles: JsonFiles;
  deletedFiles: JsonFiles;
  uploadedFiles: JsonFiles;
}

export interface JsonDataManager {
  addUploadedFile: (file: JsonFile) => JsonData;
  deleteFile: (file: JsonFile) => JsonData;
  getData: () => JsonData;
  getDefaultFiles: () => JsonFiles;
  getUploadedFiles: () => JsonFiles;
  getValue: () => JsonFiles | null;
}

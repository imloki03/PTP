export interface MediaFile {
  id: number;
  journeyId: number;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileType: string;
  storageType: string;
  url: string;
  deleted: boolean;
}

export interface JourneyImageItem {
  clientId: string;
  serverId?: number;
  file?: File;
  sourceUrl: string;
  thumbnailUrl?: string;
  fileName: string;
  status: 'local' | 'uploading' | 'uploaded' | 'failed' | 'deleting';
  errorMessage?: string;
}

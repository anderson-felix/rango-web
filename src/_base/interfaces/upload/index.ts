/** Interfaces and Types */

export interface IPreSignedUploadResponse {
  path: string;
  link: string;
}

export const bucketFolders = <const>['store'];
export type BucketFolders = (typeof bucketFolders)[number];

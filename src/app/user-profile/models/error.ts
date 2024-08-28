export interface Error {
  message: string;
  reason: 'invalidUniqueKey' | 'invalidAccessToken' | '';
}

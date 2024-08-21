export interface IRoute {
  id: number;
  path: number[];
  carriages: string[];
}

export type GetRoutesResponse = IRoute[];

export interface GetRoutesRequest {}

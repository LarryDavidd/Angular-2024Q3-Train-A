// Routes
export interface IRoute {
  id: number;
  path: number[];
  carriages: string[];
}

export type GetRoutesResponse = IRoute[];

export interface GetRoutesRequest {}

export interface CreateRouteRequest {
  path: number[];
  carriages: string[];
}

export interface CreateRouteSuccessResponse {
  id: number;
}

export interface CreateRouteErrorResponse {
  error: {
    message: string;
    reason: string;
  };
}

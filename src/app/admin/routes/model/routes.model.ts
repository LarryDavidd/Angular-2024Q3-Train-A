// Routes

// Get
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

// Create
export interface CreateRouteSuccessResponse {
  id: number;
}

export interface CreateRouteErrorResponse {
  error: {
    message: string;
    reason: string;
  };
}

// Update
export interface UpdateRouteRequest {
  path: number[];
  carriages: string[];
}

export interface UpdateRouteSuccessResponse {
  id: number;
}

export interface UpdateRouteErrorResponse {
  error: {
    message: string;
    reason: string;
  };
}

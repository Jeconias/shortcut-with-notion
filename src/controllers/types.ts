import { Request as ExpressRequest, Response } from 'express';

export type Request = ExpressRequest;

export interface DefaultResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface DefaultErrorResponse
  extends Omit<DefaultResponse, 'code' | 'data'> {
  code?: number;
  data?: any;
}
export interface DefaultSuccessResponse extends Omit<DefaultResponse, 'code'> {
  code?: number;
}

export type NextFunction<T = DefaultErrorResponse> = (err?: T) => void;

export type RequestHandlerAPI = (
  req: Request,
  resp: Response,
  next: NextFunction
) => void;

export type ErrorRequestHandlerAPI = (
  err: DefaultErrorResponse,
  req: Request,
  resp: Response,
  next: NextFunction
) => void;

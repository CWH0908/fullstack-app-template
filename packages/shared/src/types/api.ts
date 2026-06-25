import type { ErrorCode } from "../constants/error-code";

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: {
    code: ErrorCode | string;
    message: string;
    details?: unknown;
  };
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

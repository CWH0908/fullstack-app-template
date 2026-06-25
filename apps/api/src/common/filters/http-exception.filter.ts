import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { ERROR_CODES } from "@template/shared";
import type { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : undefined;

    const message =
      typeof exceptionResponse === "object" && exceptionResponse && "message" in exceptionResponse
        ? String((exceptionResponse as { message: unknown }).message)
        : exception instanceof Error
          ? exception.message
          : "服务异常";

    response.status(status).json({
      success: false,
      error: {
        code: status === HttpStatus.UNAUTHORIZED ? ERROR_CODES.UNAUTHORIZED : ERROR_CODES.INTERNAL_ERROR,
        message
      }
    });
  }
}

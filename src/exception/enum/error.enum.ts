import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  NOT_FOUND_CONTENT = 'not_found_content',
  INVALID_MBTI_TYPE = 'invalid_mbti_type',
  DATABASE_CONNECTION_ERROR = 'database_connection_error',
  INTERNAL_SERVER_ERROR = 'internal_server_error',
  VALIDATION_ERROR = 'validation_error',
  NOT_FOUND_USER = 'not_found_user',
  NOT_FOUND_PLACE = 'not_found_place',
}

export const ErrorMessage: { [key in ErrorCode]: string } = {
  [ErrorCode.NOT_FOUND_CONTENT]: 'Not found content',
  [ErrorCode.INVALID_MBTI_TYPE]: 'Invalid MBTI type provided',
  [ErrorCode.DATABASE_CONNECTION_ERROR]: 'Database connection failed',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error occurred',
  [ErrorCode.VALIDATION_ERROR]: 'Request validation failed',
  [ErrorCode.NOT_FOUND_USER]: 'User not found',
  [ErrorCode.NOT_FOUND_PLACE]: 'Place not found',
};

export const ErrorStatus: { [key in ErrorCode]: HttpStatus } = {
  [ErrorCode.NOT_FOUND_CONTENT]: HttpStatus.NOT_FOUND,
  [ErrorCode.INVALID_MBTI_TYPE]: HttpStatus.BAD_REQUEST,
  [ErrorCode.DATABASE_CONNECTION_ERROR]: HttpStatus.SERVICE_UNAVAILABLE,
  [ErrorCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ErrorCode.VALIDATION_ERROR]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ErrorCode.NOT_FOUND_USER]: HttpStatus.NOT_FOUND,
  [ErrorCode.NOT_FOUND_PLACE]: HttpStatus.NOT_FOUND,
};

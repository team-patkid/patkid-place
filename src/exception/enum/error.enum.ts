import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  NOT_FOUND_CONTENT = 'not_found_content',
}

export const ErrorMessage: { [key in ErrorCode]: string } = {
  [ErrorCode.NOT_FOUND_CONTENT]: 'Not found content',
};

export const ErrorStatus: { [key in ErrorCode]: HttpStatus } = {
  [ErrorCode.NOT_FOUND_CONTENT]: HttpStatus.NOT_FOUND,
};

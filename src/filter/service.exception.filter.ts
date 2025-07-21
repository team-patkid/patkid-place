import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServiceError } from 'src/exception/service.error';
import { Response } from 'express';
import { ReportProvider } from 'src/log/reportProvider';

@Catch(ServiceError)
export class ServiceExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const code = exception.getCode();
    const message = exception.message;
    const status = exception.getStstus();

    ReportProvider.reportWithLog({
      ctx: {
        message,
        code,
      },
      error: exception,
      method: 'ServiceExceptionFilter',
    });

    response.status(status).json({
      return: false,
      code,
      message,
    });
  }
}

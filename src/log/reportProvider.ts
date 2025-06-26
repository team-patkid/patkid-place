import { LogProvider } from './logProvider';
import rTracer from 'cls-rtracer';

export class ReportProvider {
  static reportWithLog(data: {
    ctx?: Record<string, any>;
    error?: any;
    method: string;
  }) {
    LogProvider.error(data.ctx ?? {}, data.method);
  }
}

import 'reflect-metadata';

// Mock external dependencies
jest.mock('cls-rtracer', () => ({
  expressMiddleware: jest.fn(() => (req: any, res: any, next: any) => next()),
  id: jest.fn(() => 'test-request-id'),
}));

jest.mock('moment-timezone', () => ({
  tz: {
    setDefault: jest.fn(),
  },
}));

// Global test utilities
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
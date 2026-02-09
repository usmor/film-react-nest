import { Test } from '@nestjs/testing';
import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;
  let logSpy;
  let errorSpy;
  const message = 'Test message';
  const errorMessage = 'Test error message'

  beforeEach(async () => {
    logger = new DevLogger();
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

   afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should log a basic message', () => {

    logger.log(message);
    expect(logSpy).toHaveBeenLastCalledWith(message)
  });

  it('should log an error', () => {
    logger.error(errorMessage);
    expect(errorSpy).toHaveBeenLastCalledWith(errorMessage)
  })
});
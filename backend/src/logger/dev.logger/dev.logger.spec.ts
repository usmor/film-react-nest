import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;
  const message = 'Test message';
  const errorMessage = 'Test error message'

  beforeEach(async () => {
    logger = new DevLogger();
  });

  it('should log a basic message', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log(message);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenLastCalledWith(message)

    logSpy.mockRestore()
  });

  it('should log an error', () => {
    const errorSpy = jest.spyOn(logger, 'error').mockImplementation();

    logger.log(errorMessage);

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenLastCalledWith(errorMessage)

    errorSpy.mockRestore()
  })
});

import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
    const message = 'Test message';
    const errorMessage = 'Test error message';
    const params = ['param1', 'param2'];
    let logSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;
  
    beforeEach(async () => {
      logger = new TskvLogger();
      logSpy = jest.spyOn(console, 'log').mockImplementation();
      errorSpy = jest.spyOn(console, 'error').mockImplementation();
    });
  
    describe('log', () => {
      it('should log a basic message WITHOUT params', () => {
        logger.log(message);
  
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(
         /^level=log\tmessage=Test message\toptionalParams=\ttimestamp=.*/
        ));
      });
  
      it('should log a basic message WITH params', () => {
        logger.log(message, ...params);
  
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(
          /^level=log\tmessage=Test message\toptionalParams=\["param1","param2"\]\ttimestamp=.*/
        ));
      });
    });
  
    describe('error', () => {
      it('should log an error message WITHOUT params', () => {
        logger.error(errorMessage);
  
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith(expect.stringMatching(
          /^level=error\tmessage=Test error message\toptionalParams=\ttimestamp=.*/
        ));
      });
  
      it('should log an error message WITH params', () => {
        logger.error(errorMessage, ...params);
  
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith(expect.stringMatching(
          /^level=error\tmessage=Test error message\toptionalParams=\["param1","param2"\]\ttimestamp=.*/
        ));
      });
    });
});

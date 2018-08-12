import GithubOrganisation from '@/services/GithubOrganisation';

describe('GitHub Organisation service', () => {
  describe('Class instatiation validation', () => {
    it('should resolve to a error given a non/blank string ', () => {
      const expectedError = new TypeError('Class requires a non-empty string, to be passed on creation');
      expect(() => new GithubOrganisation(false)).toThrowError(expectedError);
      expect(() => new GithubOrganisation('')).toThrowError(expectedError);
      expect(() => new GithubOrganisation()).toThrowError(expectedError);
    });
  });
  describe('Vaild Class instatiation', () => {
    const testClass = new GithubOrganisation('sample');
    describe('getRepositories Method', () => {
      it('should retrive all avaible repos if the request is vaild (exists on github)', async () => {
        const expectedResult = { Id: '123', full_name: 'nodejs/http-parser' };
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResult),
        }));
        const data = await testClass.getRepositories();
        expect(data).toEqual(expectedResult);
      });
      it('should resolve to a error if the request is invaild (github issues)', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(({
          ok: false,
          statusText: 'sample error',
        })));
        await expect(testClass.getRepositories()).rejects.toEqual(new Error('sample error'));
      });
      it('should resolve to a error if the request is invaild (internal issue eg no network)', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('sample error')));
        await expect(testClass.getRepositories()).rejects.toEqual(new Error('sample error'));
      });
    });
    describe('getRepositoryIssues Method', () => {
      it('should resolve to a type error given a non/blank string argument', async () => {
        const expected = new TypeError('Fn requires a non-empty string');
        await expect(testClass.getRepositoryIssues(false)).rejects.toEqual(expected);
        await expect(testClass.getRepositoryIssues('')).rejects.toEqual(expected);
        await expect(testClass.getRepositoryIssues()).rejects.toEqual(expected);
      });
      it('should retrive all avaible repos if the request is vaild (exists on github)', async () => {
        const expectedResult = [{ Id: '123', full_name: 'nodejs/http-parser' }];
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResult),
        }));
        const data = await testClass.getRepositoryIssues('sample');
        expect(data).toEqual(expectedResult);
      });
      it('should resolve to a error if the request is invaild (github issues)', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(({
          ok: false,
          statusText: 'not-found',
        })));
        await expect(testClass.getRepositoryIssues('sample')).rejects.toEqual(new Error('not-found'));
      });
      it('should resolve to a error if the request is invaild (internal issue eg no network)', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('sample error')));
        await expect(testClass.getRepositoryIssues('sample')).rejects.toEqual(new Error('sample error'));
      });
    });
  });
});

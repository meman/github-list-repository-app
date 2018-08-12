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
});

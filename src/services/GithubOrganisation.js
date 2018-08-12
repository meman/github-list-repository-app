class GithubOrganisation {
  constructor(name) {
    if (!name || typeof name !== 'string') throw new TypeError('Class requires a non-empty string, to be passed on creation');
  }
}

export default GithubOrganisation;

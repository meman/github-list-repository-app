import checkStatus from '@/util/checkStatus';

// Private
const baseUrl = 'https://api.github.com';

class GithubOrganisation {
  constructor(name) {
    if (!name || typeof name !== 'string') throw new TypeError('Class requires a non-empty string, to be passed on creation');
    this.organisation = name;
  }
  async getRepositories() {
    const url = `${baseUrl}/orgs/${this.organisation}/repos`;
    const rawResponse = checkStatus(await fetch(url));
    return rawResponse.json();
  }
}

export default GithubOrganisation;

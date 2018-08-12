import App from '@/App.vue';
import RepositoryList from '@/components/RepositoryList.vue';
import { mount } from '@vue/test-utils';
import GithubOrganisation from '@/services/GithubOrganisation';


GithubOrganisation.prototype.getRepositories = jest.fn().mockImplementation(() => [{ Id: '123', full_name: 'nodejs/http-parser' }]);
GithubOrganisation.prototype.getRepositoryIssues = jest.fn().mockImplementation(() => [{ Id: '123', title: 'nodejs/http-parser' }]);

describe('App Component', () => {
  const wrapper = mount(App);
  it('should on mounted have getRepositories', () => {
    expect(GithubOrganisation.prototype.getRepositories).toHaveBeenCalledTimes(1);
  });
  it('should on repo clicked try and get the getRepositoryIssues', () => {
    wrapper.find(RepositoryList).find('li').trigger('click');
    expect(GithubOrganisation.prototype.getRepositoryIssues).toHaveBeenCalledTimes(1);
  });
});

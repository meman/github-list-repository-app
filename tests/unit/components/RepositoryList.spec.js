import { mount } from '@vue/test-utils';
import RepositoryList from '@/components/RepositoryList.vue';

describe('RepositoryList Component', () => {
  it('renders a list', () => {
    const wrapper = mount(RepositoryList, { propsData: { isLoading: false, repositories: [] } });
    expect(wrapper.contains('ul')).toBe(true);
  });
  it('should when data is being requested show a loading li', () => {
    const wrapper = mount(RepositoryList, { propsData: { isLoading: true, repositories: [] } });
    expect(wrapper.find('li').text()).toBe('loading...');
  });
  it('should when repositories are loaded list them showing the name of each', () => {
    const expectedRepos = [{ name: 'sample1' }, { name: 'sample2' }];
    const propsData = { isLoading: false, repositories: expectedRepos };
    const wrapper = mount(RepositoryList, { propsData });
    expect(wrapper.findAll('li').length).toBe(2);
    expect(wrapper.findAll('li').at(1).text).not.toBe('loading...');
  });
  it('should when a repository is clicked emit a click-repository event with the name of the repo and its position', () => {
    const expectedRepos = [{ name: 'sample1' }, { name: 'sample2' }, { name: 'sample3' }];
    const propsData = { isLoading: false, repositories: expectedRepos };
    const wrapper = mount(RepositoryList, { propsData });
    wrapper.findAll('li').at(1).trigger('click');
    expect(wrapper.emitted()['click-repository']).toBeTruthy();
    expect(wrapper.emitted()['click-repository'][0]).toEqual(['sample2', 1]);
  });
  it('should when loading issues show the name of the repository and a nest li indicating loading(intermediate loading state)', () => {
    const expectedRepos = [{ name: 'sample1', isLoading: true }];
    const propsData = { isLoading: false, repositories: expectedRepos };
    const wrapper = mount(RepositoryList, { propsData });
    const uls = wrapper.findAll('ul');

    expect(uls.length).toBe(2);
    // checking inital uls li has retained the name of the repo
    expect(uls.at(0).find('li').element.childNodes[0].nodeValue.trim()).toBe('sample1');
    expect(uls.at(1).text()).toBe('loading...');
  });
  it('should when issue are loaded show them under the repo as nested items, by title', () => {
    const issues = [{ title: 'issue1' }, { title: 'issue2' }];
    const expectedRepos = [{ name: 'sample1', isLoading: false, issues }];
    const propsData = { isLoading: false, repositories: expectedRepos };
    const wrapper = mount(RepositoryList, { propsData });
    const uls = wrapper.findAll('ul');

    expect(uls.length).toBe(2);
    // checking inital uls li has retained the name of the repo
    expect(uls.at(0).find('li').element.childNodes[0].nodeValue.trim()).toBe('sample1');
    expect(uls.at(1).findAll('li').length).toBe(2);
  });
});

<template>
  <div id='app'>
    <repository-list :is-loading='isLoading' :repositories='repositories'
      @click-repository='getRepoIssues' />
  </div>
</template>

<script>
import GithubOrganisation from '@/services/GithubOrganisation';
import RepositoryList from '@/components/RepositoryList.vue';

const nodejs = new GithubOrganisation('nodejs');

export default {
  name: 'app',
  components: {
    RepositoryList,
  },
  data() {
    return {
      isLoading: true,
      repositories: [],
    };
  },
  methods: {
    async getRepoIssues(name, index) {
      if (this.repositories[index].issues) return;
      this.$set(this.repositories[index], 'isLoading', true);
      try {
        const issues = await nodejs.getRepositoryIssues(name);
        this.$set(this.repositories[index], 'isLoading', false);
        this.$set(this.repositories[index], 'issues', issues);
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    },
  },
  async mounted() {
    try {
      const repos = await nodejs.getRepositories();
      this.repositories = repos;
      this.isLoading = false;
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  },
};
</script>

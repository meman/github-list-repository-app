<template>
  <ul>
    <li v-if='isLoading'>loading...</li>
    <li v-else v-for='(repository, key) in repositories' :key='key'
      @click='emitClick(repository.name, key)'>
      {{repository.name}}
      <template v-if='repository.isLoading'>
        <ul><li>loading...</li></ul>
      </template>
      <template v-else-if='repository.issues && repository.issues.length'>
        <ul>
          <li v-for='(issue, key) in repository.issues' :key='key'>{{issue.title}}</li>
        </ul>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'repository-list',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    repositories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    emitClick(name, position) {
      this.$emit('click-repository', name, position);
    },
  },
};
</script>

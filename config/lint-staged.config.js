module.exports = {
  linters: {
    '**/*.+(js|md|ts|css|sass|less|graphql|yml|yaml|scss|json|vue|jsx|mdx)': [
      'eslint --fix',
      'prettier --write',
      'jest --findRelatedTests',
      'git add',
    ],
  },
};

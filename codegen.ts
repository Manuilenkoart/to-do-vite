import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3002/graphql',
  documents: ['src/api/graphql/*.graphql'],
  generates: {
    'src/api/graphql/types/': {
      preset: 'client',
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;

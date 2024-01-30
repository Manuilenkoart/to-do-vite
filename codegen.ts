import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3002/graphql',
  documents: ['src/api/graphql/*.graphql'],
  generates: {
    'src/api/graphql/generatedTypes.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3002/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/api/graphql/generated.ts': {
      plugins: ['typescript'],
      config: {
        skipTypename: true,
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '/api/graphql/generated.ts',
        folder: '../hooks',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
  hooks: { afterAllFileWrite: ['eslint --fix'] },
};

export default config;

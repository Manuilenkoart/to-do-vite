import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3002/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/api/graphql/generatedTypes.ts': {
      plugins: ['typescript'],
      config: {
        skipTypename: true,
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generatedTypes.ts',
        baseTypesPath: '/api/graphql/generatedTypes.ts',
        folder: '../hooks',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
  hooks: { afterAllFileWrite: ['eslint --fix'] },
};

export default config;

# Demo
- [App](https://to-do-vite.vercel.app/)
- [Api REST](https://github.com/Manuilenkoart/to-do-vite-api)
- [Api Graphql](https://github.com/Manuilenkoart/to-do-api-graphql)

# Tech stack (branch)
- main: react-router-dom > v6.4, redux (EntityAdapter), thunk, axios, formik + yup, styled-components, unit test: vitest, e2e: cypress (REST mock), typescript (eslint + prettier), vite

- apollo: react-router-dom > v6.4, apollo graphql, formik + yup, styled-components, unit test: vitest, e2e: cypress (graphql mock), typescript (eslint + prettier), vite

# Github actions
- ci: lint, test, e2e, build
- cd: vercel

# Starting a project:
Adding files for development with variable: VITE_API_URL
- local: .env.dev
- production: .env.production

# References
- https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/

# Sorting your imports with ESLint
- https://dev.to/julioxavierr/sorting-your-imports-with-eslint-3ped

# Aliasing paths in Vite projects w/ TypeScript
- https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo

# Husky and Lint-Staged
- https://dev.to/truemark/run-eslint-on-git-commit-with-husky-and-lint-staged-in-reactjs-4oeb

# Display typescript error to terminal
- https://vitejs.dev/guide/features.html#transpile-only

# Vercel setup CD
- https://www.youtube.com/watch?v=FHVaWZjWec4&t=7s

# Vercel deploy
- https://vercel.com/guides/how-can-i-use-github-actions-with-vercel

# Cypress
- https://docs.cypress.io/guides/references/best-practices

# Cypress ci start local server
- https://github.com/cypress-io/github-action?tab=readme-ov-file#start-server
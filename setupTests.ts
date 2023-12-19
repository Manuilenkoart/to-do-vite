/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

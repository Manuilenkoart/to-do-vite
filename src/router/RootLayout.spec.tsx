import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithRouter } from '@/test';

import RootLayout from './RootLayout';

describe('<RootLayout />', () => {
  describe('renders correctly', () => {
    it('has <Header />', () => {
      renderWithRouter(<RootLayout />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('has render main', () => {
      renderWithRouter(<RootLayout />);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
  });
});

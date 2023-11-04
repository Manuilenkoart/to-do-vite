import { screen } from '@testing-library/react';

import { renderWithRouter } from '@/test';

import Header from './Header';

describe('<Header />', () => {
  it('renders correctly', () => {
    renderWithRouter(<Header />);

    const link = screen.getByRole('link');
    const logo = screen.getByRole('img');
    const text = screen.getByText(/just todo it/i);

    expect(link).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAccessibleName(/logo/i);
    expect(text).toBeInTheDocument();
  });
});

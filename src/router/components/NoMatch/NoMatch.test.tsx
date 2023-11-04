import { screen } from '@testing-library/react';

import { renderWithRouter } from '@/test';

import NoMatch from './NoMatch';

describe('<NoMatch />', () => {
  it('renders correctly', () => {
    renderWithRouter(<NoMatch />, { route: '/some/bad/route' });

    const text = screen.getAllByText('4');
    const icon = screen.getByLabelText(/meh/i);
    const title = screen.getByRole('heading', { name: /not found/i });
    const link = screen.getByRole('link', { name: /go to home page/i });

    expect(text).toHaveLength(2);
    expect(icon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});

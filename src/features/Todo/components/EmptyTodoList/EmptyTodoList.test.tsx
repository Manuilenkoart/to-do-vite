import { render, screen } from '@testing-library/react';

import EmptyTodoList from './EmptyTodoList';

describe('<EmptyTodoList />', () => {
  it('renders correctly', () => {
    render(<EmptyTodoList />);

    const icons = screen.getAllByLabelText(/arrow-up/i);
    const title = screen.getByText(/does not have any todo/i);

    expect(title).toBeInTheDocument();
    expect(icons).toHaveLength(3);
  });
});

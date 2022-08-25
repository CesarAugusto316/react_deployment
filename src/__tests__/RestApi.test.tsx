import '@testing-library/jest-dom';
import { render, screen} from '@testing-library/react';
import { App } from '../App';


jest.mock('axios');

describe('RestApi', () => {

  beforeEach(() => {
    render(<App />);
  });

  it('should not show "Welcome" on start', () => {
    expect(screen
      .queryByRole('heading', { name: /welcome/i }))
      .not.toBeInTheDocument();

    expect(screen
      .getByRole('form'))
      .toBeInTheDocument();
  });
});

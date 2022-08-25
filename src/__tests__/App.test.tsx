import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { App } from '../App';


describe('<App/>', () => {
  it('should render <myForm/> inside <main/>', () => {
    render(<App />);

    expect(screen
      .getByRole('main'))
      .toBeInTheDocument();

    expect(screen
      .getByRole('main'))
      .toContainElement(screen.getByRole('form'));
  });
});

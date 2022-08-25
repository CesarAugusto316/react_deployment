import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyForm, validationSchema } from '../components/myForm/MyForm';


describe('<MyForm/>', () => {
  const handleSubmit = jest.fn();

  beforeEach(() => {
    render(<MyForm onSubmit={handleSubmit} />);
    handleSubmit.mockClear();
  });

  it('should have empty "inputs" on start', () => {
    expect(screen
      .getByRole('form'))
      .toHaveFormValues({
        discordId: '',
        email: '',
      });
  });

  it('should disable submit "button" on start', () => {
    expect(screen
      .getByRole('button', { name: /submit/i }))
      .toBeDisabled();
  });

  it('should enable "button" when form inputs are valid', async () => {
    const test = {
      email: 'riveramirandac@gmail.com',
      discordId: '890827972238528572',
    };
    const user = userEvent.setup();

    const validTest = await validationSchema.validate(test);
    await user.type(screen
      .getByPlaceholderText(/discordid/i), validTest.discordId);

    await user.type(screen
      .getByPlaceholderText(/email/i), validTest.email);

    expect(screen
      .getByRole('button', { name: /submit/i }))
      .toBeEnabled();
  });

  it('should fail when validating with wrong data', async () => {
    const inputTest = {
      email: 'rivera',
      discordId: '890827972',
    };
    const user = userEvent.setup();
    
    await user.type(screen
      .getByPlaceholderText(/discordid/i), inputTest.discordId);

    await user.type(screen
      .getByPlaceholderText(/email/i), inputTest.email);

    // not Valid -> button "disabled"
    expect(screen
      .getByRole('button', { name: /submit/i }))
      .toBeDisabled();

    await user.click(screen
      .getByRole('button', { name: /submit/i }));

    expect(handleSubmit).not.toHaveBeenCalledWith(inputTest);
    expect(handleSubmit).toBeCalledTimes(0);

    // didn't trigger handleSubmit when "button" was clicked, so:
    expect(screen
      .getByRole('button', { name: /submit/i }))
      .toBeDisabled();
  });
});

import { FC, useState } from 'react';
import axios from 'axios';
import { MyForm, FormValues } from './components/myForm/MyForm';


export const App: FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit = (values: FormValues) => {
    axios.post(`https://ms-discord-upy5mhs63a-rj.a.run.app/auth/login`, values)
      .then(({ data }) => {
        console.log(data.token, 'data fetched from API');
        setIsLogged(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div id="app" data-theme="dark">
      <section className="section">
        <main className="main">

          {isLogged ? <h1 className="form__heading">Welcome, You are logged in!</h1>
            : <MyForm onSubmit={handleSubmit} />}

        </main>
      </section>
    </div>
  );
};

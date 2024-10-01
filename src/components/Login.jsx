import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const initialForm = {
  email: '',
  password: '',
};

function Login(props) {
  const [formData, setFormData] = useState(initialForm);
  const { setUser } = props;
  const history = useHistory();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    axios
      .post('https://reqres.in/api/user', formData)
      .then((response) => {
        setUser(response.data);
        setFormData(initialForm);
        history.push('/aboutus');
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email.toLowerCase()}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="pass">Password:</label>
        <input
          type="password"
          id="pass"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">Giriş</button>
      </div>
    </form>
  );
}

export default Login;

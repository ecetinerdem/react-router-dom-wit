import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const initialForm = {
  email: '',
  password: '',
  departman: '',
  diller: [],
  terms: false,
  amac: '',
};

const initialErrors = {
  email: '',
  password: '',
  departman: '',
  terms: '',
  diller: '',
  amac: '',
};

const errorMessages = {
  email: 'Geçerli bir email adresi yazınız',
  password:
    'Strong password giriniz. En az 8 karakter, en az 1 büyük, en az 1 küçük harf içermeli',
  departman: 'Lütfen departmanınızı seçiniz',
  diller: 'En az 1 dil seçiniz',
  terms: 'Kayıt olabilmek için anlaşma şartlarını kabul etmelisiniz.',
  amac: 'Amacınızı kısaca açıklayınız.',
};

function Register(props) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const { setUser } = props;
  const history = useHistory();

  /*
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  }
  */

  useEffect(() => {
    //form valid mi kontrolü
    if (
      formData.email.length > 10 &&
      validateEmail(formData.email) &&
      formData.password.length >= 8 &&
      formData.password.toLowerCase() !== formData.password &&
      formData.password.toUpperCase() !== formData.password &&
      formData.amac.length > 10 &&
      formData.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function handleInputChange(event) {
    let { name, value, type, checked } = event.target;
    value = name === 'terms' ? checked : value;

    //validation kuralları buraya
    if (name === 'email') {
      if (value.length > 10 && validateEmail(value)) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: errorMessages.email });
      }
    }

    if (name === 'password') {
      if (
        value.length >= 8 &&
        value.toLowerCase() !== value &&
        value.toUpperCase() !== value
      ) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: errorMessages.password });
      }
    }

    if (name === 'amac') {
      if (value.length > 10) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: errorMessages.amac });
      }
    }

    if (name === 'terms') {
      if (value) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: errorMessages.terms });
      }
    }

    //state'i güncelle
    if (name === 'diller') {
      if (formData.diller.includes(value)) {
        setFormData({
          ...formData,
          [name]: formData.diller.filter((dil) => dil !== value),
        });
      } else {
        setFormData({
          ...formData,
          [name]: [...formData.diller, value],
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    axios
      .post('https://reqres.in/api/user', formData)
      .then((response) => {
        setUser(response.data);
        setFormData(initialForm);
        history.push('/');
      })
      .catch((error) => console.log(error.message));
  }

  console.log(formData);

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Register</h1>
      <div>
        <label htmlFor="email" className="bold-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email.toLowerCase()}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="pass" className="bold-label">
          Password:
        </label>
        <input
          type="password"
          id="pass"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <div className="multiple-area">
        <h3>Departman seçiniz:</h3>
        <label>
          <input
            type="radio"
            name="departman"
            value="HR"
            onChange={handleInputChange}
            checked={formData.departman === 'HR'}
          />{' '}
          HR
        </label>
        <label>
          <input
            type="radio"
            name="departman"
            value="IT"
            onChange={handleInputChange}
            checked={formData.departman === 'IT'}
          />{' '}
          IT
        </label>
        <label>
          <input
            type="radio"
            name="departman"
            value="Marketing"
            onChange={handleInputChange}
            checked={formData.departman === 'Marketing'}
          />{' '}
          Marketing
        </label>
        {errors.departman && (
          <p className="error-message">{errors.departman}</p>
        )}
      </div>
      <div className="multiple-area">
        <h3>Bildiğiniz diller:</h3>
        <label>
          <input
            type="checkbox"
            name="diller"
            value="İngilizce"
            onChange={handleInputChange}
            checked={formData.diller.includes('İngilizce')}
          />{' '}
          İngilizce
        </label>
        <label>
          <input
            type="checkbox"
            name="diller"
            value="Almanca"
            onChange={handleInputChange}
            checked={formData.diller.includes('Almanca')}
          />{' '}
          Almanca
        </label>
        <label>
          <input
            type="checkbox"
            name="diller"
            value="Fransızca"
            onChange={handleInputChange}
            checked={formData.diller.includes('Fransızca')}
          />{' '}
          Fransızca
        </label>
      </div>
      <div className="multiple-area">
        <label className="bold-label">
          Nerede Yaşıyorsun?
          <select
            value={formData.sehir}
            name="sehir"
            onChange={handleInputChange}
          >
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="amac" className="bold-label">
          Başvuru Amacınız:
        </label>
        <textarea
          rows="6"
          id="amac"
          name="amac"
          value={formData.amac}
          onChange={handleInputChange}
        />
        {errors.amac && <p className="error-message">{errors.amac}</p>}
      </div>
      <div className="multiple-area">
        <label>
          <input
            type="checkbox"
            name="terms"
            onChange={handleInputChange}
            checked={formData.terms}
          />{' '}
          Sözleşmeyi kabul ediyorum.
        </label>
        {errors.terms && <p className="error-message">{errors.terms}</p>}
      </div>
      <div>
        <button disabled={!isValid} type="submit">
          Kayıt Ol
        </button>
      </div>
    </form>
  );
}

export default Register;

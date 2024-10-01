import { Link, NavLink, useHistory } from 'react-router-dom';

function Header(props) {
  const { user, setUser } = props;
  const history = useHistory();

  function logOut() {
    setUser(null);
  }
  return (
    <header>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/product/1/hatice">Product 1</NavLink>
        <NavLink to="/product/2/ahmet">Product 2</NavLink>
        <NavLink to="/aboutus">About Us</NavLink>
        <span onClick={() => history.goBack()}>Önceki Sayfa</span>
        {user ? (
          <Link to="/login" onClick={logOut}>
            Logout {user.email}
          </Link>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../functions/context/LoginContext';
import { clearLoginAndGoToLogin } from '../../functions/functions';

function HeaderProfile() {
  const navigate = useNavigate();
  const { currentUser, setLoginState } = useContext(LoginContext);
  const displayName =
    currentUser && currentUser !== 'null' ? String(currentUser) : '';

  function logout() {
    setLoginState('null');
    clearLoginAndGoToLogin();
  }

  function goToLogin() {
    navigate('/login');
  }

  return (
    <div className="header-profile">
      {displayName ? (
        <button
          type="button"
          className="header-logout-button"
          onClick={logout}
          aria-label={`Log out ${displayName}`}
        >
          Log out
        </button>
      ) : (
        <button
          type="button"
          className="header-logout-button"
          onClick={goToLogin}
          aria-label="Go to login"
        >
          Log in
        </button>
      )}
      <button
        type="button"
        className="header-profile-button"
        aria-label="User profile"
      >
        <img src="/user-images/david.jpg" alt="" />
      </button>
    </div>
  );
}

export default HeaderProfile;

import React, { useContext } from 'react';
import { LoginContext } from '../../functions/context/LoginContext';

function getInitials(currentUser) {
  if (
    currentUser == null ||
    currentUser === 'null' ||
    String(currentUser).trim() === ''
  ) {
    return 'DC';
  }

  const name = String(currentUser).trim();
  const parts = name.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

function HeaderProfile() {
  const { currentUser } = useContext(LoginContext);
  const initials = getInitials(currentUser);

  return (
    <div className="header-profile">
      <button
        type="button"
        className="header-profile-button"
        aria-label="User profile"
      >
        {initials}
      </button>
    </div>
  );
}

export default HeaderProfile;

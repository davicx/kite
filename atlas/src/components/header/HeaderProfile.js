import React from 'react';

function HeaderProfile() {
  return (
    <div className="header-profile">
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

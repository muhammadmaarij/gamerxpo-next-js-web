import React, { useState } from 'react';
const Button = ({ children, onClick, className, type = 'button' }) => (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );

  export default Button
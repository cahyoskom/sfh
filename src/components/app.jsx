import React, { Component, Children } from 'react';
import { withTranslate } from 'react-redux-multilingual';
import { ToastContainer } from 'react-toastify';

import HeaderOne from './common/headers/header-one';
import FooterTwo from './common/footers/footer-two';

const App = ({ children }) => {
  return (
    <div>
      <HeaderOne />
      {/* <HeaderTwo /> */}
      {children}
      {/* <FooterOne/> */}
      <FooterTwo />
      <ToastContainer />
    </div>
  );
};

export default withTranslate(App);

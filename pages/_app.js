/* eslint-disable react/prop-types */
import React from 'react';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

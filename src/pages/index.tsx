import React from 'react';
import Home from '~/components/Home/index';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Page() {
  return (
    <>
      <Header>
        <Home />
      </Header>
      <Footer />
    </>
  );
}

import React from 'react';
import Footer from '../components/Footer';
import Forms from '../components/Forms';
import Header from '../components/Header';
import Table from '../components/Table';

function Wallet() {
  return (
    <div className="h-screen flex flex-col items-center">
      <Header />
      <Forms />
      <Table />
      <Footer />
    </div>
  )
}

export default Wallet;

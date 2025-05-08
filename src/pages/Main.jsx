import React from 'react';
import Hero from '../components/Hero';
import Calculator from '../components/Calculator';
import InfoCards from '../components/InfoCards';
import PwaInstall from '../components/PwaInstall';

export default function Main() {
  return (
    <>
      <Hero />
      <Calculator />
      <InfoCards />
      <PwaInstall />
    </>
  );
}
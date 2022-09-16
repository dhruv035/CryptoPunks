import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className="flex ">
      <div className="flex-row align-center justify-center">
     <a href="/dashboard" className="button">Go to Google</a>
     </div>
    </div>
  );
};

export default Home;

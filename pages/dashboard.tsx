import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import {Header} from '../components/Header/Header';
import styles from '../styles/Home.module.css';
import { Grid, ImageList, ImageListItem } from '@mui/material';
import PunkData from '../cryptoPunkData.json';

type PunkType={
  type:string;
  image:string;
  accessories:string[];
}
const Dashboard: NextPage = () => {
  let data:{[key: string]: PunkType}=PunkData;
  let values= Object.values(data);
  console.log('data["001"] :>> ',values[0]);
  return (
  <div>
    <Header/>
    <div className='flex align-center justify-center'>
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
  {Object.values(PunkData).map((item) => (
    <ImageListItem key={item.image}>
      <img
        src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={item.type}
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>
</div>
  </div>
  );
};

export default Dashboard;

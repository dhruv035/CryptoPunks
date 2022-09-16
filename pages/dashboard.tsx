import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import {Header} from '../components/Header/Header';
import styles from '../styles/Home.module.css';
import { Grid, ImageList, ImageListItem, Typography } from '@mui/material';
import PunkData from '../cryptoPunkData.json';
import axios from "axios"


type PunkType={
  type:string;
  image:string;
  accessories:string[];
}
type RequestData={
  host:string;
  subgraph:string;
  query:string;
}
const Dashboard: NextPage = () => {
  
    async function request(req:RequestData){
    const url=`https://api.thegraph.com/subgraphs/name/`+req.host+`/`+req.subgraph;
    let query=req.query;
    const result= await axios.post(url, {
      query: query,
    }).then((res:any) => {
      console.log('res :>> ', res.data);
      return res;
    })
    .catch((error) => {
      console.error(error)
    })
    return result.data.data;

  }
  const [daata,setDaata]=useState<any>([])
  const imageUrl="https://www.larvalabs.com/cryptopunks/cryptopunk";
  let queryPunk=`{
    punks(first:25) {
       
       id
     metadata{
       tokenURI
       svg
       
       traits{
         id
         type
       }
       
     }
     assignedTo{
       id
     }
     transferedTo{
       id
     }
     purchasedBy{
       id
     }
     events{
       from{
         id
       }
       to{
         id
       }
       amount
       timestamp
       type
     }
       owner{
         id
       }
     currentBid{
       from{
         id
       }
       amount
     }
     currentAsk{
       from{
         id
       }
       open
       amount
     }
     
     }
   }`
    console.log('queryKlima :>> ', queryPunk);
  //add score calculation queries
  useEffect(()=>{
    async function setData(){
      let punkdata=await request({
      host:"itsjerryokolo",
      subgraph:"cryptopunks",
      query:queryPunk,
    });
    setDaata(punkdata.punks)
    console.log('daata :>> ', daata);
    }
    setData();
  },[])
  console.log('daata :>> ', daata);
  
    
  let data:{[key: string]: PunkType}=PunkData;
  let values= Object.values(data);
  console.log('data["001"] :>> ',values[0]);
  return (
  <div>
    <Header/>
    <div className='flex align-center justify-center'>
    <ImageList sx={{ width: 800, height: 850 }} cols={3} >
  {daata.length &&(daata.map((item:any) => (
    <ImageListItem key={item.id}>
      <img
        src={`${imageUrl+item.id+'.png'}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${imageUrl+item.id+'.png'}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={item.id}
        loading="lazy"
      />
      <Typography>
        {item.currentAsk?item.currentAsk.amount:item.id}
      </Typography>
    </ImageListItem>
  )))}
</ImageList>
</div>
  </div>
  );
  
};

export default Dashboard;

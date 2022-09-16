import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import {Header} from '../components/Header/Header';
import styles from '../styles/Home.module.css';
import { Grid, ImageList, ImageListItem, Typography } from '@mui/material';
import PunkData from '../cryptoPunkData.json';
import axios from "axios";
import {BigNumber, ethers} from "ethers";

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
  <div className="flex flex-col">
    <Header/>
    <div className='flex align-center justify-center mx-5 mt-5'>
    <Grid container spacing={2}>
  {daata.length &&(daata.map((item:any) => {
    let saleEvents;
    let lastPrice;
    if(item.currentAsk&&!item.currentAsk.amount.includes(".")){
      console.log('item.currentAsk :>> ', item);
      console.log('amount :>> ', item.currentAsk.amount);
      item.currentAsk.amount=ethers.utils.formatEther(item.currentAsk.amount);
    }
    if(item.events){
      saleEvents=item.events.filter((event:any)=>event.type==="SALE")
      if(saleEvents.length){
        saleEvents=saleEvents.sort((a:any,b:any)=>{
          let fa = a.timestamp,
        fb = b.timestamp;

    if (fa < fb) {
        return 1;
    }
    if (fa > fb) {
        return -1;
    }
    return 0;
        })
        console.log('saleEvents :>> ', saleEvents);
        lastPrice=ethers.utils.formatEther(saleEvents[0].amount);
      }
    }
    return(
    <Grid item xs={4}>
      <div className='flex flex-col'>
      <img
      className='mr-10 my-5 self-center'
        src={`${imageUrl+item.id+'.png'}?w=80&h=80&fit=resize&auto=format`}
        srcSet={`${imageUrl+item.id+'.png'}?w=80&h=80&fit=resize&auto=format`}
        alt={item.id}
        loading="lazy"
      />
      <Typography>
        ID : {item.id}
      </Typography>
      <Typography>
        Current Ask : {item.currentAsk?item.currentAsk.amount:"No Ask"}
      </Typography>
      <Typography>
        Last Price : {lastPrice?lastPrice:"No sale History"}
      </Typography>
      <Typography>
        Owner : {item.owner.id}
      </Typography>
    </div>
    </Grid>
  )}))}
</Grid>
</div>
  </div>
  );
  
};

export default Dashboard;

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Typography } from "@mui/material";

export const Header = () => {
  return (
    <div className="flex flex-row items-center bg-black ">
      <div className="flex mx-5 mt-2 mb-4">
      <Typography color={"#FFF"} fontSize={30}>Punks</Typography>
      </div>
      <div className="flex grow justify-end">
          
          <ConnectButton
          accountStatus="address"
          showBalance={false}
        />  
        </div>
      {/* <div className="text-xl text-main-gray-dark mr-8">
        <p>Settings</p>
      </div> */}
      {/* <Link href="/">
        <img src="../assets/release_club_logo.png" />
      </Link> */}
      
    </div>
  );
};
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <div className="flex flex-row-reverse justify-start max-w-8xl items-center bg-black">
      <div className="mx-5 mt-2 mb-4">
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
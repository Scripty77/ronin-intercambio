import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "./components/Button";
import image from "./assets/Ronin_Mark_Blue.svg";
import image2 from "./assets/homepage-hero.png";
import Ronin from '@roninwallet/sdk';

const DropdownMenu: React.FC<{ nfts: any[], onSelect: (nft: any) => void }> = ({ nfts, onSelect }) => {
  return (
    <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg">
      {nfts.map((nft) => (
        <div
          key={nft.id}
          className="cursor-pointer p-2 hover:bg-gray-200 flex items-center"
          onClick={() => onSelect(nft)}
        >
          <img src={nft.imageUrl} alt={nft.name} className="w-10 h-10 mr-2" />
          <span>{nft.name}</span>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSelect = (nft: any) => {
    setSelectedNFT(nft.name);
    setIsOpen(false);
  };

  const fetchNFTs = async (walletAddress: string) => {
    try {
      const response = await axios.get(`URL_DE_TU_API/${walletAddress}`);
      setNfts(response.data);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  const connectWallet = async () => {
    try {
      const account = await Ronin.connect();
      setAddress(account);
      fetchNFTs(account);
      setWalletConnected(true); // Update the state to indicate the wallet is connected
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  useEffect(() => {
    if (address) {
      fetchNFTs(address);
    }
  }, [address]);

  return (
    <div className="relative h-screen no-b">
      <div className="absolute top-1/2 left-40 transform -translate-y-2/2 no-bg">
        <Button text="Select NFT to Exchange" onClick={toggleMenu} />
        {isOpen && <DropdownMenu nfts={nfts} onSelect={handleSelect} />}
      </div>
      <div className="flex justify-center items-end h-full pb-40 no-bg">
        <Button text={walletConnected ? "Wallet Conectada" : "Connect Wallet"} onClick={connectWallet} />
      </div>
      <div className="absolute top-5 left-5 m-6">
        <img src={image} alt="ronin" className="w-20 h-20 object-contain" />
      </div>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
        <img src={image2} alt="Website Logo" className="w-20 h-20 object-contain mx-auto" />
        <h1 className="text-3xl Roboto mt-3">Welcome to NFT Exchange</h1>
      </div>
    </div>
  );
}

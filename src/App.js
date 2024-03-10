import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Mint from "./components/Mint";
import ConnectMsg from "./components/ConnectMsg.jsx";
import { ethers } from "ethers";
import { contractAddress, abi } from "./blockchain/contractInfo.js";
import { whiteListInfo } from "./blockchain/whiteListinfo.js";
import { useEffect, useState } from "react";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const litwContract = new ethers.Contract(contractAddress, abi, provider);

function App() {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [amountMinting, setAmountMinting] = useState(1);
  const [maxAllowedMints, setMaxAllowedMints] = useState(1);
  const [whiteListStatus, setWhiteListStatus] = useState("Loading...");
  const [saleStatus, setSaleStatus] = useState("Loading...");
  const [mintMsg, setMintMsg] = useState(null);
  const [error, setError] = useState(null);

  const connectToMetamask = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    setConnectedAccount(accounts[0]);
  };

  const getEthBalance = async () => {
    const balance = await provider.getBalance(connectedAccount);
    const balanceInEther = ethers.utils.formatEther(balance);
    setBalance(balanceInEther);
  };

  const getTotalSupply = async () => {
    const supplyObj = await litwContract.totalSupply();
    const supply = parseInt(supplyObj._hex);
    setTotalSupply(supply);
  };

  const increament = () => {
    if (amountMinting < maxAllowedMints) {
      setAmountMinting(amountMinting + 1);
    }
  };
  const decreament = () => {
    if (amountMinting > 1) {
      setAmountMinting(amountMinting - 1);
    }
  };

  const getSaleStatus = async () => {
    const status = await litwContract.saleStatus();
    switch(status){
      case 0:
        setSaleStatus("Inactive");
        break;
      case 1:
        setSaleStatus("OG Mint");
        break;
      case 2:
        setSaleStatus("Whitelist Mint");
        break;
      case 3:
         setSaleStatus("Publist Mint");
        break;
      case 4:
        setSaleStatus("Public Mint");
        break;
      default:
        setSaleStatus("Inactive");
        break;
    }
    if (status === 1) {
      setMaxAllowedMints(2);
    } else {
      setMaxAllowedMints(1);
    }
  };

  const getWhiteListStatus = () => {
    if (whiteListInfo.hasOwnProperty(connectedAccount)) {
      setWhiteListStatus("Whitelisted");
    } else {
      setWhiteListStatus("Not Whitelisted");
    }
  };

  const ogMint = async () => {
    if (whiteListStatus === "Whitelisted") {
      let signer;
      let litwContractWithSigner;
      const proof = whiteListInfo[connectedAccount].hexProof;
      try{
        signer = provider.getSigner();
        litwContractWithSigner = litwContract.connect(signer);
        const tx = await litwContractWithSigner.ogMint(proof, amountMinting, {
          gasLimit: 800000,
        })
        await tx.wait();
        }catch(e){
          console.log(`Err Code: ${e.code}`);
          setError("Error!")
        }
    } else {
      console.log("Not Whitelisted");
    }
  };

  const whiteListMint = async () => {
    if (whiteListStatus === "Whitelisted") {
      let signer;
      let litwContractWithSigner;
      const proof = whiteListInfo[connectedAccount].hexProof;
      try{
        signer = provider.getSigner();
        litwContractWithSigner = litwContract.connect(signer);
        const tx = await litwContractWithSigner.whiteListMint(proof, amountMinting, {
          gasLimit: 800000,
        })
        await tx.wait();
        }catch(e){
          console.log(`Err Code: ${e.code}`);
          setError("Error!")
        }
    } else {
      console.log("Not Whitelisted");
    }
  };

  const pubListMint = async () => {
    if (whiteListStatus === "Whitelisted") {
      let signer;
      let litwContractWithSigner;
      const proof = whiteListInfo[connectedAccount].hexProof;
      try{
        signer = provider.getSigner();
        litwContractWithSigner = litwContract.connect(signer);
        const tx = await litwContractWithSigner.pubListMint(proof, amountMinting, {
          gasLimit: 800000,
        })
        await tx.wait();
        }catch(e){
          console.log(`Err Code: ${e.code}`);
          setError("Error!")
        }
    } else {
      console.log("Not Whitelisted");
    }
  };

  const publicMint = async () => {
      let signer;
      let litwContractWithSigner;
      const value = ethers.utils.parseEther('0.00001', 'ether');
      try{
        signer = provider.getSigner();
        litwContractWithSigner = litwContract.connect(signer);
        const tx = await litwContractWithSigner.publicMint(amountMinting, {
          gasLimit: 800000,
          value: value
        })
        await tx.wait()
      }catch(e){
        console.log(`Err Code: ${e.code}`);
        setError("Error!")
      }
  };

  useEffect(() => {
    if (connectedAccount) {
      getEthBalance();
      getTotalSupply();
      getWhiteListStatus();
      getSaleStatus();
      console.log("rerender");
    }
  });

  return (
    <div className="App">
      <Navbar
        connectedAccount={connectedAccount}
        connectToMetamask={connectToMetamask}
        balance={balance}
      />
      <Mint
        ogMint={ogMint}
        whiteListMint={whiteListMint}
        pubListMint={pubListMint}
        publicMint={publicMint}
        totalSupply={totalSupply}
        whiteListStatus={whiteListStatus}
        maxAllowedMints={maxAllowedMints}
        amountMinting={amountMinting}
        increament={increament}
        decreament={decreament}
        mintMsg= {mintMsg}
        saleStatus = {saleStatus}
        error = {error}
        connectedAccount={connectedAccount}
        connectToMetamask= {connectToMetamask}
      />
      <ConnectMsg 
        connectedAccount={connectedAccount}
        connectToMetamask={connectToMetamask}
      />
      <Footer />
    </div>
  );
}

export default App;

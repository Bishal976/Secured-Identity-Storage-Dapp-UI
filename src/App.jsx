import { useState, useEffect } from "react";
import { ethers } from "ethers";

import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // For creating smart contract instance
  useEffect(() => {
    // Create a new provider instance useful in reading data from blockchain, where metamask injects the window.ethereum object.
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        // For knowing if the network is changed
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        // For knowing if the account is changed
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // Automatically opens  metamask account as Dapp runs.
        await provider.send("eth_requestAccounts", []);
        // For writting data on blockchain
        const signer = provider.getSigner();
        // For knowing address of current account
        const address = await signer.getAddress();
        // Sets the current account
        setCurrentAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        // Creating instance of smart contract (dependencies required: contract abi, contract address, signer)
        let contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contract);
        setProvider(provider);
      } else {
        alert("Please install metamask");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
    <Box className="gradient__bg">
      <Navbar/>
      <Header />
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}
    <Box sx={{p:'2rem'}}>
      {!modalOpen && (
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Share
        </Button>
      )}
      <Box sx={{textAlign:"center"}}>
        <Typography variant="h1" color="white">Secured Identity Storage Dapp</Typography>
        <Typography variant="h5" sx={{mb:'2rem'}}>
          {" "}
          Current Account: {currentAccount ? currentAccount : "Connect to metamask"}
        </Typography>
        <FileUpload
          account={currentAccount}
          contract={contract}
        />
        <Display contract={contract} account={currentAccount} />
      </Box>
    </Box>
    <Footer/>
      </Box>
    </>
  );
}

export default App;

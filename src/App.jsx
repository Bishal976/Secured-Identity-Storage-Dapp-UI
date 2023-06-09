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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

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
      <Box className="gradient__bg" id="home">
        <Navbar />
        <Header />
        <Box sx={{ p: "2rem", textAlign: "center" }}>
          <Typography className="gradient__text" sx={{ mb: "2rem" }}>
            {" "}
            Current Active Account:{" "}
            {currentAccount ? currentAccount : "Connect to metamask"}
          </Typography>
          <FileUpload account={currentAccount} contract={contract} />
          <Display contract={contract} account={currentAccount} />
        </Box>
        <Modal contract={contract} />
        <Footer />
      </Box>
    </>
  );
}

export default App;

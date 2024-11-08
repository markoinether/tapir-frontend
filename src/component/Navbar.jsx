import React, { useState, useEffect } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
} from "react-bootstrap";
import { ethers } from "ethers";

function Navbar() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);
        setIsConnected(true);

        // Save connection state to localStorage
        localStorage.setItem("walletAddress", address);
        localStorage.setItem("isConnected", "true");

        console.log("Connected to address:", address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  // Load connection state from localStorage on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    const savedIsConnected = localStorage.getItem("isConnected") === "true";

    if (savedAddress && savedIsConnected) {
      setWalletAddress(savedAddress);
      setIsConnected(true);
    }

    // Listen for account changes and update state
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem("walletAddress", accounts[0]);
          localStorage.setItem("isConnected", "true");
        } else {
          setWalletAddress("");
          setIsConnected(false);
          localStorage.removeItem("walletAddress");
          localStorage.setItem("isConnected", "false");
        }
      });
    }
  }, []);

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/">Tapir Frontend</BootstrapNavbar.Brand>
        <Nav className="ml-auto">
          <Button onClick={connectWallet}>
            {isConnected
              ? `Connected: ${walletAddress.slice(
                  0,
                  6
                )}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </Button>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;

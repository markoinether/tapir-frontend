import React, { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Firstpage from "./component/1stpage";
import Content from "./component/Content";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const location = useLocation();
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") || ""
  );
  const [isConnected, setIsConnected] = useState(
    !!localStorage.getItem("walletAddress")
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const updateDarkMode = (event) => setIsDarkMode(event.matches);

    setIsDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener("change", updateDarkMode);

    return () =>
      darkModeMediaQuery.removeEventListener("change", updateDarkMode);
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);
        setIsConnected(true);
        localStorage.setItem("walletAddress", address);

        console.log("Connected to wallet:", address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setWalletAddress(storedAddress);
      setIsConnected(true);
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem("walletAddress", accounts[0]);
        } else {
          setWalletAddress("");
          setIsConnected(false);
          localStorage.removeItem("walletAddress");
        }
      });
    }
  }, []);

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route
          path="/content"
          element={
            <Content
              isDarkMode={isDarkMode}
              walletAddress={walletAddress}
              isConnected={isConnected}
              connectWallet={connectWallet}
            />
          }
        />
      </Routes>

      {/* Show footer only if not on the main page */}
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;

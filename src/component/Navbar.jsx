import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { ethers } from 'ethers';

function WalletConnector() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Function to connect to MetaMask
  const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
          try {
              // Request account access
              const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

              // Initialize provider and signer
              const signer = provider.getSigner();

              // Get the user's wallet address
              const address = await signer.getAddress();
              
              // Update the state
              setWalletAddress(address);
              setIsConnected(true);

              console.log("Connected to address:", address);
          } catch (error) {
              console.error("Error connecting to MetaMask:", error);
          }
      } else {
          alert("Please install MetaMask to connect your wallet.");
      }
  };

  return (
    <Navbar bg="light" expand="lg" style={{ background: 'linear-gradient(to left, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))' }}>
      <Container>
        <Navbar.Brand href="/">TAPIR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
              <Button
                className="pe-3 ps-3 mt-2 mb-2"
                variant="primary"
                style={{ borderRadius: 15 }}
                onClick={connectWallet}
              >
                {isConnected ? "Connected" : "Connect Wallet"}
              </Button>
              {isConnected && (
                <p>Connected wallet address: {walletAddress}</p>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WalletConnector;

import React, { useState } from "react";
import { Card, InputGroup, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Content({ walletAddress, isConnected, connectWallet }) {
  const location = useLocation();
  const [amount, setAmount] = useState("");

  const getTitleAndSubtitle = () => {
    switch (location.state?.selectedPercentage) {
      case 5:
        return {
          title: "Restake Safe",
          subtitle: "Restaking + buying debeg protection",
          color: "#5e72e4",
        };
      case 6:
        return {
          title: "Restake only",
          subtitle: "Regular restaking",
          color: "#e75480",
        };
      case 7:
        return {
          title: "Restake with boost",
          subtitle: "Restaking + selling debeg protection",
          color: "#f5a623",
        };
      default:
        return { title: "", subtitle: "", color: "" };
    }
  };

  const { title, subtitle, color } = getTitleAndSubtitle();

  // Dummy function to handle staking
  const stakeSafe = () => {
    alert(`Staking ${amount} units in safe mode.`);
    // Implement actual staking logic here
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 style={{ color }} className="mt-4">
        {title}
      </h1>
      <h3 style={{ color }}>{subtitle}</h3>

      <Card className="ms-5" style={{ width: "40%", borderRadius: 20 }}>
        <div style={{ width: "95%" }} className="m-3">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter amount"
              aria-label="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              onClick={isConnected ? stakeSafe : connectWallet}
              variant="primary"
              style={{ backgroundColor: color, borderColor: color }}
            >
              {isConnected ? "Stake" : "Connect Wallet"}
            </Button>
          </InputGroup>
        </div>
      </Card>
    </div>
  );
}

export default Content;

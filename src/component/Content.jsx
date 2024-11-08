import React, { useState, useEffect } from 'react';
import { Card, InputGroup, Form, Button, Placeholder } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function Content() {
  const location = useLocation();
  const selectedPercentage = location.state?.selectedPercentage || 0; // Access the passed data
  const [amount, setAmount] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  useEffect(() => {
    if (amount) {
      setCalculatedAmount(amount * (1 + selectedPercentage / 100));
    }
  }, [selectedPercentage, amount]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setAmount(value);
      setCalculatedAmount(value * (1 + selectedPercentage / 100));
    }
  };

  const getTitleAndSubtitle = () => {
    switch (selectedPercentage) {
      case 5:
        return {
          title: 'Restake Safe',
          subtitle: 'Restaking + buying debeg protection',
          color: '#966fd6'
        };
      case 6:
        return {
          title: 'Restake only',
          subtitle: 'Regular restaking',
          color: '#e75480'
        };
      case 7:
        return {
          title: 'Restake with boost',
          subtitle: 'Restaking + selling debeg protection',
          color: '#e67e00'
        };
      default:
        return {
          title: '',
          subtitle: '',
          color: ''
        };
    }
  };

  const { title, subtitle, color } = getTitleAndSubtitle();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1 style={{ color }} className='mt-4'>{title}</h1>
      <h3 style={{ color }}>{subtitle}</h3>
      <Card className="ms-5" style={{ width: '40%', borderRadius: 20 }}>
        <div style={{ width: '95%' }} className="m-3">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter amount"
              aria-label="Enter amount"
              aria-describedby="basic-addon2"
              value={amount}
              onChange={handleInputChange}
            />
            <Button className="" variant="outline-primary" id="button-addon2">
              MAX
            </Button>
          </InputGroup>
          <Button className="p-2 mb-3" variant="primary" style={{ width: '100%', borderRadius: 15 }}>
            Connect Wallet
          </Button>
          <p aria-hidden="true">
            <Placeholder xs={12} style={{ height: '100px', borderRadius: 5 }} />
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>You will receive</span>
            <span>{selectedPercentage}% APR</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span>Calculated Amount: {calculatedAmount}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Content;
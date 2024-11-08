import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function GroupExample() {
    const [selectedPercentage, setSelectedPercentage] = useState(0);
    const navigate = useNavigate();
  
    const handleButtonClick = (percentage) => {
      setSelectedPercentage(percentage);
      navigate('/content', { state: { selectedPercentage: percentage } }); // Pass selectedPercentage as state
    };

  return (
    <div className='mt-5' style={{ width: '80%', marginLeft: '10%' }}>
      <CardGroup>
        <Card style={{ background: 'linear-gradient(to left, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))' }}>
          <Card.Img className='mt-5 mb-5' variant="top" src="/images/image.png" 
            style={{ width: '60%', marginLeft: '20%', borderRadius: '20px'}}/>
        </Card>
        <Card style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))' }}>
          <Card.Body>
            <Card.Title className='text-center'>Stake Safu with Tapir</Card.Title>
            <Container>
              <Row className='mt-5' style={{ color: '#966fd6' }}>
                <Col xs={2}><h3>5%</h3></Col>
                <Col xs={4}><Button variant="dark" className='ps-3 pe-3' onClick={() => handleButtonClick(5)}>Stake</Button></Col>
                <Col><h3>Restake Safe</h3></Col>
              </Row>
              <i><Row>
                <Col xs={2}>APR</Col>
                <Col xs={4}>TVL - $ 25,343,222</Col>
                <Col style={{ color: '#966fd6' }}>Restaking + buying debeg protection</Col>
              </Row></i>
              <Row className='mt-3' style={{ color: '#e75480' }}>
                <Col xs={2}><h3>6%</h3></Col>
                <Col xs={4}><Button variant="dark" className='ps-3 pe-3' onClick={() => handleButtonClick(6)}>Stake</Button></Col>
                <Col><h3>Restake only</h3></Col>
              </Row>
              <i><Row>
                <Col xs={2}>APR</Col>
                <Col xs={4}>TVL - $ 35,343,222</Col>
                <Col style={{ color: '#e75480' }}>Regular restaking</Col>
              </Row></i>
              <Row className='mt-3' style={{ color: '#e67e00' }}>
                <Col xs={2}><h3>7%</h3></Col>
                <Col xs={4}><Button variant="dark" className='ps-3 pe-3' onClick={() => handleButtonClick(7)}>Stake</Button></Col>
                <Col><h3>Restake with boost</h3></Col>
              </Row>
              <i><Row>
                <Col xs={2}>APR</Col>
                <Col xs={4}>TVL - $ 45,343,222</Col>
                <Col style={{ color: '#e67e00' }}>Restaking + selling debeg protection</Col>
              </Row></i>
            </Container>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default GroupExample;

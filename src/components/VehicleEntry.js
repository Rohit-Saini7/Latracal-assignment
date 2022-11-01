import { useState } from 'react';
import styled from 'styled-components';
import VehicleEntryModal from './VehicleEntryModal';

const VehicleEntry = ({ number, driverName, checkInTime, checkOutTime }) => {
  const [showModal, setShowModal] = useState(false);
  const HandleCheckout = () => {
    setShowModal(true);
  };
  return (
    <Container background='ffff'>
      {showModal && (
        <VehicleEntryModal
          number={number}
          from='checkout'
          setShowModal={setShowModal}
        />
      )}
      <MainContent>
        <h2>{number}</h2>
        <h3>~{driverName}</h3>
        <p>Check-In: {checkInTime}</p>
        {!!checkOutTime ? (
          <p>Checkout: {checkOutTime}</p>
        ) : (
          <CheckoutButton onClick={HandleCheckout}>
            <span>Checkout</span>
          </CheckoutButton>
        )}
      </MainContent>
    </Container>
  );
};

export default VehicleEntry;

const Container = styled.div`
  padding: 20px;
  position: relative;
  max-width: 100vw;
  z-index: 1;
  border-radius: 10px;
`;

const MainContent = styled.div`
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  gap: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  & > h3 {
    text-align: right;
  }
  & > h2 {
    text-transform: uppercase;
  }
  & > p {
    font-size: 1.1em;
  }
`;

const CheckoutButton = styled.button`
  outline: none;
  border: 1px solid #7053bc;
  background-color: transparent;
  color: #d7ceeeff;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.2s;
  overflow: none;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #7053bc;
    transform: scaleX(0);
    transition: transform 0.5s ease-in-out;
    transform-origin: right;
    z-index: 1;
  }
  &:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  &:hover {
    color: white;
  }
  &:active {
    translate: 0 5px;
  }

  & > span {
    display: inline-block;
    z-index: 2;
    position: relative;
  }
`;

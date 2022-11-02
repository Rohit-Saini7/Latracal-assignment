import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context';

const VehicleEntryModal = ({ number, from, setShowModal }) => {
  const { dispatchEntryEvent } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const vehicleNumberRef = useRef();
  const driverNameRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();

  const handleSave = () => {
    const vehicleNumber = vehicleNumberRef.current.value;
    const driverName = driverNameRef.current.value;
    const checkInTime = checkInRef.current.value;
    const checkOutTime = checkOutRef.current.value;

    try {
      if (!!vehicleNumber && !!driverName && !!checkInTime) {
        const newEntry = {
          number: vehicleNumber,
          driverName: driverName,
          checkInTime: checkInTime,
          checkOutTime: !!checkOutTime ? checkOutTime : '',
        };

        dispatchEntryEvent('ADD_ENTRY', { newEntry: newEntry });
        setShowModal(false);
      } else if (from === 'checkout') {
        dispatchEntryEvent('UPDATE_ENTRY', {
          number: number,
          checkOutTime: checkOutTime,
        });
        setShowModal(false);
      } else {
        let errorMessage = !vehicleNumber
          ? 'Vehicle Number is Missing.'
          : !driverName
          ? 'Driver Name is Missing.'
          : !checkInTime
          ? 'Check In Time is Missing.'
          : 'Unknown Error';
        throw errorMessage;
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  };

  return (
    <Container data-from={from}>
      <InnerContainer>
        <ModalHeading>Add New Entry</ModalHeading>
        <ErrorWrapper>{message}</ErrorWrapper>
        <FormWrapper>
          <InputWrapper data-from={from}>
            <InputTextbox
              type='text'
              required='required'
              ref={vehicleNumberRef}
            />
            <InputLabel>Vehicle Number</InputLabel>
          </InputWrapper>
          <InputWrapper data-from={from}>
            <InputTextbox type='text' required='required' ref={driverNameRef} />
            <InputLabel>Driver Name</InputLabel>
          </InputWrapper>
          <InputWrapper data-from={from}>
            <InputTextbox
              type='text'
              required='required'
              ref={checkInRef}
              title='Time format is in 24:00 hrs.'
            />
            <InputLabel>Check In</InputLabel>
          </InputWrapper>
          <InputWrapper>
            <InputTextbox
              type='text'
              required='required'
              ref={checkOutRef}
              title='Time format is in 24:00 hrs.'
            />
            <InputLabel>Check Out</InputLabel>
          </InputWrapper>
        </FormWrapper>
        <ButtonsWrapper>
          <StyledButton onClick={() => setShowModal(false)}>
            <img src='assets/close.svg' alt='' />
            Close
          </StyledButton>
          <StyledButton data-type='save' onClick={handleSave}>
            <img src='assets/save.svg' alt='' />
            Save
          </StyledButton>
        </ButtonsWrapper>
      </InnerContainer>
    </Container>
  );
};

export default VehicleEntryModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  color: #fff;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  color: black;
  text-align: center;
  padding: 30px;
`;

const ModalHeading = styled.h1`
  margin-bottom: 20px;
`;

const FormWrapper = styled.div`
  margin: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  &:nth-child(2n) input:valid ~ span,
  &:nth-child(2n) input:focus ~ span {
    background-color: #7053bc;
    color: #fff;
    border-radius: 2px;
  }
  &[data-from='checkout'] {
    display: none;
  }
`;

const InputTextbox = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 10px;
  outline: none;
  font-size: 1.2em;
  transition: 0.5s;

  &:valid ~ span,
  &:focus ~ span {
    color: #7053bc;
    transform: translateX(10px) translateY(-7px);
    font-size: 0.7em;
    padding: 0 10px;
    background-color: white;
    border-left: 1px solid #7053bc;
    border-right: 1px solid #7053bc;
    letter-spacing: 0.2em;
  }

  &:valid,
  &:focus {
    border: 1px solid #7053bc;
  }
`;

const InputLabel = styled.span`
  position: absolute;
  left: 0;
  padding: 10px;
  color: #000;
  pointer-events: none;
  font-size: 1.2em;
  text-transform: uppercase;
  transition: 0.5s;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  outline: none;
  border: 1px solid #fff;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  padding: 10px;
  border-radius: 100px;
  transition: 0.2s;
  overflow: none;
  position: relative;
  min-width: 110px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    translate: 0 -2px;
  }

  &:active {
    translate: 0 5px;
  }

  & > img {
    height: 24px;
  }
  &[data-type='save'] {
    border: none;
    color: white;
    background-color: rgba(0, 128, 0, 0.7);
  }
`;

const ErrorWrapper = styled.div`
  color: red;
  font-size: 1.2em;
`;

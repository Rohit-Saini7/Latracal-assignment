import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import VehicleEntryModal from './VehicleEntryModal';

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Container>
      {showModal && <VehicleEntryModal setShowModal={setShowModal} />}
      <NavbarWrap className='navbarWrap'>
        <Toolbar>
          <LogoBox>Assignment</LogoBox>
          <Dropdown />
          <StyledButton
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add Entry
          </StyledButton>
        </Toolbar>
      </NavbarWrap>
    </Container>
  );
}
export default Navbar;

const Container = styled.header`
  width: 80%;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  position: absolute;
  top: 3%;
  left: 10%;
  border-radius: 10px;
  @media screen and (max-width: 800px) {
    width: 97%;
    left: 1.5%;
  }
`;

const NavbarWrap = styled.div`
  max-width: 80%;
  margin: auto;
`;

const Toolbar = styled.div`
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    justify-content: space-around;
    gap: 10px;
  }
`;

const LogoBox = styled.div`
  font-size: 2em;
  text-transform: uppercase;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const StyledButton = styled.button`
  outline: none;
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  padding: 5px 10px;
  border-radius: 10px;
  transition: 0.2s;
  overflow: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 125px;

  &:hover {
    translate: 0 -1px;
    background-color: #7053bc;
  }

  &:active {
    translate: 0 5px;
  }

  & > img {
    height: 24px;
    width: 24px;
  }
`;

import { useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import VehicleEntry from './components/VehicleEntry';
import { AppContext } from './context';
import { initialData } from './vehicles';

function App() {
  const [VehiclesList, setVehiclesList] = useState(initialData);

  const dispatchEntryEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_ENTRY':
        setVehiclesList([...VehiclesList, payload.newEntry]);
        return;
      case 'UPDATE_ENTRY':
        setVehiclesList(
          VehiclesList.map((vehicle) =>
            vehicle.number === payload.number
              ? Object.assign({}, vehicle, {
                  checkOutTime: payload.checkOutTime,
                })
              : vehicle
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <div>
      <AppContext.Provider value={{ VehiclesList, dispatchEntryEvent }}>
        <Navbar />
        <VehicleEntryWrapper>
          {VehiclesList.map(
            ({ number, driverName, checkInTime, checkOutTime }, index) => (
              <VehicleEntry
                key={index}
                number={number}
                driverName={driverName}
                checkInTime={checkInTime}
                checkOutTime={checkOutTime}
              />
            )
          )}
        </VehicleEntryWrapper>
      </AppContext.Provider>
    </div>
  );
}

export default App;

const VehicleEntryWrapper = styled.div`
  margin: 20px;
  margin-top: 14vh;
  display: grid;
  gap: 30px;
  text-align: center;
  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

import React from 'react';
import styled from "styled-components";

const Div = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  padding: 20px; 
  border-radius: 20px;
  max-height: ${({ maxHeight }) => maxHeight ?? "500px"};
  height: 100%;
  @media(max-height: 900px){
    max-height: 450px;
  }
  max-width: ${({ maxWidth }) => maxWidth ?? "300px"}; 
  width: 100%; 
  box-shadow: 0 4px 6px ${({ darkMode }) => darkMode ? "rgba(255, 255, 255, 1.1)" : "rgba(0, 0, 0, 0.1)"}; 
  z-index: 1000; 
  background-color: ${(props) => props.maxWidth ? "transparent" : props.darkMode ? "black" : "white"};
  color: ${({ darkMode }) => darkMode ? "white" : "black"};
`

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  backdrop-filter: blur(5px); 
  display: ${props => (props.showPopup ? 'block' : 'none')}; 
  z-index: 600; 
`

const Popup = ({ component: Component, ...props}) => {
  return (
    props.showPopup && (
      <>
      <BackgroundOverlay showPopup={props.showPopup || props.editSong}/>
      <Div 
          maxWidth={props.maxWidth}
          maxHeight={props.maxHeight}
          darkMode={props.darkMode}><Component {...props}/></Div>
      </>
    )
  );
};

export default Popup;

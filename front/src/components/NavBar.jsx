import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Div = styled.div` 
  position: fixed;
  top: 10px; 
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  background-color: #ff964f; 
  margin: -10px;
`

const Button = styled.button`
  border: solid 0;
  font-size: 14px;
  color: #ff964f;
  font-weight: bold;
  background-color: ${(props) => props.darkMode ? "black" : "white"};
  border-radius: 50px;
  width: 50px;
  margin: 9px;
  cursor: pointer;
`

function NavBar(props){
  const navigate = useNavigate();
  return (
    <Div>
      <Button onClick={() => navigate('/queue')} darkMode={props.darkMode}><img src={props.darkMode ? "whiteQueue.svg" : "blackQueue.svg"}></img></Button>
      <Button onClick={() => navigate('/profile')} darkMode={props.darkMode}><img src={props.darkMode ? "lightModePerson.svg" : "darkModePerson.svg"}></img></Button>
    </Div>
  )
}

export default NavBar;

import styled from "styled-components";

const Button = styled.button`
  font-size: 16px;
  border: none;
  border-radius: 8px;
  padding: 20px 30px;
  margin: 7px;
  background-color: ${(props) => (!props.enabled ? "#d3d3d3" : "#ff964f")}; 
  color: white;
  font-weight: bold;
  cursor: ${(props) => (!props.enabled ? "not-allowed" : "pointer")}; 
  @media(max-height: 400px){
    padding: 10px;
    font-size: 10px;
  }
`;

export default Button;

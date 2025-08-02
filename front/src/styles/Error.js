import { styled } from "styled-components";

const Error = styled.div`
  font-size: 12px;
  color: red;
  border: none;
  margin: 10px;
  max-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
  @media(max-height: 400px){
    font-size: 10px;
    margin: 0px;
  }
`


export default Error;

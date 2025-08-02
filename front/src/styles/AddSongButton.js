import styled from "styled-components";

const AddSongButton = styled.button`
  font-size: 16px;
  border: none;
  border-radius: 8px;
  padding: 20px 30px;
  margin: 7px;
  background-color: #ff964f;
  color: white;
  font-weight: bold;
  position: fixed;
  bottom: 100px;
  @media(max-height: 400px){
    padding: 10px;
    font-size: 10px;
  }
`;

export default AddSongButton;

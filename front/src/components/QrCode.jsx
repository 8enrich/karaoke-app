import { styled } from "styled-components";

const Button = styled.button`
  background-color: ${({ darkMode }) => !darkMode ? "white" : "black"};
  color: ${({ darkMode }) => darkMode ? "white" : "black"};
  border: solid 0px;
  position: fixed;
  fon-size: 26px;
  top: 4%;
  right: 5%;
  z-index: 1001;
`

const Img = styled.img`
  position: fixed; 
  left: 50%;
  width: 50vw;
  height: 100vh;
`

const ImgLeft = styled.img`
  position: fixed; 
  left: 0%;
  width: 50vw;
  height: 100vh;
`

const QrCode = (props) => {
  const { close, darkMode, file } = props;
  return <>
    <Button onClick={close} darkMode={darkMode}>
    <img src={darkMode ? "close_white.svg" : "close_black.svg"}/>
    </Button>
    <ImgLeft src={"wifi_qr_code.jpg"} />
    <Img src={file} />
  </>
}

export default QrCode;

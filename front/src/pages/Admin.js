import Queue from "./Queue";
import { Navigate } from 'react-router-dom';
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Popup from "../components/PopUp";
import QrCode from "../components/QrCode";
import axiosInstance from "../services/axios";
import { BACKEND_URL } from "../settings";

const QrButton = styled.button`
  background-color: ${({ darkMode }) => darkMode ? "black" : "white"};
  border: solid 0px;
  position: fixed;
  top: 2%;
  right: 3%;
`

function Admin(props){
  const { admin, darkMode } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState('');

  async function getQrCode(){
    setShowPopup(true);
    const ip = BACKEND_URL.replace(":8000", "").replace("http:", "").replace("//", "");
    try{
      const response = await axiosInstance.get('/qr', 
        {params: {"ip": ip, "darkMode": darkMode}}
      );
      setFile(response.data);
    } catch(error){}
  }

  useEffect(() => {
    const fileName = darkMode ? file.replace("lightMode", "darkMode") : file.replace("darkMode", "lightMode");
    setFile(fileName);
  }, [darkMode]);

  return !admin ? (
    <Navigate to="/" /> )
    :
    (<>
    <Queue admin={admin} darkMode={darkMode}/>
    <QrButton darkMode={darkMode} onClick={getQrCode}>
        <img src={darkMode ? "qr_code_white.svg" : "qr_code_black.svg"}/>
    </QrButton>
    <Popup
        showPopup={showPopup}
        component={QrCode}
        darkMode={darkMode}
        close={() => setShowPopup(false)}
        maxWidth={"100%"}
        maxHeight={"100%"}
        file={file}
      />    
    </>
    )
}

export default Admin;

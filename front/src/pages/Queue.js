import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Song from "../components/Song";
import styled from "styled-components";
import NextSongButton from '../styles/NextSongButton';
import axiosInstance from '../services/axios';
import { BACKEND_URL } from '../settings';

const Div = styled.div`
  width: 100%;
`

const SongQueue = styled.div`
  position: fixed;
  top: 20%;
  @media(max-height: 400px){
    top: 30%;
  }
  width: 100%;
  height: 550px;
  @media(max-height: 900px){
    height: 400px;
  }
  @media(max-height: 400px){
    height: 150px;
  }
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 4px 6px ${({ darkMode }) => darkMode ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}; 
`

const H2 = styled.h2`
  position: fixed;
  left: -1%;
  top: 5%;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media(max-height: 900px){
    font-size: 23px;
  }
  @media(max-height: 400px){
    font-size: 20px;
  }
`

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

const Queue = (props) => {
  const { darkMode } = props;
  const [songs, setSongs] = useState([]);
  const [queueError, setQueueError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(BACKEND_URL + '/queue');
    eventSource.onmessage = function(event) {
      const data = JSON.parse(event.data);
      setSongs(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const data = songs?.map(
    (song) => (
      <Song
        key={nanoid()}
        id={nanoid()}
        queue_position={song.queue_position}
        name={song.name}
        link={song.link}
        artist={song.artist}
        user={song.user.name}
      />
    )
  );

  return (<Div>
    <H2>
      <h2>Fila</h2>
    </H2>
    <SongQueue darkMode={darkMode}>
      {data}
    </SongQueue>
    {props.admin && <NextSongButton onClick={async () => {
      try{
        const response = await axiosInstance.get("/next")
        window.open(response.data, "_blank")
        setQueueError(null)
        return;
      } catch(error) {
        setQueueError(error.response.data.detail);
      }
    }}>Próxima</NextSongButton>}
    {queueError && <Error>{queueError}</Error>}
  </Div>)
}

export default Queue;

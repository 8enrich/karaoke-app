import React, { useEffect, useState } from 'react';
import Song from '../components/Song';
import { getToken } from '../services/auth';
import { EventSourcePolyfill } from 'event-source-polyfill';
import styled from "styled-components";
import Popup from '../components/PopUp';
import AddSongForm from '../components/AddSongForm';
import DeleteForm from '../components/DeleteForm';
import axiosInstance from '../services/axios';
import { BACKEND_URL } from '../settings';

const Div = styled.div`
  width: 100%;
`

const H2 = styled.h2`
  position: fixed;
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
const H3 = styled.h3`
  position: fixed;
  top: 15%;
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

const Name = styled.div`
  width: 90%;
  align-items: center;
  justify-content: center;
  margin: 20px;
`

const Input = styled.input`
  width: 90%;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin: 20px;
  font-size: 20px;
  border: solid 1px;
  border-radius: 5px;
  padding: 6px;
  max-height: 35px; 
  background-color: ${({ darkMode }) => darkMode ? "black" : "white"};
  color: ${({ darkMode }) => darkMode ? "white" : "black"};
  @media(max-height: 400px){
    font-size: 10px;
    padding: 4px;
  }
`

const Button = styled.button`
  font-size: 16px;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  color: white;
  margin: 7px;
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#ff964f")}; 
  font-weight: bold;
  cursor: pointer; 
`

const SongDiv = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
`

const SongList = styled.div`
  position: fixed;
  top: 23%;
  width: 100%;
`

const SongPart = styled.div` 
  width: 90%;
`

const P = styled.div`
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Profile = (props) => {
  const { 
    song, setSong, artist, setArtist, link, setLink, sing, setSing,
    errorSong, errorArtist, errorLink, errorSing, error, addingSong, editSong, setEditSong, darkMode
  } = props;
  const [user, setUser] = useState(null);
  const [songs, setSongs] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorEditingUser, setErrorEditingUser] = useState(null);
  const [showDeleteSongPopup, setShowDeleteSongPopUp] = useState(false);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${BACKEND_URL}/song`, {
      headers: {
        'auth': `${getToken()}`
      },
    });
    eventSource.onmessage = function(event) {
      const data = JSON.parse(event.data);
      setSongs(data);
    };
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/user');
        setUser(response.data);
        setName(response.data.name)
      } catch (error) {}
    };

    fetchData();
    return () => {
      eventSource.close();
    };
  }, []);

  const handleEditSong = (song) => {
    setSong(song.name);
    setArtist(song.artist);
    setLink(song.link);
    setSing(song.sing);
    setEditSong(song); 
  };
  
  const handleSaveEditedSong = async (e) => {
    console.log(e);
    e.preventDefault();
    if (!editSong) return;

    setLoading(true);
    try {
      const updatedSong = {
        name: song,
        artist: artist,
        link: link,
        sing: sing
      };
      const t= await axiosInstance.put(`/song/${editSong.id}`, updatedSong);
      setSongs(songs.map(song => song.id === editSong.id ? {...updatedSong, id: editSong.id, queue_position: editSong.queue_position} : song));
      setEditSong(null); 
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  
  const handleDeleteSong = async (id) => {
    try {
      await axiosInstance.delete(`/song/${id}`);
      const songs_temp = songs.filter((song) => song.id !== id);
      setSongs(songs_temp.map(song => song.id < id ? song : {...song, queue_position: song.queue_position - 1}));
    } catch (error) {}
    setShowDeleteSongPopUp(null);
  };

  const data = songs?.map(
    (song) => (
      <SongDiv id={song.id}>
      <SongPart>
        <Song
          key={song.id}
          queue_position={song.queue_position}
          name={song.name}
          link={song.link}
          sing={song.sing}
          artist={song.artist}
        />
      </SongPart>
      <Button onClick={() => handleEditSong(song)}><img src="pencil.svg"></img></Button>
      <Button onClick={() => setShowDeleteSongPopUp(song.id)}><img src="trash.svg"></img></Button>
      </SongDiv>
    )
  );

  return (
    <Div>
      {editUser ? 
        <H2>
          <Input type="text" value={name} darkMode={darkMode} onChange={(e) => setName(e.target.value)}></Input>
          <Button onClick={async () => {
            setLoading(true)
            try{
              await axiosInstance.put("/user", {
                name
              });
              setEditUser(false);
              setUser({...user, name });
            } catch(error){
              const data = error.response.data.detail;
              setErrorEditingUser(data.name);
            }
            setLoading(false);
          }} disabled={loading || !name.trim()}>Salvar</Button>
          <Button onClick={() => {
            setName(user.name)
            setEditUser(false)}
          }>Cancelar</Button>
          <p>{errorEditingUser}</p>
        </H2> : 
        <div>
          <H2>
            <Name>{user && user.name}</Name>
            <Button onClick={() => setEditUser(true)}><img src="pencil.svg"></img></Button>
          </H2>
        </div>
      }
      {data ? (
        <div>
          <H3>Suas músicas:</H3>
          <SongList>
            {data}
          <P>{data.length}/3</P>
          </SongList>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      {editSong && (
        <Popup
          showPopup={true}
          handleClosePopup={() => setEditSong(null)} 
          handleSubmit={handleSaveEditedSong}
          song={song}
          setSong={setSong}
          artist={artist}
          setArtist={setArtist}
          link={link}
          setLink={setLink}
          sing={sing}
          setSing={setSing}
          errorSong={errorSong}
          errorArtist={errorArtist}
          errorLink={errorLink}
          errorSing={errorSing}
          error={error}
          addingSong={addingSong}
          title={"Editar"}
          sendText={"Salvar"}
          darkMode={darkMode}
          component={AddSongForm}
        />
      )}
      {showDeleteSongPopup && (
        <Popup 
          showPopup={true} 
          component={DeleteForm}
          handleSubmit={() => handleDeleteSong(showDeleteSongPopup)}
          handleClosePopup={() => setShowDeleteSongPopUp(null)}
          song={songs.find((song) => song.id === showDeleteSongPopup)}
          darkMode={darkMode}
        />
      )}
    </Div>
  );
};

export default Profile;

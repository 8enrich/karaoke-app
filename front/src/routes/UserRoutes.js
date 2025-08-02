import { useState } from "react";
import NavBar from "../components/NavBar"
import usePopUpForm from "../hooks/usePopUpForm";
import AddSongButton from "../styles/AddSongButton";
import Popup from "../components/PopUp";
import AddSongForm from "../components/AddSongForm";

const UserRoutes = ({component: Component, darkMode: darkMode }) => {
  const { 
    song, 
    setSong, 
    artist, 
    setArtist, 
    link, 
    setLink, 
    sing,
    setSing,
    errorSong, 
    errorArtist, 
    errorLink, 
    errorSing,
    error, 
    handleAddSongClick, 
    showPopup, 
    handleClosePopup, 
    handleSubmit 
  } = usePopUpForm(); 
  const [editSong, setEditSong] = useState(null);
  return <>
    <NavBar darkMode={darkMode}/>
    <Component 
      darkMode={darkMode} 
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
      editSong={editSong}
      setEditSong={setEditSong}
    /> 
    <Popup
      showPopup={showPopup}
      handleClosePopup={handleClosePopup}
      handleSubmit={handleSubmit}
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
      darkMode={darkMode}
      component={AddSongForm}
    />
    <AddSongButton onClick={handleAddSongClick}>Adicionar música</AddSongButton>
  </>;
}

export default UserRoutes;

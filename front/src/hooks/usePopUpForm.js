import { useState } from 'react';
import axios from '../services/axios'

const usePopUpForm = () => {
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const [link, setLink] = useState('');
  const [sing, setSing] = useState('');
  const [errorSong, setErrorSong] = useState(null);
  const [errorArtist, setErrorArtist] = useState(null);
  const [errorLink, setErrorLink] = useState(null);
  const [errorSing, setErrorSing] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [addingSong, setAddingSong] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(addingSong) return;

    setAddingSong(true)

    try {
      const data = {
        name: song,
        link,
        artist,
        sing
      };
      await axios.post('/song', data);
      handleClosePopup();
    } catch (error) {
      const data = error.response.data.detail;
      if (typeof data === 'object') {
        setErrorSong(data.song);
        setErrorLink(data.link);
        setErrorArtist(data.artist);
        setErrorSing(data.sing);
      }
      setError(typeof data === 'string' ? data : null);
    }
    setAddingSong(false);
  };

  const handleClosePopup = () => {
    setSong('');
    setArtist('');
    setLink('');
    setSing('');
    setError('');
    setErrorSong('');
    setErrorArtist('');
    setErrorLink('');
    setErrorSing('');
    setShowPopup(false);
  };

  const handleAddSongClick = () => {
    setSong('');
    setLink('');
    setArtist('');
    setSing(true);
    setShowPopup(true);
  };

  return {
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
    showPopup,
    setShowPopup,
    handleSubmit,
    handleAddSongClick,
    handleClosePopup,
  };
};

export default usePopUpForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isAuthenticated, login } from '../services/auth';
import HomeForm from '../components/HomeForm'
import axiosInstance from '../services/axios';

const Home = (props) => {
  const [name, setName] = useState('');
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const [link, setLink] = useState('');
  const [sing, setSing] = useState(true);
  const [errorName, setErrorName] = useState(null);
  const [errorSong, setErrorSong] = useState(null);
  const [errorArtist, setErrorArtist] = useState(null);
  const [errorLink, setErrorLink] = useState(null);
  const [errorSing, setErrorSing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(loading) return;

    setLoading(true);

    try {

      if(!(await isAuthenticated())){
        const response = await axiosInstance.post('/user', {name});
        const token = response.data.detail;

        login(token);
      }

      const admin = await isAdmin();

      if(!admin){
        await axiosInstance.post('/song', {name: song, link, artist, sing});
      }

      navigate('/' + (admin ? 'admin' : 'profile'));
      setLoading(false);
    } catch (error) {
      const data = error.response?.data.detail;
      switch(typeof data){
        case "object":
          setErrorName(data.name);
          setErrorSong(data.song);
          setErrorLink(data.link);
          setErrorArtist(data.artist);
          setErrorSing(data.sing);
          break
        case "string":
          setError(typeof data === "string" ? data : "Erro do servidor");
          break
        default:
          break
      }
      setLoading(false);
    }
  };

  return (
    <HomeForm 
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      song={song}
      setSong={setSong}
      artist={artist}
      setArtist={setArtist}
      link={link}
      setLink={setLink}
      sing={sing}
      setSing={setSing}
      errorName={errorName}
      errorSong={errorSong}
      errorArtist={errorArtist}
      errorLink={errorLink}
      errorSing={errorSing}
      error={error}
      loading={loading}
      darkMode={props.darkMode}
    /> 
  );
};

export default Home;

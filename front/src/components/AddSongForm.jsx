import InputField from "./InputField";
import styled from "styled-components";
import Button from "../styles/Button";
import CustomToggleButton from "../styles/CustomToggleButton";
import { ToggleButtonGroup } from "@mui/material";

const H2 = styled.div`
  font-size: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0px 0px -80px 0px;
  h2 {
    margin: 0
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70vh;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

function AddSongForm(props) {
  const {
    handleSubmit,
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
    error,
    addingSong,
    sendText,
    title,
    handleClosePopup,
    darkMode
  } = props;
  const isButtonDisabled = (song.trim());
  return (
    <div>
      <H2>
        {title ? title : "Adicionar música"}
      </H2>
      <Form onSubmit={handleSubmit}>
        <InputField
          label="* Nome da música"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          error={errorSong}
        />
        <InputField
          label="Artista(Opcional)"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          error={errorArtist}
        />
        <InputField
          label="Link da música(Opcional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          error={errorLink}
        />
        <Div>
          <p>Escolha o que vai fazer: </p>
          <ToggleButtonGroup 
            exclusive 
            value={sing}
            onChange={(e, newValue) => {if(newValue !== null) setSing(newValue)}}
          >
            <CustomToggleButton
              value={true} 
              darkMode={darkMode}
            >Cantar
            </CustomToggleButton>
            <CustomToggleButton 
              value={false} 
              darkMode={darkMode}
              >Tocar
            </CustomToggleButton>
          </ToggleButtonGroup>
        </Div>
        <Div>
          <Button type="submit" disabled={addingSong} enabled={isButtonDisabled}>{sendText ? sendText : "Adicionar"}</Button>
          <Button className="close-btn" enabled={true} onClick={handleClosePopup}>
            Cancelar
          </Button>
        </Div>
        {error && <Error>{error}</Error>}
      </Form>
    </div>
  );
}

export default AddSongForm;

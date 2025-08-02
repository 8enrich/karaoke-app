import InputField from "./InputField";
import styled from "styled-components";
import { ToggleButtonGroup } from "@mui/material";
import CustomToggleButton from "../styles/CustomToggleButton"

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const DivLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  font-size: 16px;
  border: none;
  border-radius: 8px;
  padding: 20px 30px;
  margin: 7px;
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#ff964f")}; 
  color: white;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}; 
  @media(max-height: 400px){
    padding: 10px;
    font-size: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
`;

const H2 = styled.div`
  font-size: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: -80px;
  h2 {
    margin: 0px;
  }
  @media(max-height: 900px){  
    margin: 0px 0px -50px 0px;
  }
  @media(max-height: 400px){
    margin: 0px;
    font-size: 10px;
  }
`;

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

function HomeForm(props) {
  const {
    handleSubmit,
    name,
    setName,
    song,
    setSong,
    artist,
    setArtist,
    link,
    setLink,
    sing,
    setSing,
    errorName,
    errorSong,
    errorArtist,
    errorLink,
    error,
    loading,
    darkMode
  } = props;

  const isButtonDisabled = !(name.trim()) || !(song.trim()) || sing === null;

  return (
    <Div>
      <H2>
        <h2>Adicione</h2>
        <h2>uma música:</h2>
      </H2>
      <Form onSubmit={handleSubmit}>
        <InputField
          label="* Seu Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errorName}
          darkMode={darkMode}
        />
        <InputField
          label="* Música"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          error={errorSong}
          darkMode={darkMode}
        />
        <InputField
          label="Artista(Opcional)"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          error={errorArtist}
          darkMode={darkMode}
        />
        <InputField
          label="Link da música(Opcional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          error={errorLink}
          darkMode={darkMode}
        />
        <DivLine>
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
        </DivLine>
        <Button type="submit" disabled={isButtonDisabled || loading}>
          Adicionar
        </Button>
        {error && <Error>{error}</Error>}
      </Form>
    </Div>
  );
}

export default HomeForm;

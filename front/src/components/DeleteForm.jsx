import { styled } from "styled-components";
import Button from "../styles/Button";

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const DeleteForm = (props) => {
  const {
    handleSubmit,
    handleClosePopup,
    song
  } = props;
  return (
    <div>
      <h2>
        Tem certeza que deseja deletar a música "{song.name}", você perderá a {song.queue_position}° posição da fila
      </h2>
      <Div>
        <Button enabled={true} onClick={handleSubmit}>Sim</Button>
        <Button enabled={true} onClick={handleClosePopup}>Não</Button>
      </Div>
    </div>
  )
}

export default DeleteForm;

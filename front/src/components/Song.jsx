import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  border: solid 2px;
  border-radius: 20px;
  padding: 20px;
  gap: 30px;
  margin: 0px 20px 10px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

const PositionDiv = styled.div` 
  min-width: 30px;
  display: flex;
  width: 10%;
  font-size: 30px;
`

const LabelDiv = styled.div`
  min-width: 30px;
  display: flex;
`;

const DivSong = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`

function Song(props) {
  return (
    <Div id={props.id} >
      <PositionDiv>{props.queue_position + "°"}</PositionDiv>
      <DivSong>
        <LabelDiv>{props.name + (props.artist ? " - " + props.artist : "")}</LabelDiv>
        {props.user && <LabelDiv>{props.user}</LabelDiv>}
      </DivSong>
    </Div>
  );
}

export default Song;

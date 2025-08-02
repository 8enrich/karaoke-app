import styled from "styled-components";

const Input = styled.input`
  font-size: 20px;
  border: solid 1px;
  border-color: ${(props) => (props.haserror) ? "red" : (props.darkMode ? "white" : "black")};
  border-radius: 5px;
  padding: 6px;
  max-height: 35px; 
  color: ${(props) => (props.haserror) ? "red" : (props.darkMode ? "white" : "black")};
  background-color: ${(props) => props.darkMode ? "black" : "white"};
  @media(max-height: 400px){
    font-size: 10px;
    padding: 4px;
  }
`

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-items: center; 
  flex-direction: column;
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

function InputField({ label, value, onChange, error, darkMode }) {

  return (
    <Div>
      <Input type="text" placeholder={label} value={value} onChange={onChange} haserror={error} darkMode={darkMode}/>
      <Error>
        {error && <p>{"* " + error}</p>}
      </Error>
    </Div>
  );
}

export default InputField;

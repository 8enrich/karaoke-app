import { ToggleButton } from "@mui/material";
import { styled as muiStyled } from '@mui/material/styles';

const CustomToggleButton = muiStyled(ToggleButton)(({ darkMode }) => ({
  margin: '0 8px',
  border: `1px solid ${darkMode ? '#fff' : '#ccc'}`,
  color: darkMode ? '#fff' : '#000',
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: darkMode ? '#333' : '#f0f0f0',
  },

  '&.Mui-selected': {
    backgroundColor: '#ff964f',
    color: '#fff',
    borderColor: '#ff964f',
  },

  '&.Mui-selected:hover': {
    backgroundColor: '#ff7f2a',
  },

  '&:not(:first-of-type)': {
    borderLeft: `1px solid ${darkMode ? '#fff' : '#ccc'} !important`,
  },
}));

export default CustomToggleButton;

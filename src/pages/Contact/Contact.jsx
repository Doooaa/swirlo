
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import contactImage from  "../../assets/contactus.jpg";
import AboutBg from "../../components/AboutSec/AboutBg";
import ContactInfo from "../../components/conactInfo/contactInfo";

export default function Contact() {
  return <>
  
      <AboutBg
        title="Contact Us"
        subtitle="Home / Contact Us"
        backgroundImage={contactImage}
      />
      <ContactInfo></ContactInfo>
      

  </>;
  
}



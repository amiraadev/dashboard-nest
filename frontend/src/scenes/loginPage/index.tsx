import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { ThemeOptions } from "theme";
import { useState } from "react";

const LoginPage = () => {
	const theme = useTheme() as ThemeOptions;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  
  return (
    <Box>
      <Box
        width="100%" sx={{ backgroundColor: `${theme.palette.background.alt}` }} 
       
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Amiradev
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{ backgroundColor: `${theme.palette.background.alt}` }}
      >
  
       {isLogin && <LoginForm setPageType={setPageType}/>} 

       {isRegister && <RegisterForm />} 
      </Box>
    </Box>
  );
};

export default LoginPage;
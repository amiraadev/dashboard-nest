/** @format */

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { StateProps } from "./types";
import { ThemeMode } from "./theme";
import Navbar from "./scenes/navbar";

function App() {

	const mode = useSelector((state:StateProps) => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode as ThemeMode)), [mode]);
	const isAuth = Boolean(useSelector((state:StateProps) => state.token));
	return (
		<div className='app'>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
          <Navbar/>
					<Routes>
						<Route path='/' element={<LoginPage />} />
						<Route path='/home' element={<HomePage />} />
						<Route path='/profile/:userId' element={<ProfilePage />} />
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;

/** @format */

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
	setPageType: (newPageType: string) => void;
  }

const validationSchema = yup.object({
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password should be of minimum 8 characters length")
		.required("Password is required"),
});


const FormModal: React.FC<LoginFormProps> = ({ setPageType }) => {
    const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			email: "rabeb_mejri@yahoo.com",
			password: "123456",
		},
		validationSchema: validationSchema,
		onSubmit:  async (values) => {
            try {
                const response = await axios.post(
                  "http://localhost:5005/auth/login",
                  values
                );
                console.log("Form submitted successfully:", response.data);
                const token = response.data.access_token;
                Cookies.set('token', token)
                navigate("/home")
          
              } catch (error) {
                console.error("Error submitting form:", error);
              }
            },
		})

	
    

	return (
        
		<Card sx={{ padding: 5 }}>
			<CardHeader
				title='Welcome back'
				subheader='Login to your account'
				sx={{ textAlign: "center" }}
			/>
			<hr />
			<div>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						fullWidth
						id='email'
						name='email'
						label='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						sx={{ marginBottom: 3, marginTop: 3 }}
					/>
					<TextField
						fullWidth
						id='password'
						name='password'
						label='Password'
						type='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						sx={{ marginBottom: 3 }}
					/>
					<Button
						color='primary'
						variant='contained'
						fullWidth
						type='submit'
						sx={{ marginBottom: 3, marginTop: 3 }}>
						Submit
					</Button>
				</form>
				<hr />
                <p>Don't have an account? <span onClick={()=>setPageType("register")} style={{ textDecoration: 'underline', fontWeight: 'bold',cursor: "pointer" }}>Sign Up here</span></p>
				
			</div>
		</Card>
	);
};

export default FormModal;

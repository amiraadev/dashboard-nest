/** @format */

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Grid } from "@mui/material";

interface LoginFormProps {
	setPageType: (newPageType: string) => void;
}

const validationSchema = yup.object({
	firstName: yup.string().required("FirstName is required"),
	lastName: yup.string().required("LastName is required"),
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password should be of minimum 8 characters length")
		.required("Password is required"),
	location: yup.string(),
	occupation: yup.string(),
});

const FormModal: React.FC<LoginFormProps> = ({ setPageType }) => {
	const formik = useFormik({
		initialValues: {
			firstName: "samar",
			lastName: "yahyawi",
			email: "samar_yahyawi@yahoo.com",
			password: "123456",
			location: "",
			occupation: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			// console.log(JSON.stringify(values));

			try {
				await axios.post("http://localhost:5005/auth/register", values);
				// console.log("Form submitted successfully:", response.data);
                toast.success("Successfully registered");
				setPageType("login");
			} catch (error) {
				console.error("Error submitting form:", error);
			}
		},
	});

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
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='First Name'
								margin='normal'
								id='firstName'
								name='firstName'
								type='text'
								value={formik.values.firstName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.firstName && Boolean(formik.errors.firstName)
								}
								helperText={formik.touched.firstName && formik.errors.firstName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Last Name'
								margin='normal'
								id='lastName'
								name='lastName'
								type='text'
								value={formik.values.lastName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.lastName && Boolean(formik.errors.lastName)
								}
								helperText={formik.touched.lastName && formik.errors.lastName}
							/>
						</Grid>
					</Grid>
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
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Occupation'
								margin='normal'
								id='occupation'
								name='occupation'
								type='text'
								value={formik.values.occupation}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.occupation && Boolean(formik.errors.occupation)
								}
								helperText={
									formik.touched.occupation && formik.errors.occupation
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Location'
								margin='normal'
								id='location'
								name='location'
								type='text'
								value={formik.values.location}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.location && Boolean(formik.errors.location)
								}
								helperText={formik.touched.location && formik.errors.location}
							/>
						</Grid>
					</Grid>
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
				<p>
					Already have an account?{" "}
					<span
						onClick={() => setPageType("login")}
						style={{
							textDecoration: "underline",
							fontWeight: "bold",
							cursor: "pointer",
						}}>
						Login
					</span>
				</p>
			</div>
		</Card>
	);
};

export default FormModal;

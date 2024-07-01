import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    Avatar,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
    Link,
} from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockPersonIcon from '@mui/icons-material/LockPerson';

const paperStyle = {
    padding: "30px 20px",
    width: 450,
    margin: "20px auto"
}

const avatarStyle = {
    backgroundColor: "grey",
    height: "80px",
    width: "80px"
}

const btnStyle = {
    margin: "8px auto"
}

function Login({ login }) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => {
            return { ...prevData, [name]: value };
        });
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/user/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            localStorage.setItem('User', JSON.stringify(res.data.data));
            localStorage.setItem('accessToken', res.data.token);
            login();
            navigate('/main');
        } catch (err) {
            console.error(err);
            alert("Login Failed");
        }
    }

    return (
        <Grid container justifyContent="center">
            <Paper elevation={10} style={paperStyle}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <h2>SignIn</h2>
                    <Avatar style={avatarStyle}>
                        <AccountCircleRoundedIcon sx={{ fontSize: "80px" }} />
                    </Avatar>
                </Grid>
                <Grid>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: "10px 0" }}>
                            <AccountCircle sx={{ mr: 1 }} />
                            <TextField
                                name="username"
                                type="email"
                                label="Username"
                                placeholder="Username"
                                variant="standard"
                                fullWidth
                                required
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: "10px 0" }}>
                            <LockPersonIcon sx={{ mr: 1 }} />
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                variant="standard"
                                fullWidth
                                required
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "10px 0" }}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
                            <Typography><Link href="#">Forgot your password?</Link></Typography>
                        </Box>
                        <Typography>Don't have an account? <Link href="/register">Register</Link></Typography>
                        <Button style={btnStyle} type="submit" color="primary" variant="contained" fullWidth>Login</Button>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login;

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const paperStyle = {
    padding: "30px 20px",
    width: 450,
    margin: "20px auto"

}


function Registration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        DOB: "",
        username: "",
        password: ""
    });
    const handelSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData);
        try {
            const res = await axios.post("http://localhost:8080/user/register",
                formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );
            // console.log(res.data.data);
            localStorage.setItem('User', JSON.stringify(res.data.data));
            localStorage.setItem('accessToken', res.data.token);
            if (res.status === 200) {
                alert("Registration Successfull");
                navigate("/");
            }
            else if (res.status === 400) {
                alert("Registration Failure");
            }
            else {
                alert("Registration Failure");
            }
            setFormData({
                name: "",
                DOB: "",
                username: "",
                password: ""
            })
        }
        catch (err) {
            console.log("Axios Error: " + err);
            alert("Registration failure");
        }
    }
    const handelInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((preData) => {
            return { ...preData, [name]: value };
        });
    }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar sx={{ backgroundColor: "red" }}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={{ margin: 0 }}>Sign Up</h2>
                    <Typography gutterBottom variant="caption">Fill the below details to create a Account !</Typography>
                </Grid>
                <form onSubmit={handelSubmit} >
                    <TextField
                        type="text"
                        fullWidth
                        label="Name"
                        placeholder="Enter your name"
                        name="name"
                        id="name"
                        required
                        sx={{ mb: 1 }}
                        onChange={handelInputChange}
                    />
                    <TextField
                        type="date"
                        fullWidth
                        label="DOB"
                        placeholder="Enter you DOB"
                        name="DOB"
                        id="DOB"
                        required
                        sx={{ mb: 1 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handelInputChange}
                    />
                    <TextField
                        type="email"
                        fullWidth
                        label="Username"
                        placeholder="Enter Username"
                        name="username"
                        id="username"
                        required
                        sx={{ mb: 1 }}
                        onChange={handelInputChange}
                    />
                    <TextField
                        type="password"
                        fullWidth
                        label="Password"
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                        required
                        sx={{ mb: 1 }}
                        onChange={handelInputChange}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
                </form >
            </Paper >
        </Grid >
    )
}

export default Registration;
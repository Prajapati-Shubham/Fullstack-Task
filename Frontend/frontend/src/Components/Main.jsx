import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Table,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton
} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";

function getStatusIcon(status) {
    switch (status) {
        case "Active":
            return (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon style={{ color: "green" }} />
                    <span style={{ marginLeft: 5, color: "green" }}>{status}</span>
                </div>
            );
        case "Suspended":
            return (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon style={{ color: "red" }} />
                    <span style={{ marginLeft: 5, color: "red" }}>{status}</span>
                </div>
            );
        case "Inactive":
            return (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon style={{ color: "yellow" }} />
                    <span style={{ marginLeft: 5, color: "yellow" }}>{status}</span>
                </div>
            );
        default:
            return null;
    }
}

const data = [
    {
        id: 1,
        name: "John Doe",
        avatar: "https://via.placeholder.com/50",
        dateCreated: "2022-02-28",
        role: "Admin",
        status: "Active",
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "https://via.placeholder.com/50",
        dateCreated: "2022-03-01",
        role: "User",
        status: "Inactive",
    },
    {
        id: 3,
        name: "Jane Smith",
        avatar: "https://via.placeholder.com/50",
        dateCreated: "2022-03-01",
        role: "User",
        status: "Suspended",
    },
];

function Main() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const storedUserData = JSON.parse(localStorage.getItem("userData"));

        if (!token || !storedUserData) {
            setIsLoggedIn(false);
        } else {
            // Verify token against stored token
            const { token: storedToken } = storedUserData;
            console.log(storedToken)
            if (token !== storedToken) {
                setIsLoggedIn(false);
            } else {
                setUserData(storedUserData);
            }
            if (!isLoggedIn) {
                alert("You must be logged in to access this page");
                navigate("/");
            }
        }
    }, [navigate,isLoggedIn]);



    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Date Created</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Avatar src={row.avatar} />
                                    <span>{row.name}</span>
                                </Stack>
                            </TableCell>
                            <TableCell>{row.dateCreated}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{getStatusIcon(row.status)}</TableCell>
                            <TableCell>
                                <IconButton>
                                    <SettingsIcon sx={{ color: "blue" }} />
                                </IconButton>
                                <IconButton>
                                    <CancelIcon sx={{ color: "red" }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Main;

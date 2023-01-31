import TeacherEssay from "../components/teachers/TeacherEssay";
import Sidebar from "../components/Sidebar";
import React from "react";
import { Box } from "@mui/material";

const TeacherEssayPage = () => {
    return (
        <div>
            <Box
                sx={{
                    height: "100vh",
                    overflowY: "hidden",
                    display: "flex",
                }}
            >
                <Sidebar />
                <TeacherEssay />
            </Box>
        </div>
    );
};

export default TeacherEssayPage;

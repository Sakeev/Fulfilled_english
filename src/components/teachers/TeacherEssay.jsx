import { Button, List, ListItem } from "@mui/material";
import React, { useEffect } from "react";
import { useEssay } from "../../contexts/EssayContextProvider";
import studentImg from "../../assets/images/student.jpg";

const container = {
    width: "75%",
    margin: "0 auto",
    marginTop: "50px",
    maxHeight: "90vh",
    height: "80vh",
    border: "1px solid #9bd0cb",
    borderRadius: "10px",
    padding: "20px",
};

const headers = {
    color: "#006D77",
    width: "100%",
    borderBottom: "1px solid #9bd0cb",
    height: "5%",
    display: "flex",
};

const btnStyle = {
    margin: "10px 5px",
    backgroundColor: "#9bd0cb",
    color: "#006D77",
    textTransform: "upper",
    "&:hover": {
        backgroundColor: "#006D77",
        color: "#9bd0cb",
    },
};

const TeacherEssay = () => {
    const { students, getStudents } = useEssay();

    useEffect(() => {
        getStudents();
    }, []);

    console.log(students);

    return (
        <div style={container}>
            <div style={headers}>
                <h2>Students list</h2>
            </div>
            <ul
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    listStyle: "none",
                }}
            >
                {students?.map((student, index) => (
                    <li
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            borderBottom: "1px solid #9bd0cb",
                            marginBottom: "1rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={studentImg}
                                alt="student image"
                                style={{
                                    width: "4rem",
                                    height: "4rem",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    margin: "1rem",
                                }}
                            />
                            <p style={{ fontSize: "1.2rem", color: "#006D77" }}>
                                {student.email}
                            </p>
                        </div>
                        <Button
                            sx={{
                                ...btnStyle,
                                width: "auto",
                                marginRight: "5%",
                            }}
                        >
                            send essay
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherEssay;

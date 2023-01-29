import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEssay } from "../../contexts/EssayContextProvider";
import api from "../../http";

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

const textareaStyle = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: "1rem",
    width: "70%",
    height: "50%",
    borderRadius: "16px",
    border: "2px solid #006D77",
    marginBottom: "1rem",
    padding: "0.5rem 0.75rem",
    resize: "none",
};

const Essay = () => {
    const [essayText, setEssayText] = useState("");
    const [essayError, setEssayError] = useState(false);
    const [sent, setSent] = useState(false);
    // const [editText, setEditText] = useState();
    // const [highlightedParts, setHighlightedParts] = useState([]);
    // const textRef = useRef();
    // const colorInputRef = useRef();

    const { getEssay, essay } = useEssay();

    useEffect(() => {
        getEssay();
    }, []);

    console.log(essay);

    const API = "http://35.238.162.84/";

    const sendEssay = async () => {
        // if (essay.split(' ').length < 10) return setEssayError(true);
        const data = {
            text: essayText,
            accepted: true,
        };

        await api.patch(`${API}room/essa/${essay.id}/`, data);
        console.log("success");
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Box
                sx={{
                    paddingLeft: "20%",
                    paddingTop: "5%",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    sx={{
                        paddingBottom: "5%",
                        color: "#006D77",
                        fontWeight: "bold",
                        fontSize: "32px",
                    }}
                >
                    Essay
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingBottom: "5%",
                    }}
                >
                    <Typography
                        sx={{
                            paddingRight: "51.5%",
                            color: "#006D77",
                            fontSize: "24px",
                            fontWeight: "bold",
                        }}
                    >
                        Тема: {essay.title}
                    </Typography>
                    <Button sx={btnStyle}>перевести</Button>
                </Box>
                <textarea
                    readOnly={essay.accepted}
                    onChange={(e) => setEssayText(e.target.value)}
                    style={textareaStyle}
                    value={essay.accepted ? essay.text : essayText}
                ></textarea>
                {essayError && (
                    <p style={{ marginBottom: "1rem", color: "#006D77" }}>
                        Эссе должно состоять минимум из 50 слов.
                    </p>
                )}
                <Button
                    onClick={() => sendEssay(essayText)}
                    sx={{
                        ...btnStyle,
                        width: "12%",
                    }}
                >
                    {essay.accepted ? "Эссе отправлено" : "Отправить"}
                </Button>
            </Box>
        </div>
    );
};

export default Essay;

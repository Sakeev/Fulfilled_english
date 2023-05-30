import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useClassWork } from "../../contexts/ClassWorkContextProvider";

const Notes = () => {
  const { getNotes, notes } = useClassWork();

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <Box sx={{ width: "80%" }}>
        <Paper
          elevation={1}
          sx={{
            m: 5,
            height: "78vh",
            width: "95%",
            p: 2,
            bgcolor: "#f2fcff",
            borderRadius: "10px 10px 10px 10px",
          }}
        >
          <h2>Список заметок</h2>
          <Box
            sx={{
              width: "100%",
              m: 2,
            }}
          >
            <ul>
              {notes.map((note) => {
                const regex = /(&nbsp;)+/g;
                const textWithoutTags = note.body.replace(regex, "\n");
                const textWithoutExtraSpaces = textWithoutTags
                  .trim()
                  .replace(/\s+/g, " ");
                return (
                  <li key={note.id}>
                    Lesson {note.lesson}:{" "}
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: textWithoutExtraSpaces,
                      }}
                    ></pre>
                  </li>
                );
              })}
            </ul>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Notes;

import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useClassWork } from "../../contexts/ClassWorkContextProvider";
import { formatText } from "../../helpers/funcs";

const Notes = () => {
  const { getNotes, notes } = useClassWork();

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Box sx={{ width: "85%", overflowY: "auto" }}>
        <Paper
          elevation={1}
          sx={{
            m: 5,
            width: "93%",
            minHeight: "90vh",
            p: 2,
            bgcolor: "#f2fcff",
            borderRadius: "10px 10px 10px 10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              marginBlock: "1em",
              height: "auto",
            }}
          >
            <Box sx={{ columns: { xl: 4, lg: 3, md: 2, sm: 2, xs: 1 } }}>
              {notes.map((note) => {
                return (
                  <Box
                    style={{
                      breakInside: "avoid",
                    }}
                    key={note.id}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        marginBottom: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Typography variant="h6" color="#e29578">
                          Note from lesson - {note.lesson}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: formatText(note),
                            }}
                          ></p>
                        </Typography>
                      </div>
                    </Paper>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Notes;

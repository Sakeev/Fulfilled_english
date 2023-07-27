import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { createTheme, Link, ThemeProvider } from "@mui/material";
import sticker from "../assets/images/sidebar.svg";
import Logo from "../assets/images/logo.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C5E5E2",
    },
    secondary: {
      main: "#E29578",
    },
  },
});

export default function Appbar() {
  const { isTeacher, checkAuth, logout } = useAuth();

  const navigate = useNavigate();
  const foo = () => {
    logout();
    navigate("/");
  };

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  const sidebarStyle = {
    display: "flex",
    flexDirection: "column",
    width: "18vw",
    minWidth: "200px",
    height: "100vh",
    boxShadow: "rgba(0, 0, 0, 0.10) 1.6px 1.95px 2.6px;",
    // borderRight: '2px solid #C5E5E2',
    position: "fixed",
  };

  const sidebarContainer = {
    maxWidth: "20vw",
    width: "18vw",
    minWidth: "200px",
  };

  const btnStyle = {
    margin: "10px auto",
    width: "90%",
    backgroundColor: "#C5E5E2",
    color: "#006D77",
    borderRadius: "10px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#9bd0cb",
    },
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body3"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}Fluent English {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Box sx={sidebarContainer}>
      <Box sx={sidebarStyle}>
        <Link href="/" underline="none">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 5,
              cursor: "pointer",
            }}
            // onClick={() => navigate("/")}
          >
            <img
              src={Logo}
              alt="logo"
              style={{ width: "40px", marginLeft: "30px", mt: 2 }}
            />
            <Box>
              <Typography
                component={"p"}
                style={{
                  marginLeft: "20px",
                  color: "#006d77",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Fluent
              </Typography>
              <Typography
                component={"p"}
                style={{
                  marginLeft: "20px",
                  color: "#006d77",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                English
              </Typography>
            </Box>
          </Box>
        </Link>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            mt: 3,
          }}
        >
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button sx={btnStyle} onClick={() => navigate("/tasks")}>
                Homework
              </Button>
              <Button sx={btnStyle} onClick={() => navigate("/essay ")}>
                Essay
              </Button>
              {isTeacher ? (
                <Button sx={btnStyle} onClick={() => navigate("/students")}>
                  Students
                </Button>
              ) : null}
              {/* <Link underline="none" href="/schedule"> */}
              <Button sx={btnStyle} onClick={() => navigate("/schedule")}>
                Schedule
              </Button>
              {/* </Link> */}
              <Button sx={btnStyle} onClick={foo}>
                Log out
              </Button>
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              <img src={sticker} alt="" style={{ width: "160px" }} />
            </Box>
            <Box>
              <Typography variant="p">
                <Copyright
                  sx={{
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </Typography>
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
}

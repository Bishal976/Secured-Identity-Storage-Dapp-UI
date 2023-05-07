import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

import logo from "../../assets/logo.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <Box className="navbar">
      <Box className="navbar-links">
        <Box className="navbar-links_logo">
          <img src={logo} alt="company logo" />
        </Box>
        <ul className="navbar-links_container">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#uploads">Uploads</a>
          </li>
          <li>
            <a href="#share">Share</a>
          </li>
          <li>
            <a href="#footer">About Us</a>
          </li>
        </ul>
      </Box>
      <Box className="navbar-sign" sx={{ display: { xs: "none", md: "flex" } }}>
        <p>Sign in</p>
        <Button type="button" color="error" variant="contained">
          Sign up
        </Button>
      </Box>
      <Box className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <Box className="navbar-menu_container scale-up-center">
            <ul className="navbar-menu_container-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#uploads">Uploads</a>
              </li>
              <li>
                <a href="#share">Share</a>
              </li>
              <li>
                <a href="#footer">About Us</a>
              </li>
            </ul>
            <Box
              className="navbar-sign"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <p>Sign in</p>
              <Button type="button" color="error" variant="contained">
                Sign up
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;

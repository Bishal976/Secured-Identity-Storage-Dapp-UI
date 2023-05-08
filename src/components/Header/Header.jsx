import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "./header.css";
import ai from "../../assets/ai.png";

const Header = () => {
  return (
    <Box
      id="home"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        p: "4rem",
      }}
    >
      <Box
        sx={{
          width: { xs: "97%", md: "60%" },
          alignSelf: "center",
          pl: { xs: "0", md: "6rem" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          className="gradient__text"
          variant="h1"
          color="white"
          sx={{ mb: "2rem" }}
        >
          Secured Identity Storage Dapp
        </Typography>
        <Typography
          variant="h5"
          color="white"
          sx={{ fontWeight: "400", width: "90%" }}
        >
          Store your sensitive data in a decentralized fashion using this
          secured indentity storage decentralized application, By leveraging the
          cutting edge technology of Web3 and security of blockchain.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={ai} alt="ai" height="500px" width="500px" />
      </Box>
    </Box>
  );
};

export default Header;

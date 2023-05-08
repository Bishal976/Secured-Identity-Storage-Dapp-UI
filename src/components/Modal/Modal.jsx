import { useEffect, useState } from "react";

import "./modal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

import possibility from "../../assets/possibility.png";

const Modal = ({ contract }) => {

  const [addressList, setAddressList] = useState([]);

  const grantSharing = async () => {
    const address = document.querySelector("#address").value;
    console.log(address);
    // allowing the address to access the data of current account
    await contract.allow(address);
    alert("Access granted");
  };

  const revokeAccess = async () => {
    const address = document.querySelector("#address").value;
    // revoking the access of the address to access the data of current account
    await contract.disallow(address);
    alert("Access Revoked");
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      const options = addressList;
      console.log("these are addresses", options);
      setAddressList(options);
    };
    contract && accessList();
  }, [contract]);

  return (
    <Box
      className="modal-gradient__bg"
      id="share"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      <Box>
        <img src={possibility} alt="possibility" height="500px" width="500px" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: "7rem", md: "4rem" },
          width: "50%",
        }}
      >
        <Typography variant="h3" color="white" sx={{ pb: "2rem" }}>
          Share with
        </Typography>
        <Box sx={{ m: "0 2rem 3rem" }}>
          <TextField
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "25rem",
              height: "4rem",
            }}
            variant="outlined"
            id="address"
            label="Enter Address"
          />
        </Box>
        <Paper sx={{ backgroundColor: "#031b34" }}>
        <Typography variant="h4" color="white" sx={{textAlign:'center'}}>People with Access</Typography>
        <List
          component="nav"
          aria-label="List of Accounts having access of current account"
          sx={{ backgroundColor: "rgba(71, 98, 130, 0.2)", width:'40rem' }}
        >
          {addressList.map((address)=>{
            if(address[1] === true)
            return(
                <ListItemText key="address" primary={address} sx={{ color: "white", textAlign:'center' }} />
            )
          })}
        </List>
      </Paper>
        <Box sx={{ display: "flex", gap: "2rem", mt: "2rem" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => revokeAccess()}
            id="RevokeBtn"
          >
            Revoke
          </Button>
          <Button variant="contained" onClick={() => grantSharing()}>
            Share
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Modal;

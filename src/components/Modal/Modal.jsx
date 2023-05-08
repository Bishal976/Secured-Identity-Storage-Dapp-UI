import { useEffect } from "react";

import './modal.css';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import possibility from '../../assets/possibility.png';

const Modal = ({ contract }) => {
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
      let select = document.querySelector("#idWithAccess");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <Box className="modal-gradient__bg" id="share" sx={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'2rem'}}>
      <Box>
        <img src={possibility} alt="possibility" height="500px" width="500px" />
      </Box>
      <Box
        sx={{
          p: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p:{xs:'7rem', md:'4rem'},
          width:"50%"

        }}
      >
        <Typography variant="h3" color="white">Share with</Typography>
        <Box sx={{ m: "0 2rem 3rem" }}>
          <input
            variant="standard"
            id="address"
            placeholder="Enter Address"
          />
        </Box>
        <form id="myForm">
          <select id="idWithAccess">
            <option>People With Access</option>
          </select>
        </form>
        <Box sx={{ display: "flex", gap: "2rem", mt: "2rem" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => revokeAccess()
            }
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

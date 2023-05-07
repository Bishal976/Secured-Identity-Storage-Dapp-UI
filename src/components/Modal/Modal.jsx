import { useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const Modal = ({ setModalOpen, contract }) => {
  const grantSharing = async () => {
    const address = document.querySelector(".address").value;
    // allowing the address to access the data of current account
    await contract.allow(address);
    setModalOpen(false);
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
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "99vh",
        width: "100%",
        backgroundColor: "#ddd",
      }}
    >
      <Paper
        sx={{
          p: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Share with</Typography>
        <Box sx={{ m: "0 2rem 3rem" }}>
          <TextField
            variant="standard"
            className="address"
            label="Enter Address"
          />
        </Box>
        <form id="myForm">
          <select id="idWithAccess">
            <option className="address">People With Access</option>
          </select>
        </form>
        <Box sx={{ display: "flex", gap: "2rem", mt: "2rem" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setModalOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={() => grantSharing()}>
            Share
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
};
export default Modal;

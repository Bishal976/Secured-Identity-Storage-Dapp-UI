import { useState } from "react";

import "./Display.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    // Checks if the address is entered or not
    const Otheraddress = document.querySelector(".address").value;

    try {
      // If address is entered then it will display the data of that address else it will display the data of current account
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }

    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {
      console.log(dataArray);
      const str = dataArray.toString();
      const str_array = str.split(",");
      const images = str_array.map((item, i) => {
        let token = item.substring(7);
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${token}`}
              alt="Data received from blockchain"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <Box sx={{ p: "2rem", mb: "5rem" }}>
      <input
        type="text"
        placeholder="Enter Address to get data from blockchain"
        className="address"
      ></input>
      <Button variant="contained" sx={{ mt: "2rem" }} onClick={getdata}>
        Get Data
      </Button>
      <Paper sx={{ backgroundColor: "#031b34", p:'2rem', borderRadius:'2rem', mt:'2rem' }}>
        <div className="image-list">{data}</div>
      </Paper>
    </Box>
  );
};
export default Display;

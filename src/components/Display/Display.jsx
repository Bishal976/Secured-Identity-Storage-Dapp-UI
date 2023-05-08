import { useState } from "react";

import "./Display.css";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
    <Box sx={{p:'2rem',mb:'5rem'}}>
      <input
        type="text"
        placeholder="Enter Address to get data from blockchain"
        className="address"
      ></input>
      <Button variant="contained" sx={{mt:'2rem'}} onClick={getdata}>
        Get Data
      </Button>
      <div className="image-list">{data}</div>
    </Box>
  );
};
export default Display;

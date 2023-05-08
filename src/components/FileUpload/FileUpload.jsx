import { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "426b83cd5e1e9c548b05",
            pinata_secret_api_key:"a71ed418a1f82cf715f6335a90d0ba2a741dc782726db3b809644736e15dfb04",
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("File uploaded successfully");
        setFileName("No image selected");
        setFile(null);
      } catch (err) {
        alert("Unable to upload file");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <Box  id="uploads">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          <Typography variant="h3" color="white" sx={{mb:'2rem'}}>
            Choose File to Upload on IPFS
          </Typography>
        </label>
        <Button
          variant="outlined"
          component="label"
          disabled={!account}
          >
            Choose to Upload
            <input
            type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
            hidden/>
          </Button>
        <Typography variant="body" color="white" sx={{p:'2rem'}}>
          {fileName}
        </Typography>
        <Button type="submit" variant="contained" color="success" disabled={!file}>
          Upload File
        </Button>
      </form>
    </Box>
  );
};

export default FileUpload;

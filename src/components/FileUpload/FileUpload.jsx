import { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const FileUpload = ({ contract, account}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Please select a file");

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
            pinata_api_key: "80efbe8e9755876657b5",
            pinata_secret_api_key:
              "f4f5ff4383a528aee49f297074951764f07b671a6307e34eb13466f11afbc9f1",
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
    <Box>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          <Typography variant="h5">Choose File</Typography>
        </label>
        <input
          disabled={!account}
          id="file-upload"
          type="file"
          name="data"
          onChange={retrieveFile}
        />
        <Typography variant="body" >{fileName}</Typography>
        <Button type="submit" variant="contained" disabled={!file}>
          Upload File
        </Button>
      </form>
    </Box>
  );
};

export default FileUpload;

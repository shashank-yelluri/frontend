import { TextField, Button } from "@mui/material";
import { useState } from "react";
import "./measurments.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Measurments = ({ data, setOpen }) => {
  const [chest, setChest] = useState(data?.measurments?.chest || "");
  const [neck, setNeck] = useState(data?.measurments?.neck || "");
  const [shoulder, setShoulder] = useState(data?.measurments?.shoulder || "");
  const [cuffs, setCuffs] = useState(data?.measurments?.cuffs || "");
  const { id } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    const payload = {
      customerName: data.name,
      measurments: {
        chest: chest,
        neck: neck,
        shoulder: shoulder,
        cuffs: cuffs,
      },
    };

    await axios
      .post(`http://localhost:5001/user/${id}`, payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setOpen(false);
    window.location.reload(true); // Not the correct approach !
  };

  return (
    <div>
      <span className="heading">Measurments for {data.name}</span>
      <div className="first">
        <TextField
          variant="outlined"
          label="chest"
          value={chest}
          onChange={(e) => setChest(e.target.value)}
          size="small"
        />
        <TextField
          variant="outlined"
          label="neck"
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
          size="small"
          sx={{ marginLeft: 1 }}
        />
      </div>

      <div className="second">
        <TextField
          variant="outlined"
          label="shoulder"
          value={shoulder}
          onChange={(e) => setShoulder(e.target.value)}
          size="small"
        />
        <TextField
          variant="outlined"
          label="cuffs"
          value={cuffs}
          onChange={(e) => setCuffs(e.target.value)}
          size="small"
          sx={{ marginLeft: 1 }}
        />
      </div>

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Measurments;

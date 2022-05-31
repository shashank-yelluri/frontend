import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeId } from "../redux/user";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const payload = {
      email: email,
      password: pwd,
    };

    await axios
      .post("http://localhost:5001/signin", payload)
      .then(function (response) {
        dispatch(changeId(response.data.user._id));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Card
        sx={{
          width: 400,
          borderRadius: 3,
          p: 2,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <span className="title">Tailor's Login</span>
        <div className="field">
          <span>Email</span>
          <TextField
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
          />
        </div>
        <div className="field">
          <span>Password</span>
          <TextField
            variant="outlined"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            size="small"
          />
        </div>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default Login;

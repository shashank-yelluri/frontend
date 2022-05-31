import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Modal, Tooltip } from "@mui/material";
import Measurments from "./Measurments";
import "./dashboard.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [visit, setVisit] = useState(null);
  const { id } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  console.log(id);

  const handleEdit = (row) => {
    setVisit(row);
    setOpen(true);
  };

  const showModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Measurments data={visit} setOpen={setOpen} />
        </Box>
      </Modal>
    );
  };

  const handlelogout = () => {
    axios
      .get("http://localhost:5001/signout")
      .then(function (response) {
        navigate("/login");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="main">
      <div className="header">
        <span className="subhead">Welcome, {data?.name}</span>
        <Button variant="contained" size="small" onClick={handlelogout}>
          Signout
        </Button>
      </div>
      <div className="visits">
        <Card sx={{ width: 410, height: 250, borderRadius: 3, p: 2 }}>
          {data?.prevVisits.length === 0 ? (
            <div className="prev">
              <span>No previous history</span>
            </div>
          ) : (
            <p>Lets see !</p> /* Work on this TODO*/
          )}
        </Card>
        <Card
          sx={{
            width: 820,
            height: 250,
            borderRadius: 3,
            p: 2,
            marginLeft: 4,
            overflowY: "scroll",
          }}
        >
          <div className="sched-visits">
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#f2f2f2", fontWeight: 600 }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Measurments</TableCell>
                    <TableCell>Edit/Add</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.scheduledVisits.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {row.measurments ? (
                          <div className="recd">
                            <Tooltip
                              title={JSON.stringify(row.measurments)}
                              placement="top-start"
                            >
                              <HelpOutlineIcon
                                sx={{
                                  width: 18,
                                  marginRight: 1,
                                  cursor: "pointer",
                                }}
                              />
                            </Tooltip>

                            <span>Recieved </span>
                          </div>
                        ) : (
                          <span>Yet to recieve</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <EditIcon
                            sx={{ width: 20, cursor: "pointer" }}
                            onClick={() => handleEdit(row)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {open && showModal()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

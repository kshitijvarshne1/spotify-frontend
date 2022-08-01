import { Button, Box, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect, useCallback } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import "./homepage.css";

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const [openArtist, setOpenArtist] = React.useState(false);

  const [songs, setSongs] = React.useState([]);
  const [top10, setTop10] = React.useState([]);
  const [allArtist, setAllArtist] = React.useState([]);

  // api varibale
  const api = "http://localhost:5000/";

  const [songname, setSongName] = React.useState("");
  const [dateOfRelease, setDateOfRelease] = React.useState("");
  const [selectartistName, setSelectArtistName] = React.useState("1");
  const [songrating, setSongRating] = React.useState("");

  const [artistname, setArtistName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  function submitHandlerArtist(event) {
    event.preventDefault();

    const artistInfo = {
      name: artistname,
      dob: dateOfBirth,
    };
    addArtistHandler(artistInfo);
  }

  function submitHandlerSong(event) {
    event.preventDefault();

    const songInfo = {
      name: songname,
      date_of_release: dateOfRelease,
      artist_id: selectartistName,
      rating: songrating,
    };
    addSongHandler(songInfo);
  }

  const getAllSongs = useCallback(async () => {
    const response = await fetch(`${api}` + "getAllSong");
    const data = await response.json();
    setSongs(data.data);
  }, []);

  useEffect(() => {
    getAllSongs();
  }, [getAllSongs]);

  const get10Artist = useCallback(async () => {
    const response = await fetch(`${api}` + "get10Artist");
    const data = await response.json();
    setTop10(data.status);
  }, []);

  useEffect(() => {
    get10Artist();
  }, [get10Artist]);

  const getAllArtist = useCallback(async () => {
    const response = await fetch(`${api}` + "getAllArtist");
    const data = await response.json();
    setAllArtist(data.data);
  }, []);

  useEffect(() => {
    getAllArtist();
  }, [getAllArtist]);

  const addArtistHandler = async (artistInfo) => {
    const response = await fetch(`${api}` + "addArtist", {
      method: "POST",
      body: JSON.stringify(artistInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(data.status);
  };

  const addSongHandler = async (songInfo) => {
    const response = await fetch(`${api}` + "addSong", {
      method: "POST",
      body: JSON.stringify(songInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(data.status);
  };

  const onAddNewSong = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddNewArtist = () => {
    setOpenArtist(!openArtist);
  };

  const handleCloseArtist = () => {
    setOpenArtist(false);
  };

  return (
    <>
      {/* navbar */}
      <Box>
        <Button startIcon={<LibraryMusicIcon />} variant="text">
          Home
        </Button>
        <Divider />
      </Box>
      {/* navbar */}

      {/* top 10 songs table */}
      <Box>
        <div class="aa">
          <div class="title">Top 10 Songs</div>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={onAddNewSong}
          >
            Add New Song
          </Button>
        </div>
        <div class="table">
          <TableContainer component={Paper} sx={{ width: 800 }}>
            <Table sx={{ width: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Artwork</TableCell>
                  <TableCell align="left">Song</TableCell>
                  <TableCell align="left">Date of Release</TableCell>
                  <TableCell align="left">Artist</TableCell>
                  <TableCell align="right">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songs.map((row) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img src="https://random.imagecdn.app/100/50" />
                    </TableCell>
                    <TableCell align="left">{row.song_name}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">{row.artist_name}</TableCell>
                    <TableCell align="right">{row.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
      {/* top 10 songs table */}

      {/* top 10 artist table */}
      <Box>
        <div class="aa">
          <div class="title">Top 10 Artist</div>
        </div>
        <div class="table">
          <TableContainer component={Paper} sx={{ width: 800 }}>
            <Table sx={{ width: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Artist</TableCell>
                  <TableCell align="right">Date of Birth</TableCell>
                  <TableCell align="right">Songs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {top10.map((row) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.dob}</TableCell>
                    <TableCell align="right">
                      {row.listOfSong + "    "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
      {/* top 10 artist table */}

      {/* add new song dialog */}
      <Dialog open={open} fullScreen>
        <DialogTitle>
          <div class="heading">
            <div>Adding New Song</div>
            <CloseIcon onClick={handleClose} />
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={submitHandlerSong}>
            <div>
              <label>Song Name</label>
              <input
                type="text"
                value={songname}
                onChange={(e) => setSongName(e.target.value)}
                class="inputfields"
              />
            </div>
            <div>
              <label>Date of release</label>
              <input
                type="text"
                value={dateOfRelease}
                onChange={(e) => setDateOfRelease(e.target.value)}
                class="inputfields"
              ></input>
            </div>
            <div>
              <label>Rating</label>
              <input
                type="text"
                value={songrating}
                onChange={(e) => setSongRating(e.target.value)}
                class="inputfields"
              ></input>
            </div>
            <div>
              <label>Select Artist</label>
              <select
                onChange={(e) => setSelectArtistName(e.target.value)}
                class="inputfields"
              >
                {allArtist.map((option) => (
                  <option key={option.artist_id} value={option.artist_id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={onAddNewArtist}
              >
                Add New Artist
              </Button>
            </div>
            <div>
              <label>Submit</label>
              <input type="submit" class="inputfields" />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandlerSong}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* add new song dialog */}

      {/* add new artist table */}
      <Dialog open={openArtist}>
        <DialogTitle>
          <div class="heading">
            <div>Adding New Artist</div>
            <CloseIcon onClick={handleCloseArtist} />
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={submitHandlerArtist}>
            <div>
              <label>Artist Name</label>
              <input
                type="text"
                value={artistname}
                onChange={(e) => setArtistName(e.target.value)}
                class="inputfields"
              />
            </div>
            <div>
              <label>Date Of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                class="inputfields"
              ></input>
            </div>
            <div>
              <label>Submit</label>
              <input type="submit" class="inputfields" />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseArtist}>Cancel</Button>
          <Button onClick={submitHandlerArtist}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* add new artist table */}
    </>
  );
};
export default HomePage;

import React, { useState, useEffect } from "react";
import { About, Terms, Header } from "../../Model/Urls";
import {
  TextField,
  Grid,
  Button,
  ButtonGroup,
  CircularProgress,
} from "@material-ui/core";
import RTL from "../RTL";
import axios from "axios";
const Index = (props) => {
  const [about, setAbout] = useState(null);
  const [term, setTerm] = useState(null);
  const [disableAbout, setDisableAbout] = useState(true);
  const [disableTerms, setDisableTerms] = useState(true);
  const loadAbout = () => {
    axios
      .get(About.get, { headers: Header(true) })
      .then((result) => setAbout(result.data.data.text));
    setDisableAbout(true);
  };
  const loadTerm = () => {
    axios
      .get(Terms.get, { headers: Header(true) })
      .then((result) => setTerm(result.data.data.text));
    setDisableTerms(true);
  };
  useEffect(() => {
    //load about us information
    loadAbout();
    //load terms us information
    loadTerm();
  }, []);
  const saveAbout = () => {
    let text = about;
    setAbout("");
    let param = { Id: "1", Type: "1", Text: text };
    axios
      .put(About.edit, param, { headers: Header(true) })
      .then(() => loadAbout())
      .catch((error) => {
        console.clear();
        console.log(error);
      });
  };
  const saveTerm = () => {
    let text = term;
    setTerm("");
    let param = { Id: "2", Type: "2", Text: text };
    axios
      .put(About.edit, param, { headers: Header(true) })
      .then(() => loadTerm())
      .catch((error) => {
        console.clear();
        console.log(error);
      });
  };
  return (
    <div>
      <RTL>
        <Grid container style={{ padding: "6px" }}>
          <div>متن درباره ما</div>
          <Grid xs={12}>
            {about ? (
              <TextField
                disabled={disableAbout}
                fullWidth={true}
                variant="outlined"
                multiline={true}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid xs={12}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                disabled={!disableAbout}
                onClick={() => setDisableAbout(false)}
              >
                ویرایش
              </Button>
              <Button disabled={disableAbout} onClick={() => saveAbout()}>
                ذخیره
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container style={{ padding: "6px" }}>
          <div>متن قوانین ما</div>
          <Grid xs={12}>
            {term ? (
              <TextField
                disabled={disableTerms}
                fullWidth={true}
                variant="outlined"
                multiline={true}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid xs={12}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                disabled={!disableTerms}
                onClick={() => setDisableTerms(false)}
              >
                ویرایش
              </Button>
              <Button disabled={disableTerms} onClick={() => saveTerm()}>
                ذخیره
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </RTL>
    </div>
  );
};
export default Index;

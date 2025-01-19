import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
//Material ui components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

//external library
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
let cancelAxios = null;
function App() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");
  const direction = locale == "ar" ? "rtl" : "ltr";
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, []);
  useEffect(() => {
    setDateAndTime(moment().format("MMM Do YY"));
    // Make a request for a user with a given ID
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=93fa09887ad9bb6568745eab823a2ca2",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
        console.log(responseTemp, description, max, min);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      console.log("canelling");
      cancelAxios();
    };
  }, []);

  // Event handlers
  function handleLanguageClick() {
    if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("MMM Do YY"));
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* content container */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir={direction}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* content */}
              <div>
                {/* city and time */}
                <div
                  dir={direction}
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                    marginRight: "20px",
                  }}
                >
                  <Typography variant="h2" style={{ fontWeight: "600" }}>
                    {t("London")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/* city and time */}
                <hr />
                {/* DEGREE + CLOUD ICON */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* degree and description */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ textAlign: "right" }} variant="h1">
                        {temp.number}
                      </Typography>
                      <img src={temp.icon} />
                    </div>
                    {/* TEMP */}
                    <Typography variant="h6">{t(temp.description)}</Typography>
                    {/* min & max TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}: {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>

                      <h5>
                        {t("max")}: {temp.max}
                      </h5>
                    </div>
                    {/* min & max TEMP */}
                  </div>
                  {/* degree and description */}
                  <CloudIcon
                    style={{ fontSize: "200px", color: "white" }}
                  ></CloudIcon>
                </div>
                {/* DEGREE + CLOUD ICON */}
              </div>
              {/* content */}
            </div>
            {/* CARD */}
            {/* TRANSLATION BUTTON*/}
            <div
              dir={direction}
              style={{
                marginTop: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                style={{ color: "white" }}
                variant="text"
                onClick={handleLanguageClick}
              >
                {locale == "en" ? "Arabic" : "انجليزى"}
              </Button>
            </div>
          </div>
          {/* content container */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

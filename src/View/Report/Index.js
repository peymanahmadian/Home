import React, { useState, useEffect } from "react";
import { Header, Report, City, CityPart } from "../../Model/Urls";
import RTL from "../RTL";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import Table from "../Command/Table";
import axios from "axios";
import Loading from "../Command/Loading";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";
const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100% !important",
    paddingTop: "7px",
  },
  label: {
    fontSize: "11px",
  },
}));
const Index = () => {
  const [type, setType] = useState(Report.types[0].value);
  const [data, setData] = useState(null);
  const [col, setCol] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formVal, setFormVal] = useState({
    phoneNumber: "",
    cityId: "",
    neighborhoodId: "",
  });
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [city, setCity] = useState([]);
  const [parts, setParts] = useState([]);
  const classes = useStyles();
  const generateCol = (data) => {
    let colName = [];
    for (let col in data) {
      let word = null;
      switch (col.toLowerCase()) {
        case "fromdate":
          word = "از تاریخ";
          break;
        case "todate":
          word = "تا تاریخ";
          break;
        case "description":
          word = "توضیحات";
          break;
        case "amount":
          word = "مقدار";
          break;
        case "percent":
          word = "درصد";
          break;
        case "code":
          word = "کد";
          break;
        case "fullname":
          word = "نام کامل";
          break;
        case "type":
          word = "نوع";
          break;
        case "url":
          word = "آدرس";
          break;
        case "longitude":
          word = "طول جغرافیایی";
          break;
        case "latitude":
          word = "عرض جغرافیایی";
          break;
        case "categoryleveloneid":
          word = "شماره سطح اول";
          break;
        case "userid":
          word = "شماره";
          break;
        case "phonenumber":
          word = "شماره تلفن";
          break;
        case "firstname":
          word = "نام";
          break;
        case "lastname":
          word = "نام خانوادگی";
          break;
        case "isactive":
          word = "فعال";
          break;
        case "email":
          word = "ایمیل";
          break;
        case "tel":
          word = "شماره تلفن";
          break;
        case "id":
          word = "شماره";
          break;
        case "name":
          word = "نام";
          break;
        case "ischat":
          word = "قابلیت چت";
          break;
        case "cityname":
          word = "نام شهر";
          break;
        case "neighborhoodname":
          word = "نام شهرستان";
          break;
        case "address":
          word = "آدرس";
          break;
        case "registerdate":
          word = "شماره ثبت";
          break;
        default:
          word = col;
          break;
      }
      if (col === "url") {
        colName.push({
          title: word,
          field: col,
          render: (rowdata) => (
            <img
              height={"95px"}
              alt={"home"}
              src={`http://adv.sandboxdevelop.ir/${rowdata.url}.jpeg`}
            />
          ),
        });
      } else if (col === "fromDate") {
        colName.push({
          title: word,
          field: col,
          render: (rowdata) =>
            moment(rowdata.fromDate, "YYYY-MM-DDTHH:mm:SS").format(
              "jYYYY-jMM-jDD"
            ),
        });
      } else if (col === "toDate") {
        colName.push({
          title: word,
          field: col,
          render: (rowdata) =>
            moment(rowdata.toDate, "YYYY-MM-DDTHH:mm:SS").format(
              "jYYYY-jMM-jDD"
            ),
        });
      } else if (col === "id" || col === "userId") {
        colName.push({ title: word, field: col, hidden: true });
      } else if (col === "isActive") {
        colName.push({
          title: word,
          field: col,
          render: (rowdata) => (rowdata.isActive ? "فعال" : "غیرفعال"),
        });
      } else if (col === "registerDate") {
        colName.push({
          title: word,
          field: col,
          render: (rowdata) =>
            moment(rowdata.registerDate).format("jYYYY-jMM-jDD"),
        });
      } else {
        colName.push({ title: word, field: col });
      }
    }
    setCol(colName);
  };
  const loadData = (type) => {
    setLoading(true);
    setData(null);
    setCol(null);
    //create body
    let body = {};
    //cal form
    debugger;
    for (let item in formVal) {
      if (formVal[item]) {
        body[item] = formVal[item];
      }
    }
    debugger;
    if (fromDate && toDate) {
      body["fromDate"] = moment(fromDate).format("YYYY-MM-DD");
      body["toDate"] = moment(toDate).format("YYYY-MM-DD");
    }

    axios
      .get(`${Report.url}/${type}`, { headers: Header(true), params: body })
      .then((result) => {
        setLoading(false);
        setData(result.data.data);
        //set col
        generateCol(result.data.data[0]);
      })
      .catch(() => {
        setLoading(false);
        setData([]);
      });
  };
  useEffect(() => {
    axios.get(City.get, { headers: Header(true) }).then((response) => {
      setCity(response.data.data);
    });
  }, []);
  useEffect(() => {
    if (formVal.cityId) {
      axios
        .get(`${CityPart.get}/${formVal.cityId}`, { headers: Header(true) })
        .then((response) => {
          setParts(response.data.data);
        });
    }
  }, [formVal.cityId]);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setCol(null);
    //create body
    let body = {};
    //cal form
    for (let item in formVal) {
      if (formVal[item]) {
        body[item] = formVal[item];
      }
    }
    axios
      .get(`${Report.url}/${type}`, { headers: Header(true), params: body })
      .then((result) => {
        setLoading(false);
        setData(result.data.data);
        //set col
        generateCol(result.data.data[0]);
      })
      .catch(() => {
        setLoading(false);
        setData([]);
      });
  }, [type, formVal]);
  return loading ? (
    <Loading />
  ) : (
    <RTL>
      <Grid className={"header_input"}>
        <div>
          <label htmlFor="selectOne"> نوع گزارش </label>
          {Report.types && (
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              {Report.types.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      </Grid>
      <div style={{ flexGrow: "1" }}>
        <Grid container space={1}>
          {(type === Report.types[3].value ||
            type === Report.types[6].value ||
            type === Report.types[8].value) && (
            <>
              <Grid className={"col_item"} item xs={12} sm={6} md={3} lg={3}>
                <lable className={classes.label}>از تاریخ: </lable>
                <DatePicker
                  className={classes.fullWidth}
                  isGregorian={false}
                  value={fromDate}
                  onChange={(e) => setFromDate(e)}
                  timePicker={false}
                />
              </Grid>
              <Grid className={"col_item"} item xs={12} sm={6} md={3} lg={3}>
                <lable className={classes.label}>تا تاریخ: </lable>
                <DatePicker
                  className={classes.fullWidth}
                  isGregorian={false}
                  value={toDate}
                  onChange={(e) => setToDate(e)}
                  timePicker={false}
                />
              </Grid>
            </>
          )}
          {(type === Report.types[3].value ||
            type === Report.types[6].value) && (
            <Grid className={"col_item"} item xs={12} sm={6} md={3} lg={3}>
              <lable className={classes.label}>شماره تلفن: </lable>
              <TextField
                value={formVal.phoneNumber}
                onChange={(e) =>
                  setFormVal({ ...formVal, phoneNumber: e.target.value })
                }
                id="standard-basic"
                fullWidth
              />
            </Grid>
          )}
          {type === Report.types[8].value && (
            <>
              <Grid className={"col_item"} item xs={12} sm={6} md={3} lg={3}>
                <lable className={classes.label}>نام شهر: </lable>
                {city.length > 0 ? (
                  <Select
                    fullWidth={true}
                    value={formVal.cityId}
                    onChange={(e) =>
                      setFormVal({ ...formVal, cityId: e.target.value })
                    }
                  >
                    {city.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <div>در حال بارگذاری شهرها...</div>
                )}
              </Grid>
              <Grid className={"col_item"} item xs={12} sm={6} md={3} lg={3}>
                <lable className={classes.label}>نام محله: </lable>
                {parts.length > 0 ? (
                  <Select
                    fullWidth={true}
                    value={formVal.neighborhoodId}
                    onChange={(e) =>
                      setFormVal({ ...formVal, neighborhoodId: e.target.value })
                    }
                  >
                    {parts.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <div>در حال بارگذاری محله ها...</div>
                )}
              </Grid>
            </>
          )}
          {(type === Report.types[3].value ||
            type === Report.types[6].value ||
            type === Report.types[8].value) && (
            <>
              <Grid className={"col_item"} item xs={12} sm={6} md={4} lg={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type={"button"}
                  startIcon={<SaveIcon />}
                  onClick={() => {
                    loadData(type);
                  }}
                >
                  جستجو
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type={"button"}
                  onClick={() => {
                    setFormVal({
                      phoneNumber: "",
                      cityId: "",
                      neighborhoodId: "",
                    });
                    setFromDate(null);
                    setToDate(null);
                  }}
                >
                  پاک کردن
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </div>
      <Grid>
        {data && col && data.length > 0 && col.length > 0 ? (
          <Table title={"گزارش گیری"} data={data} column={col} />
        ) : (
          <div>اطلاعاتی وجود ندارد</div>
        )}
      </Grid>
    </RTL>
  );
};
export default Index;

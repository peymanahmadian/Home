import React, { useState } from "react";
import PropType from "prop-types";
import {
  Button,
  Checkbox,
  Chip,
  Grid,
  makeStyles,
  TextField,
  DialogActions,
  FormControlLabel,
} from "@material-ui/core";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";
import { Discount, Header } from "../../Model/Urls";
import axios from "axios";
import { showError } from "../../Actions/ErrorActions";
import { useDispatch } from "react-redux";
import SearchUser from "../Users/searchUser";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  fullWidth: {
    width: "100% !important",
  },
}));
const style = {
  border: {
    border: "1px solid gray",
    padding: "20px",
  },
};
const DiscountModal = (props) => {
  //send data
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [userListName, setUserListName] = useState([]);
  const [checked, setChecked] = useState(true);
  const [fromDate, setFromDate] = useState(
    props.id && props.id.fromDate
      ? moment(props.id.fromDate, "YYYY-MM-DDTHH:mm")
      : moment()
  );
  const [toDate, setToDate] = useState(
    props.id && props.id.toDate
      ? moment(props.id.toDate, "YYYY-MM-DDT:HH:mm")
      : moment()
  );
  const [amount, setAmount] = useState(props.id ? props.id.amount : null);
  const [percent, setPercent] = useState(props.id ? props.id.percent : null);
  const [isPercent, setIsPercent] = useState(
    props.id && props.id.percent ? true : false
  );
  const classes = useStyles();
  const addUsers = (data) => {
    debugger;
    let cashID = [];
    let cashNames = [];
    data.forEach((item) => {
      cashID.push({ UserId: item.userId });
      cashNames.push(item.firstName + " " + item.lastName);
    });
    setUserList(cashID);
    setUserListName(cashNames);
  };
  const createDiscount = () => {
    let item = {
      Id: props.id ? props.id.id : null,
      FromDate: moment(fromDate).format("YYYY-MM-DD"),
      ToDate: moment(toDate).format("YYYY-MM-DD"),
      Amount: amount,
      Percent: percent,
      UserDiscounts: userList,
    };

    if (props.id) {
      axios
        .put(Discount.put, item, { headers: Header(true) })
        .then((response) => {
          dispatch(
            showError({
              showError: true,
              content: " ویرایش با موفقیت انجام شد ",
            })
          );
          props.onRefresh();
        })
        .catch(() => {
          dispatch(
            showError({ showError: true, content: " خطا در ثبت اطلاعات " })
          );
        });
    } else {
      axios
        .post(Discount.post, item, { headers: Header(true) })
        .then((response) => {
          dispatch(
            showError({ showError: true, content: " ثبت با موفقیت انجام شد " })
          );
          props.onRefresh();
        })
        .catch(() => {
          dispatch(
            showError({ showError: true, content: " خطا در ثبت اطلاعات " })
          );
        });
    }
  };
  return (
    <Grid container>
      <Grid item xs={12} style={style.border}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
            <label>کد تخفیف عمومی</label>
          </Grid>
          {!checked && (
            <Grid item xs={12} md={12}>
              <Grid container alignItems={"center"} justify={"center"}>
                <Grid item xs={12} md={12}>
                  <Grid container style={{ paddingTop: "16px" }}>
                    <Grid item xs={12}>
                      <SearchUser
                        onSelect={(e) => {
                          addUsers(e);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                  {userListName.map((item) => (
                    <Chip style={{ marginTop: "2px" }} label={item} />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} style={style.border}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPercent}
                  onChange={() => setIsPercent(!isPercent)}
                />
              }
              label="قیمت به درصد"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {!isPercent && (
              <TextField
                fullWidth
                label={"مقدار"}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                variant="outlined"
              />
            )}
            {isPercent && (
              <TextField
                fullWidth
                label={"درصد"}
                onChange={(e) => setPercent(e.target.value)}
                value={percent}
                variant="outlined"
              />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} className={classes.container}>
            <lable>از تاریخ: </lable>
            <DatePicker
              className={classes.fullWidth}
              isGregorian={false}
              value={fromDate}
              onChange={(e) => setFromDate(e)}
              timePicker={false}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.container}>
            <lable>تا تاریخ: </lable>
            <DatePicker
              className={classes.fullWidth}
              isGregorian={false}
              value={toDate}
              onChange={(e) => setToDate(e)}
              timePicker={false}
            />
          </Grid>
        </Grid>
      </Grid>

      <DialogActions
        style={{ position: "absolute", left: "20px", bottom: "20px" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => createDiscount()}
        >
          ایجاد کد تخفیف
        </Button>
        <Button variant="contained" color="primary" onClick={props.onClose}>
          بستن
        </Button>
      </DialogActions>
    </Grid>
  );
};
DiscountModal.prototype = {
  id: PropType.string,
  onRefresh: PropType.object.isRequired,
};
export default DiscountModal;

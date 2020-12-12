import React, { useEffect, useState } from "react";
import moment from "moment";
import Alert from "@material-ui/lab/Alert";
import AddAdvertisement from "./addAdvertisement";
import { useDispatch } from "react-redux";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import axios from "axios";
//import Model
import { Advertisement, Header } from "../../Model/Urls";
//import component
import Table from "../Command/Table";
import RTL from "../RTL";
import Loading from "../Command/Loading";
import { showError } from "../../Actions/ErrorActions";
const Index = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [IDSelect, setIDSelect] = useState(null);
  const [adver, setAdver] = useState([]);
  const [loading, setLoading] = useState(false);
  //select pack

  const [packList, setPackList] = useState([]);
  const [packModal, setPackModal] = useState(false);
  const [packSelect, setPackSelect] = useState(null);
  const [rowSelected, setRowSelected] = useState(null);
  const dispatch = useDispatch();
  const loadData = () => {
    setLoading(true);
    axios.get(Advertisement.get, { headers: Header(true) }).then((response) => {
      setLoading(false);
      setAdver(response.data.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  const extendAdv = (id, levelID) => {
    setLoading(true);
    setRowSelected(id);
    axios
      .get(`${Advertisement.getPack}/${levelID}`, { headers: Header(true) })
      .then((data) => {
        setPackModal(true);
        setPackList(data.data.data);
        setPackSelect(data.data.data[0].id);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        dispatch(showError({ showError: true, content: "خطا در دریافت" }));
      });
    // axios.put(`${Advertisement.extend}/${id}`,null,{headers:Header(true)}).then(()=>{
    //     setLoading(false);
    //     dispatch(showError({showError:true,content:'آگهی تمدید شد'}));
    // })
  };
  const doneExtendAdv = () => {
    setLoading(true);
    axios
      .put(`${Advertisement.extend}/${rowSelected}/${packSelect}`, null, {
        headers: Header(true),
      })
      .then(() => {
        setLoading(false);
        dispatch(showError({ showError: true, content: "آگهی تمدید شد" }));
      })
      .catch(() => {
        dispatch(
          showError({
            showError: true,
            content: "مشکل در تمدید آگهی لطفا مجددا سعی نمایید",
          })
        );
      });
  };
  const confirmAdv = (id) => {
    setLoading(true);
    axios
      .put(`${Advertisement.confirm}/${id}`, null, { headers: Header(true) })
      .then(() => {
        setLoading(false);
        dispatch(showError({ showError: true, content: "آگهی تایید شد" }));
      })
      .catch(() => {
        setLoading(false);
        dispatch(showError({ showError: true, content: "خطا در تایید آگهی" }));
      });
  };
  return (
    <RTL>
      {loading ? (
        <Loading />
      ) : adver.length === 0 ? (
        <Alert severity="warning">اطلاعاتی یافت نشد</Alert>
      ) : (
        <>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setIDSelect(null);
                setOpenDialog(true);
              }}
            >
              ایجاد تبلیغات جدید
            </Button>
          </div>
          <Dialog open={packModal} onClose={() => setPackModal(false)}>
            <DialogTitle id="alert-dialog-title">انتخاب پک</DialogTitle>
            <DialogContent>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  style={{ fontFamily: "shabnam", marginBottom: "10px" }}
                >
                  پک مورد نظر را انتخاب کنید
                </FormLabel>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={packSelect}
                    onChange={(e) => {
                      setPackSelect(parseInt(e.target.value));
                    }}
                  >
                    {packList.map((item) => (
                      <FormControlLabel
                        value={item.id}
                        control={<Radio />}
                        label={item.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setPackSelect(null);
                  setPackModal(false);
                }}
                color="primary"
              >
                بستن
              </Button>
              <Button
                onClick={() => {
                  doneExtendAdv();
                  setPackModal(false);
                }}
                color="primary"
                autoFocus
              >
                تمدید
              </Button>
            </DialogActions>
          </Dialog>
          <Table
            title={"مدیریت تبلیغات"}
            data={adver}
            column={[
              { title: "شماره", field: "id", editable: "never" },
              { title: "نام", field: "name" },
              { title: "تصویر", field: "url", hidden: true },
              {
                title: "چت",
                field: "isChat",
                render: (value) => (value.isChat ? "دارد" : "ندارد"),
              },
              { title: "نام شهر", field: "cityName" },
              { title: "نام محله", field: "neighborhoodName" },
              {
                title: "تاریخ ایجاد",
                field: "registerDate",
                render: (value) => (
                  <span>
                    {moment(value.registerDate, "YYYY-MM-DDTHH:mm:SS").format(
                      "YYYY-MM-DD"
                    )}
                  </span>
                ),
              },
              { title: "شماره کاربری", field: "userId", hidden: true },
              {
                title: "عملیات ویرایش",
                field: null,
                render: (data) => (
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setIDSelect(data);
                        setOpenDialog(true);
                      }}
                    >
                      ویرایش
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        extendAdv(data.id, data.categoryLevelOneId);
                      }}
                    >
                      تمدید آگهی
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        confirmAdv(data.id);
                      }}
                    >
                      تایید آگهی
                    </Button>
                  </ButtonGroup>
                ),
              },
            ]}
            actions={{
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  let param = oldData["id"];
                  axios
                    .delete(Advertisement.delete + "/" + param, {
                      headers: Header(true),
                    })
                    .then((response) => {
                      dispatch(
                        showError({
                          showError: true,
                          content: "تبلیغ انتخابی حذف گردید",
                        })
                      );
                      loadData();
                      resolve();
                    })
                    .catch((err) => {
                      dispatch(
                        showError({
                          showError: true,
                          content: "خطا در حذف اطلاعات",
                        })
                      );
                      resolve();
                    });
                }),
            }}
          />
        </>
      )}
      <AddAdvertisement
        data={IDSelect}
        id={IDSelect && IDSelect.id}
        onClose={() => {
          setOpenDialog(false);
          loadData();
        }}
        open={openDialog}
      />
    </RTL>
  );
};
export default Index;

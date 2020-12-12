import React, { useEffect, useState } from "react";
import axios from "axios";

import Table from "../Command/Table";
import RTL from "../RTL";
import DiscountModal from "./DiscountModal";
import { Grid, Button, Dialog, DialogTitle } from "@material-ui/core";
import moment from "moment-jalaali";
//
import { useDispatch } from "react-redux";
import { Discount, Header } from "../../Model/Urls";
import { showError } from "../../Actions/ErrorActions";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const Index = () => {
  const tableRef = React.createRef();
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  //load data
  const loadData = () => {
    axios
      .get(Discount.get, { headers: Header(true) })
      .then((response) => {
        setDiscount(response.data.data);
      })
      .catch(() => setDiscount([]));
  };
  //for edit
  const [selectID, setSelectID] = useState(null);
  useEffect(() => {
    loadData();
  }, []);
  const refreshing = () => {
    loadData();
    setShowAdd(false);
    tableRef.current && tableRef.current.onQueryChange();
  };
  return (
    <RTL>
      {showAdd && (
        <Dialog
          fullScreen
          fullWidth={false}
          maxWidth={"lg"}
          aria-labelledby="simple-dialog-title"
          open={true}
        >
          {selectID && selectID.id ? (
            <DialogTitle id="max-width-dialog-title">ویرایش تخفیف</DialogTitle>
          ) : (
            <DialogTitle id="max-width-dialog-title">ایجاد تخفیف</DialogTitle>
          )}

          <DiscountModal
            id={selectID}
            status={showAdd}
            onRefresh={() => refreshing()}
            onClose={() => setShowAdd(false)}
          />
        </Dialog>
      )}

      {!showAdd && (
        <Grid container>
          <Grid item>
            <Button
              onClick={() => setShowAdd(true)}
              variant="contained"
              color="primary"
            >
              اضافه کردن کد تخفیف
            </Button>
          </Grid>
        </Grid>
      )}

      <Table
        tableRef={tableRef}
        title={"مدیریت تخفیف ها"}
        data={discount}
        column={[
          {
            title: "از تاریخ",
            filtering: false,
            type: "text",
            field: "fromDate",
            render: (rowdata) => {
              // let date=new Date(rowdata.fromDate);
              // return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
              return moment(rowdata.fromDate).format("jYYYY-jMM-jDD");
            },
          },
          {
            title: "به تاریخ",
            filtering: false,
            type: "text",
            field: "toDate",
            render: (rowdata) => {
              // let date=new Date(rowdata.toDate);
              // return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
              return moment(rowdata.toDate).format("jYYYY-jMM-jDD");
            },
          },
          { title: "مبلغ", field: "amount" },
          {
            title: "درصد",
            field: "percent",
            render: (rowdata) =>
              rowdata.percent && <span>{rowdata.percent} %</span>,
          },
          {
            title: "ویرایش",
            render: (rowdata) => (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectID(rowdata);
                  setShowAdd(true);
                }}
              >
                ویرایش اطلاعات
              </Button>
            ),
          },
          {
            title: "حذف شده",
            hidden: true,
            field: "isDeleted",
            render: (rowdata) =>
              rowdata.isDeleted !== true ? <CheckIcon /> : <CloseIcon />,
          },
        ]}
        actions={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              let param = oldData["id"];
              axios
                .delete(Discount.delete + "/" + param, {
                  headers: Header(true),
                })
                .then((response) => {
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
    </RTL>
  );
};
export default Index;

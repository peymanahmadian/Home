import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Properties, Header } from "../../Model/Urls";
import axios from "axios";
import Table from "../Command/Table";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import RTL from "../RTL";
import { showError } from "../../Actions/ErrorActions";
const Index = () => {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const loadData = () => {
    axios.get(Properties.get, { headers: Header(true) }).then((response) => {
      setProperties(response.data.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <RTL>
      <Table
        title={"مدیریت خصوصیات ها"}
        data={properties}
        column={[
          { title: "شماره", field: "id", editable: "never" },
          { title: "نام", field: "name" },

          {
            title: "نوع",
            field: "type",
            render: (rowdata) => (
              <span>
                {rowdata.type === 1 && "Text"}
                {rowdata.type === 2 && "Range"}
                {rowdata.type === 3 && "Options"}
                {rowdata.type === 4 && "Bool"}
              </span>
            ),
            editComponent: (props) => (
              <Select
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
              >
                <MenuItem value={1}>Text</MenuItem>
                <MenuItem value={2}>Range</MenuItem>
                <MenuItem value={3}>Options</MenuItem>
                <MenuItem value={4}>Bool</MenuItem>
              </Select>
            ),
          },
          {
            title: "قیمت گذاری شده",
            field: "isImportantToPrice",
            render: (rowdata) =>
              rowdata.isImportantToPrice === true ? (
                <CheckIcon />
              ) : (
                <CloseIcon />
              ),
            editComponent: (props) => (
              <Select
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
              >
                <MenuItem value={true}>شده</MenuItem>
                <MenuItem value={false}>نشده</MenuItem>
              </Select>
            ),
          },
          {
            title: "فعال شده",
            field: "isActive",
            render: (rowdata) =>
              rowdata.isActive ? <CheckIcon /> : <CloseIcon />,
            editComponent: (props) => (
              <Select
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
              >
                <MenuItem value={true}>شده</MenuItem>
                <MenuItem value={false}>نشده</MenuItem>
              </Select>
            ),
          },
        ]}
        actions={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              let body = { ...newData, IsActive: true };
              axios
                .post(Properties.post, body, { headers: Header(true) })
                .then((response) => {
                  loadData();
                  resolve();
                })
                .catch(() => {
                  dispatch(
                    showError({
                      showError: true,
                      content: "خطا در ثبت اطلاعات",
                    })
                  );
                  resolve();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              let body = { ...newData, IsActive: true };
              axios
                .put(Properties.edit, body, { headers: Header(true) })
                .then((response) => {
                  loadData();
                  resolve();
                })
                .catch(() => {
                  dispatch(
                    showError({
                      showError: true,
                      content: "خطا در ,ویرایش اطلاعات",
                    })
                  );
                  resolve();
                });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              let param = oldData["id"];
              axios
                .delete(Properties.delete + "/" + param, {
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

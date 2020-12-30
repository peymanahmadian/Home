import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { City, Header } from "../../Model/Urls";
import axios from "axios";
import Table from "../Command/Table";
import RTL from "../RTL";
import { showError } from "../../Actions/ErrorActions";
const Index = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState([]);
  const loadData = () => {
    axios.get(City.get, { headers: Header(true) }).then((response) => {
      setCity(response.data.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <RTL>
      <Table
        title={"مدیریت شهرها"}
        data={city}
        column={[
          { title: "شماره", field: "id", editable: "never" },
          { title: "نام", field: "name" },
        ]}
        actions={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              let body = { ...newData, IsActive: true };
              axios
                .post(City.post, body, { headers: Header(true) })
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
                .put(City.edit, body, { headers: Header(true) })
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
                .delete(City.delete + "/" + param, { headers: Header(true) })
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

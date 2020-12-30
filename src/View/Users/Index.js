import React, { useEffect, useState } from "react";
import { Input } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showError } from "../../Actions/ErrorActions";
import LockIcon from "@material-ui/icons/Lock";
//import Model
import { Users, Header } from "../../Model/Urls";
//import component
import Table from "../Command/Table";
import RTL from "../RTL";
import Loading from "../Command/Loading";
const Index = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loadData = () => {
    setLoading(true);
    axios.get(Users.get, { headers: Header(true) }).then((response) => {
      setLoading(false);
      setUserData(response.data.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <RTL>
      {loading ? (
        <Loading />
      ) : userData.length === 0 ? (
        <Alert severity="warning">اطلاعاتی یافت نشد</Alert>
      ) : (
        <Table
          title={"مدیریت کاربران"}
          data={userData}
          column={[
            {
              title: "نام کاربری",
              field: "UserName",
              editable: "onAdd",
              render: () => <LockIcon />,
            },
            {
              title: "رمز عبور",
              field: "Password",
              editable: "onAdd",
              render: () => <LockIcon />,
              editComponent: (prop) => {
                return (
                  <Input
                    type={"password"}
                    value={prop.value}
                    onChange={(e) => prop.onChange(e.target.value)}
                  />
                );
              },
            },
            { title: "شماره تلفن", field: "tel" },
            { title: "نام", field: "firstName" },
            { title: "نام خانوادگی", field: "lastName" },
            { title: "ایمیل", field: "email" },
            { title: "شماره همراه", field: "phoneNumber" },
            { title: "آدرس", field: "address" },
          ]}
          actions={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                let body = { ...newData };
                axios
                  .post(Users.post, body, { headers: Header(true) })
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
                let body = {
                  firstName: newData.firstName,
                  lastName: newData.lastName,
                  email: newData.email,
                  tel: newData.tel,
                  address: newData.address,
                };
                body = JSON.stringify(body);
                axios
                  .put(Users.put, body, {
                    headers: Header(true, newData.userId),
                  })
                  .then((response) => {
                    loadData();
                    resolve();
                  })
                  .catch((e) => {
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
                axios
                  .put(Users.delete, null, {
                    headers: Header(true, oldData.userId),
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
      )}
      }
    </RTL>
  );
};
export default Index;

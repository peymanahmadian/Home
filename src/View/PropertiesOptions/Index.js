import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Properties, Options, Header } from "../../Model/Urls";
import axios from "axios";
import Table from "../Command/Table";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RTL from "../RTL";
import { showError } from "../../Actions/ErrorActions";
import { Grid } from "@material-ui/core";
const Index = () => {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState(null);
  const loadProperties = () => {
    axios.get(Properties.get, { headers: Header(true) }).then((response) => {
      setProperties(response.data.data);
      setSelectedProperties(response.data.data[0].id);
    });
  };
  const loadOptions = (properties) => {
    if (properties) {
      axios
        .get(`${Options.get}/${properties}`, { headers: Header(true) })
        .then((response) => {
          setOptions(response.data.data);
        });
    }
  };
  useEffect(() => {
    loadProperties();
  }, []);
  useEffect(() => {
    setOptions([]);
    loadOptions(selectedProperties);
  }, [selectedProperties]);
  return (
    <RTL>
      <Grid className={"header_input"}>
        <div>
          <label htmlFor="selectOne">خصوصیت انتخابی: </label>
          {properties && (
            <Select
              value={selectedProperties}
              onChange={(e) => setSelectedProperties(e.target.value)}
            >
              {properties.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      </Grid>
      <Grid>
        <Table
          title={"مدیریت ویژگی های خصوصیات ها"}
          data={options}
          column={[
            { title: "شماره", field: "id", editable: "never" },
            { title: "نام صفت", field: "propertyName", editable: "never" },
            { title: "نام", field: "name" },
          ]}
          actions={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                let body = { ...newData, PropertyId: selectedProperties };
                axios
                  .post(Options.post, body, { headers: Header(true) })
                  .then((response) => {
                    loadOptions(selectedProperties);
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
            onRowUpdate: (newData) =>
              new Promise((resolve) => {
                axios
                  .put(Options.edit, newData, { headers: Header(true) })
                  .then((response) => {
                    loadOptions(selectedProperties);
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
                  .delete(Options.delete + "/" + param, {
                    headers: Header(true),
                  })
                  .then((response) => {
                    loadOptions(selectedProperties);
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
      </Grid>
    </RTL>
  );
};
export default Index;

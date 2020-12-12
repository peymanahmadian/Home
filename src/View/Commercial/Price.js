import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  LevelOne,
  Header,
  CommercialTime,
  CommercialPeriodTime,
} from "../../Model/Urls";
import axios from "axios";
import Table from "../Command/Table";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RTL from "../RTL";
import { showError } from "../../Actions/ErrorActions";
import { Grid } from "@material-ui/core";
const Index = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [commercial, setCommercial] = useState([]);
  const [selectedCommercial, setSelectedCommercial] = useState(null);
  const [pricedCommercial, setPricedCommercial] = useState([]);
  const loadCategory = () => {
    axios.get(LevelOne.get, { headers: Header(true) }).then((response) => {
      setCategory(response.data.data);
      setSelectedCategory(response.data.data[0].id);
    });
  };
  const loadCommercial = () => {
    axios
      .get(CommercialTime.get, { headers: Header(true) })
      .then((response) => {
        setCommercial(response.data.data);
        setSelectedCommercial(response.data.data[0].id);
      });
  };
  const loadPriceCommercial = (selectCat, selectCom) => {
    if (selectCat && selectCom) {
      setPricedCommercial([]);
      axios
        .get(`${CommercialPeriodTime.get}/${selectCat}/${selectCom}`, {
          headers: Header(true),
        })
        .then((response) => {
          setPricedCommercial([response.data.data]);
        })
        .catch(() => {
          setPricedCommercial([]);
        });
    }
  };
  useEffect(() => {
    loadCategory();
    loadCommercial();
  }, []);
  useEffect(() => {
    loadPriceCommercial(selectedCategory, selectedCommercial);
  }, [selectedCategory, selectedCommercial]);
  return (
    <RTL>
      <Grid className={"header_input"}>
        <div>
          <label htmlFor="selectOne">سطح اول انتخابی: </label>
          {category && (
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {category.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
        <div>
          <label htmlFor="selectOne">سطح زمانی انتخاب شده: </label>
          {commercial && (
            <Select
              value={selectedCommercial}
              onChange={(e) => setSelectedCommercial(e.target.value)}
            >
              {commercial.map((item) => (
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
          title={"مدیریت تعریف قیمت آگهی"}
          data={pricedCommercial}
          column={[{ title: "قیمت", field: "price" }]}
          actions={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                let body = {
                  ...newData,
                  PeriodId: selectedCommercial,
                  CategoryLevelOneId: selectedCategory,
                };
                axios
                  .post(CommercialPeriodTime.post, body, {
                    headers: Header(true),
                  })
                  .then((response) => {
                    loadPriceCommercial(selectedCategory, selectedCommercial);
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
                //let body={"IsActive":Boolean(newData.isActive),"PropertyId":parseInt(newData.propertyId),"CategoryLevelOneId":selectedCategory,"Id":newData.id}
                newData.price = parseFloat(newData.price);
                axios
                  .put(CommercialPeriodTime.edit, newData, {
                    headers: Header(true),
                  })
                  .then((response) => {
                    loadPriceCommercial(selectedCategory, selectedCommercial);
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
                  .delete(CommercialPeriodTime.delete + "/" + param, {
                    headers: Header(true),
                  })
                  .then((response) => {
                    loadPriceCommercial(selectedCategory, selectedCommercial);
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

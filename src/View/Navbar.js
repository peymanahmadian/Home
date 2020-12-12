import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Link, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LocalStorage from "../utils/LocalStorage";
import RTL from "./RTL";
import "../Styles/Layout.scss";
import Drawer from "@material-ui/core/Drawer";
const Header = () => {
  const [drawer, setDrawer] = useState(false);
  let location = useLocation();
  useEffect(() => {
    setDrawer(false);
  }, [location]);
  return (
    <RTL>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <span color="inherit">سامانه مدیریت</span>
          </div>
          <Button
            color="inherit"
            onClick={() => {
              LocalStorage.remove("home_token");
            }}
          >
            خروج
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <nav className={"sideMenu"}>
          <List>
            <Link to={"/level/one"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت سطح اول"} />
              </ListItem>
            </Link>
            <Link to={"/level/two"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت  سطح دوم"} />
              </ListItem>
            </Link>
            <Link to={"/level/three"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت سطح سوم"} />
              </ListItem>
            </Link>
            <Link to={"/city"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت شهرها"} />
              </ListItem>
            </Link>
            <Link to={"/city/parts"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت بخش های شهرها"} />
              </ListItem>
            </Link>

            <Link to={"/level/three/option"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت خصوصیات سطح سوم"} />
              </ListItem>
            </Link>
            <Link to={"/properties"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت خصوصیات"} />
              </ListItem>
            </Link>
            <Link to={"/properties/option"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت ویژگی های خصوصیات"} />
              </ListItem>
            </Link>
            <Link to={"/properties/special"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت خصوصیات ویژه"} />
              </ListItem>
            </Link>
            <Link to={"/commercial/time"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت  تعریف زمان آگهی"} />
              </ListItem>
            </Link>
            <Link to={"/commercial/price"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت  تعریف قیمت آگهی"} />
              </ListItem>
            </Link>
            <Link to={"/information"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"ویرایش درباره ما و قوانین"} />
              </ListItem>
            </Link>
            <Link to={"/discount"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"تخفیف ها"} />
              </ListItem>
            </Link>
            <Link to={"/report"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"گزارش ها"} />
              </ListItem>
            </Link>
            <Link to={"/users"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت کاربران"} />
              </ListItem>
            </Link>
            <Link to={"/advertisement"}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"مدیریت تبلیغات"} />
              </ListItem>
            </Link>
          </List>
        </nav>
      </Drawer>
    </RTL>
  );
};
export default Header;

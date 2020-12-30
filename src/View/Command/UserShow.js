import React, { useEffect, useState } from "react";
import Account from "../../API/Account";
import { NativeSelect } from "@material-ui/core";
const UserShow = (props) => {
  const [user, setUser] = useState(null);
  const getAllUser = async () => {
    let data = await Account.getUsers();
    if (data) {
      setUser(data);
      props.onSelect(data[0].userId);
    }
  };
  useEffect(() => {
    getAllUser();
  }, [0]);
  return (
    <>
      {user ? (
        <NativeSelect
          style={{ width: "100%" }}
          onChange={(e) => props.onSelect(e.target.value)}
        >
          {user.map((item) => (
            <option value={item.userId}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </NativeSelect>
      ) : (
        <span>در حال بارگذاری ...</span>
      )}
    </>
  );
};
export default UserShow;

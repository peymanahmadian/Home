import axios from "axios";
import { Account as AccountLink } from "../Model/Urls";
import { Users, Header } from "../Model/Urls";
class Account {
  login = async (param) => {
    let searchParam = new URLSearchParams();
    searchParam.append("grant_type", "password");
    searchParam.append("client_id", "Panel");
    searchParam.append("client_secret", "PanelSecret");
    searchParam.append("username", param.username);
    searchParam.append("password", param.password);
    try {
      const response = await axios.post(AccountLink, searchParam.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return response.data.access_token;
    } catch (e) {
      return e;
    }
  };
  getUsers = async () => {
    try {
      const response = await axios.get(Users.get, { headers: Header(true) });
      return response.data.data;
    } catch (e) {}
  };
}
export default new Account();

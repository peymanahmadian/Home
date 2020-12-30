import LocalStorage from "../utils/LocalStorage";
export const Header = (isAthu, userID) => {
  if (isAthu) {
    if (userID) {
      return {
        Authorization: `Bearer ${LocalStorage.get("home_token")}`,
        "Content-Type": "application/json",
        UserId: userID,
      };
    } else {
      return {
        Authorization: `Bearer ${LocalStorage.get("home_token")}`,
        "Content-Type": "application/json",
      };
    }
  } else {
    return null;
  }
};
export const Account = "http://pg.sandboxdevelop.ir/token";
export const LevelOne = {
  getAll: "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelOne/GetAllCategory",
  get:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelOne/GetCategoryLevelOne",
  post:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelOne/AddCategoryLevelOne",
  delete:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelOne/DeleteCategoryLevelOne",
  edit:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelOne/EditCategoryLevelOne",
};
export const LevelTwo = {
  get:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelTwo/GetCategoryLevelTwoByLevelOneId",
  post:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelTwo/AddCategoryLevelTwo",
  delete:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelTwo/DeleteCategoryLevelTwo",
  edit:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelTwo/EditCategoryLevelTwo",
};
export const LevelThree = {
  get:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelThree/GetCategoryLevelThreeByLevelTwoId",
  post:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelThree/AddCategoryLevelThree",
  delete:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelThree/DeleteCategoryLevelThree",
  edit:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelThree/EditCategoryLevelThree",
};
export const LevelThreeProperties = {
  get:
    "http://pg.sandboxdevelop.ir/adv/api/PropertyCategory/GetPropertyCategoryByCategoryLevelThreeId",
  post:
    "http://pg.sandboxdevelop.ir/adv/api/PropertyCategory/AddPropertyCategory",
  delete:
    "http://pg.sandboxdevelop.ir/adv/api/PropertyCategory/DeletePropertyCategory",
  edit:
    "http://pg.sandboxdevelop.ir/adv/api/PropertyCategory/EditPropertyCategory",
};
export const City = {
  get: "http://pg.sandboxdevelop.ir/adv/api/City/GetCites",
  post: "http://pg.sandboxdevelop.ir/adv/api/City/AddCity",
  delete: "http://pg.sandboxdevelop.ir/adv/api/City/DeleteCity",
  edit: "http://pg.sandboxdevelop.ir/adv/api/City/EditCity",
};
export const CityPart = {
  get:
    "http://pg.sandboxdevelop.ir/adv/api/Neighborhood/GetNeighborhoodsByCityId",
  post: "http://pg.sandboxdevelop.ir/adv/api/Neighborhood/AddNeighborhood",
  delete: "http://pg.sandboxdevelop.ir/adv/api/Neighborhood/DeleteNeighborhood",
  edit: "http://pg.sandboxdevelop.ir/adv/api/Neighborhood/EditNeighborhood",
};
export const Properties = {
  get: "http://pg.sandboxdevelop.ir/adv/api/Property/GetProperties",
  post: "http://pg.sandboxdevelop.ir/adv/api/Property/AddProperty",
  delete: "http://pg.sandboxdevelop.ir/adv/api/Property/DeleteProperty",
  edit: "http://pg.sandboxdevelop.ir/adv/api/Property/EditProperty",
};
export const Options = {
  get: "http://pg.sandboxdevelop.ir/adv/api/PropertyOption/GetPropertyOptions",
  post: "http://pg.sandboxdevelop.ir/adv/api/PropertyOption/AddPropertyOption",
  delete: "http://pg.sandboxdevelop.ir/adv/api/PropertyOption/DeleteProperty",
  edit: "http://pg.sandboxdevelop.ir/adv/api/PropertyOption/EditPropertyOption",
};
export const Special = {
  get:
    "http://pg.sandboxdevelop.ir/adv/api/SpecialPropertyCategory/GetSpecialPropertyByCategoryLevelOneId",
  post:
    "http://pg.sandboxdevelop.ir/adv/api/SpecialPropertyCategory/AddSpecialPropertyCategory",
  delete:
    "http://pg.sandboxdevelop.ir/adv/api/SpecialPropertyCategory/DeleteSpecialPropertyCategory",
  edit:
    "http://pg.sandboxdevelop.ir/adv/api/SpecialPropertyCategory/EditSpecialPropertyCategory",
};
export const CommercialTime = {
  get: "http://pg.sandboxdevelop.ir/adv/api/Period/GetPeriods",
  post: "http://pg.sandboxdevelop.ir/adv/api/Period/AddPeriod",
  delete: "http://pg.sandboxdevelop.ir/adv/api/Period/DeletePeriod",
  edit: "http://pg.sandboxdevelop.ir/adv/api/Period/EditPeriod",
};
export const CommercialPeriodTime = {
  get: "http://pg.sandboxdevelop.ir/adv/api/PeriodPrice/GetPeriodPrice",
  post: "http://pg.sandboxdevelop.ir/adv/api/PeriodPrice/AddPeriodPrice",
  edit: "http://pg.sandboxdevelop.ir/adv/api/PeriodPrice/EditPeriodPrice",
  delete: "http://pg.sandboxdevelop.ir/adv/api/PeriodPrice/DeletePeriodPrice",
};
export const About = {
  get: "http://pg.sandboxdevelop.ir/adv/api/BaseInfo/GetBaseInfo/1",
  edit: "http://pg.sandboxdevelop.ir/adv/api/BaseInfo/EditBaseInfo",
};
export const Terms = {
  get: "http://pg.sandboxdevelop.ir/adv/api/BaseInfo/GetBaseInfo/2",
};
export const Discount = {
  get: "http://pg.sandboxdevelop.ir/pay/api/Discount/Get",
  put: "http://pg.sandboxdevelop.ir/pay/api/Discount/Update",
  post: "http://pg.sandboxdevelop.ir/pay/api/Discount/Import",
  delete: "http://pg.sandboxdevelop.ir/pay/api/Discount/Delete",
};
export const Users = {
  get: "http://pg.sandboxdevelop.ir/adv/api/Reporting/GetAllUsers",
  post: "http://pg.sandboxdevelop.ir/Idp/api/User/RegisterByUserName",
  put: "http://pg.sandboxdevelop.ir/idp/User/api/User/UpdateProfile",
  delete: "http://pg.sandboxdevelop.ir/idp/User/api/User/ChangeAccount/false",
};
export const Advertisement = {
  get: "http://pg.sandboxdevelop.ir/adv/api/Reporting/GetAllAdvertisements",
  post: "http://pg.sandboxdevelop.ir/AdvControl/api/AdvController/AddAdv",
  put: "http://pg.sandboxdevelop.ir/AdvControl/api/AdvController/EditAdv",
  delete: "http://pg.sandboxdevelop.ir/AdvControl/api/AdvController/DeleteAdv",
  getProperties:
    "http://pg.sandboxdevelop.ir/adv/api/CategoryLevelThree/GetPropertyCategoryLevelThreeById",
  extend:
    "http://pg.sandboxdevelop.ir/AdvControl/api/AdvController/ExtendedAdv",
  confirm:
    "http://pg.sandboxdevelop.ir/AdvControl/api/AdvController/ConfirmAdv",
  getPack:
    "http://pg.sandboxdevelop.ir/adv/api/Period/GetPeriodsWithCategoryLevelOneId",
};
export const Report = {
  url: "http://pg.sandboxdevelop.ir/adv/api/Reporting/",
  types: [
    { value: "GetAllUsers", label: "همه کاربران" },
    { value: "GetAcceptedAdvertisments", label: "آگهی های تایید شده" },
    { value: "GetNotAcceptedAdvertisments", label: "آگهی های تایید نشده" },
    { value: "GetDiscounts", label: "کدهای تخفیف" },
    { value: "GetDeletedAdvertisments", label: "آگهی های حذف شده" },
    { value: "GetAllAdvertisements", label: "تمامی آگهی ها" },
    { value: "SearchUsers", label: "جستجوی کاربران" },
    { value: "InActiveUsers", label: "کابران غیرفعال" },
    { value: "GetAdvertisementsBySearch", label: "جستجوی آگهی" },
  ],
};

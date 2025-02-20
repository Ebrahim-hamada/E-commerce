import axios from "axios";

const baseInstance = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1/",
});

export default baseInstance;



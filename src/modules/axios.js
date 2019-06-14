import axios from "axios";
import { RAPID_API_HOST, RAPID_API_KEY } from "../../config";

let axiosInstance = () =>
  axios.create({
    timeout: 10000,
    headers: {
      "X-RapidAPI-Host": RAPID_API_HOST,
      "X-RapidAPI-Key": RAPID_API_KEY
    }
  });

export default axiosInstance;

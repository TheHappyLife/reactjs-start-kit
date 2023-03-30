import axios from "axios";

export const callAPI = async (method, url, data) => {
  try {
    const res = await axios({
      method: method || "get",
      url: url || "",
      data: data || null,
    });
    return res.data;
  } catch (err) {
    console.error("Have an error once call api: ", err);
  }
};

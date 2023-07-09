import axios from "axios";
const domain = process.env.REACT_APP_BASE_URL;
const post = (url, params) => {
  return axios({
    method: "post",
    url: `${domain}/api${url}`,
    data: params,
  }).then(function (response) {
    if (response.status === 200) {
      return response.data;
    } else {
      return "error";
    }
  });
};

const get = (url, params) => {
  console.log(params);
  return axios({
    method: "get",
    url: `${domain}/api${url}`,
    params,
  }).then(function (response) {
    if (response.status === 200) {
      return response.data;
    } else {
      return "error";
    }
  });
};

export { post, get };

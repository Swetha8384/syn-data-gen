import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
console.log(BASE_URL);
export default {
  get: {
    fakeProducts: () => {
      return axios.get("https://fakestoreapi.com/products/1");
    },
  },
  post: {
    generateSchema: (body) => {
      console.log(body, "body");
      return axios.post(`${BASE_URL}/api/generate_schema`, body);
    },

    generateSchemaData: (body) => {
      console.log(body, "body");
      return axios.post(`${BASE_URL}/api/generate_schemaData`, body);
    },
    insertSchema: (body) => {
      console.log(body, "body");
      return axios.post(`${BASE_URL}/api/upload_json_to_bigquery`, body);
    },
  },
  put: {
    fakeProduct: (body) => {
      return axios.put("https://fakestoreapi.com/products/7", body);
    },
  },
  delete: {
    fakeProduct: () => axios.delete("https://fakestoreapi.com/products/6"),
  },
};

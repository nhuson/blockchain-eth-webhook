import axios from "axios";

const webhook = async ({ url, data }) => await axios.post(url, data);
export default webhook;

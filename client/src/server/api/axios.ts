import axios from "axios";

const baseURL =
    import.meta.env.MODE === "production"
        ? "/"
        : "http://localhost:8080";

export default axios.create({
    baseURL,
});

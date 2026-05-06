import axios from "axios";

const baseURL = process.env.NEXT_API_URL;

if (!baseURL) {
    throw new Error("NEXT_API_URL is not defined");
}

export const api = axios.create({
    baseURL,
    timeout: 30000,
});
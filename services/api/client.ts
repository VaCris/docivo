import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://docivo-api.studios-tkoh.online/api/v1";

if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_UR is not defined");
}

export const api = axios.create({
    baseURL,
    timeout: 30000,
});
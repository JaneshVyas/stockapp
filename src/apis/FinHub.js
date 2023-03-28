import axios from "axios";

const TOKEN = "cga118hr01qqlesgbgv0cga118hr01qqlesgbgvg"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})
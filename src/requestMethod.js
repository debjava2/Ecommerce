import axios from "axios";

const BASE_URL="http://localhost:8080/api/";
const TOKEN="pk_test_51Kp5cOSBpM28OYwGmqj7Mbu2PoIcXOjtXu1tYK3YAPPiqfDMy0rLMVczleN0wo6eCtf6244h9RNYoggLDiLBMAPy00zjHEvYVh";

export const publicRequest=axios.create({
    baseURL:BASE_URL
})

export const userRequest=axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})

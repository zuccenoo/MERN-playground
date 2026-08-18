import api from "../../../services/api.js";

export async function fetchThoughts() {
    const res = await api.get("/thoughts");
    return res.data.data;
}

export async function postThought({ name, text, stars, avatar }) {
    const res = await api.post("/thoughts", { name, text, stars, avatar });
    return res.data.data;
}
const URL = import.meta.env.VITE_API_URL;
const TOKEN = "Bearer " + import.meta.env.VITE_API_TOKEN;

export async function getMe() {
    return await fetcher("/me", "GET")
}
export async function setMe(name) {
    return await fetcher("/school", "PATCH", { name: name })
}
export async function getPromos() {
    return await fetcher("/promos", "GET")
}
export async function getPromoByID(promoID) {
    return await fetcher("/promos/" + promoID, "GET")
}
export async function getStudents(promoID) {
    return await fetcher("/promos/" + promoID + "/students", "GET")
}

export async function getStudentAvatarByID(promoID, studentID) {
    return await fetcher("/promos/" + promoID + "/students/" + studentID + "/avatar", "GET", null, false)
}
export async function createPromo(data) {
    return await fetcher("/promos", "POST", data);
}
export async function createStudent(promoID, data) {
    return await fetcher("/promos/" + promoID + "/students", "POST", data);
}
export async function updatePromo(promoID, data) {
    return await fetcher("/promos/" + promoID, "PUT", data);
}
export async function updateStudent(promoID, studentID, data) {
    return await fetcher("/promos/" + promoID + "/students/" + studentID, "PUT", data);
}
export async function removePromo(promoID) {
    return await fetcher("/promos/" + promoID, "DELETE");
}
export async function removeStudent(promoID, studentID) {
    return await fetcher("/promos/" + promoID + "/students/" + studentID, "DELETE");
}

async function fetcher(route, method = "GET", data = null, json = true) {
    const headers = {
        authorization: TOKEN,
        "Content-type": "application/json",
    };
    const options = {
        method,
        headers,
    };
    if (data) options.body = JSON.stringify(data);
    try {
        const resp = await fetch(URL + route, options);

        if (!json) return await resp.blob();
        return await resp.json();
    } catch (ignored) {

        console.error("Une erreur est survenue lors de la requête.");
    }
}

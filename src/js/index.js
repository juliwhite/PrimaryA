import { isTokenValid } from "./auth.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    const isValid = await isTokenValid();
    if (isValid) {
        console.log("User is logged in.");
    } else {
        console.log("User is not logged in.");
    }
});
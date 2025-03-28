import { checkLogin } from "./auth.mjs";
import { loadHeaderFooter } from "./template.js";

document.addEventListener("DOMContentLoaded", async () => {
    loadHeaderFooter();
    
    await checkLogin(); // Ensure the user is logged in

    // Your page-specific logic here
    const addActivityForm = document.getElementById("add-activity-form");

    addActivityForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const activityName = document.getElementById("activity-name").value;
        const activityDescription = document.getElementById("activity-description").value;

        console.log("New Activity:", { activityName, activityDescription });
        alert("Activity added successfully!");
    });
});
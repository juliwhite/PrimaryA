import { checkLogin } from "./auth.mjs";
import { loadHeaderFooter } from "./template.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();

    await checkLogin(); // Ensure the user is logged in

    // Your page-specific logic here
    const addActivityForm = document.getElementById("add-activity-form");

    addActivityForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Collect form data
        const activityName = document.getElementById("activity-name").value;
        const activityDate = document.getElementById("activity-date").value;
        const activityDescription = document.getElementById("activity-description").value;
        const activityLocation = document.getElementById("activity-location").value;
        const activityOrganizer = document.getElementById("activity-organizer").value;
        const activityCategory = document.getElementById("activity-category").value;

        const newActivity = {
            name: activityName,
            date: activityDate,
            description: activityDescription,
            location: activityLocation,
            organizer: activityOrganizer,
            status: "Upcoming", // Default status
            category: activityCategory,
        };

        console.log("New Activity:", newActivity);

        // Send the data to the backend API (replace with your API endpoint)
        try {
            const response = await fetch("https://primaryactivities-backend.onrender.com/api/activities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the token
                },
                body: JSON.stringify(newActivity),
            });

            if (response.ok) {
                alert("Activity added successfully!");
                location.href = "index.html"; // Redirect to the main page
            } else {
                const errorData = await response.json();
                alert(`Failed to add activity: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error adding activity:", error);
            alert("An error occurred while adding the activity. Please try again.");
        }
    });
});
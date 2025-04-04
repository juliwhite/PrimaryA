import { checkLogin } from "./auth.mjs";
import { loadHeaderFooter } from "./template.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ACTIVITIES_URL = `${API_BASE_URL}/api/activities`;

// document.addEventListener("DOMContentLoaded", async () => {
//     await loadHeaderFooter();

//     await checkLogin(); // Ensure the user is logged in

//     const addActivityForm = document.getElementById("add-activity-form");

//     addActivityForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         // Collect form data
//         const activityName = document.getElementById("activity-name").value;
//         const activityDate = document.getElementById("activity-date").value;
//         const activityDescription = document.getElementById("activity-description").value;
//         const activityLocation = document.getElementById("activity-location").value;
//         const activityOrganizer = document.getElementById("activity-organizer").value;
//         const activityCategory = document.getElementById("activity-category").value;

//         const newActivity = {
//             name: activityName,
//             date: activityDate,
//             description: activityDescription,
//             location: activityLocation,
//             organizer: activityOrganizer,
//             status: "Upcoming", // Default status
//             category: activityCategory,
//         };

//         console.log("New Activity:", newActivity);

//         // Send the data to the backend API 
//         try {
//             //const response = await fetch("https://primaryactivities-backend.onrender.com/api/activities", {
//             const response = await fetch(ACTIVITIES_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the token
//                 },
//                 body: JSON.stringify(newActivity),
//             });

//             if (response.ok) {
//                 alert("Activity added successfully!");
//                 location.href = "index.html"; // Redirect to the main page
//             } else {
//                 const errorData = await response.json();
//                 alert(`Failed to add activity: ${errorData.message}`);
//             }
//         } catch (error) {
//             console.error("Error adding activity:", error);
//             alert("An error occurred while adding the activity. Please try again.");
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();
    await checkLogin();

    const addActivityForm = document.getElementById("add-activity-form");
    const formMessage = document.getElementById("form-message");

    addActivityForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearErrors();
        formMessage.textContent = ""; // Clear previous messages

        let isValid = true;

        function showError(inputId, message) {
            const errorElement = document.getElementById(`${inputId}-error`);
            errorElement.textContent = message;
            errorElement.style.color = "red";
            isValid = false;
        }

        function clearError(inputId) {
            const errorElement = document.getElementById(`${inputId}-error`);
            if (errorElement) {
                errorElement.textContent = "";
            }
        }

        function showSuccessMessage(message) {
            formMessage.textContent = message;
            formMessage.style.color = "green";
            formMessage.style.fontWeight = "bold";
        }

        // Attach event listeners to clear errors on input
        document.querySelectorAll("input, textarea, select").forEach((field) => {
            field.addEventListener("input", () => clearError(field.id));
        });

        // Collect form data
        const activityName = document.getElementById("activity-name").value.trim();
        const activityDate = document.getElementById("activity-date").value;
        const activityLocation = document.getElementById("activity-location").value.trim();
        const activityOrganizer = document.getElementById("activity-organizer").value.trim();
        const activityDescription = document.getElementById("activity-description").value.trim();
        const activityCategory = document.getElementById("activity-category").value;

        // Basic validation
        if (!activityName) showError("activity-name", "Activity name is required.");
        if (!activityDate) showError("activity-date", "Date is required.");
        if (new Date(activityDate) < new Date()) showError("activity-date", "Date must be in the future.");
        if (!activityLocation) showError("activity-location", "Location is required.");
        if (!activityOrganizer) showError("activity-organizer", "Organizer name is required.");
        if (!activityDescription) showError("activity-description", "Description is required.");
        if (!activityCategory) showError("activity-category", "Please select a category.");

        if (!isValid) return;

        const newActivity = {
            name: activityName,
            date: activityDate,
            description: activityDescription,
            location: activityLocation,
            organizer: activityOrganizer,
            status: "Upcoming",
            category: activityCategory,
        };

        try {
            const response = await fetch(ACTIVITIES_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(newActivity),
            });

            if (response.ok) {
                showSuccessMessage("Activity added successfully!");
                addActivityForm.reset(); // Clear the form after success
                setTimeout(() => {
                    window.location.replace("index.html"); // Redirect after a short delay
                }, 3000);
            } else {
                const errorData = await response.json();
                showError("activity-name", errorData.message || "Failed to add activity.");
            }
        } catch (error) {
            console.error("Error adding activity:", error);
            showError("activity-name", "An unexpected error occurred. Please try again.");
        }
    });

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach((el) => {
            el.textContent = "";
        });
        formMessage.textContent = "";
    }
});

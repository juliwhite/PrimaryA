import { fetchActivities } from "./util.js"; 
import { loadHeaderFooter } from "./template.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();
    const activitiesContainer = document.getElementById("activities-container");

    // Get the category from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (!category) {
        activitiesContainer.innerHTML = "<p>No category selected.</p>";
        return;
    }

    // // Fetch activities from the JSON file
    // async function fetchActivities() {
    //     try {
    //         const response = await fetch("/json/activities.json");
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.error("Error fetching activities:", error);
    //     }
    // }

    // Display activities in the container
    function displayActivities(activities) {
        activitiesContainer.innerHTML = ""; // Clear previous activities
        if (activities.length === 0) {
            activitiesContainer.innerHTML = `<p>No activities found for category: ${category}</p>`;
            return;
        }
        activities.forEach(activity => {
            const activityElement = document.createElement("div");
            activityElement.classList.add("activity");
            activityElement.innerHTML = `
                <h4>${activity.name}</h4>
                <p><strong>Date:</strong> ${activity.date}</p>
                <p><strong>Description:</strong> ${activity.description}</p>
                <p><strong>Location:</strong> ${activity.location}</p>
                <p><strong>Organizer:</strong> ${activity.organizer}</p>
            `;
            activitiesContainer.appendChild(activityElement);
        });
    }

    // Fetch and filter activities by category
    const activities = await fetchActivities();
    if (activities) {
        const filteredActivities = activities.filter(activity => activity.category === category);
        displayActivities(filteredActivities);
    }
});

import { fetchActivities } from "./util.js";

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const activitiesContainer = document.createElement("div");
    activitiesContainer.id = "activities-container";
    document.body.appendChild(activitiesContainer);

    // // Fetch activities from the JSON file
    // async function fetchActivities() {
    //     try {
    //         const response = await fetch("/json/activities.json");
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         console.log("Fetched activities:", data);
    //         return data;
    //     } catch (error) {
    //         console.error("Error fetching activities:", error);
    //     }
    // }

    // Display activities in the container
    function displayActivities(activities) {
        activitiesContainer.innerHTML = ""; // Clear previous activities
        activities.forEach(activity => {
            const activityElement = document.createElement("div");
            activityElement.classList.add("activity");
            activityElement.innerHTML = `
                <h4>${activity.name}</h4>
                <p><strong>Date:</strong> ${activity.date}</p>
                <p><strong>Description:</strong> ${activity.description}</p>
                <p><strong>Location:</strong> ${activity.location}</p>
                <p><strong>Organizer:</strong> ${activity.organizer}</p>
                <p><strong>Status:</strong> ${activity.status}</p>
            `;
            activitiesContainer.appendChild(activityElement);
        });
    }

    // Add click event listeners to category cards
    cards.forEach(card => {
        card.addEventListener("click", async () => {
            const category = card.getAttribute("data-category");
            const activities = await fetchActivities();
            const filteredActivities = activities.filter(activity => activity.category === category);
            displayActivities(filteredActivities);
        });
    });
});
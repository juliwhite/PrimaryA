const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ACTIVITIES_URL = `${API_BASE_URL}/api/activities`;

// Fetch activities from the JSON file
export async function fetchActivities() {
    try {
        //const response = await fetch("/json/activities.json");
        const response = await fetch(ACTIVITIES_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched activities:", data);
        return data;
    } catch (error) {
        console.error("Error fetching activities:", error);
    }
}
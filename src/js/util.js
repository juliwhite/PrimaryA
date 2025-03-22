
// Fetch activities from the JSON file
export async function fetchActivities() {
    try {
        const response = await fetch("/json/activities.json");
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
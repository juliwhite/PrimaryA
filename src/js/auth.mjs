// Simulated backend API URL 
const API_URL = "https://primaryactivities-backend.onrender.com/api/auth";

// Function to log in the user
export async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        const token = data.token;

        // Store the token in localStorage
        localStorage.setItem("authToken", token);

        return true; // Login successful
    } catch (error) {
        console.error("Login failed:", error.message);
        return false; // Login failed
    }
}

// Function to check if the token is valid
export async function isTokenValid() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        return false; // No token found
    }

    try {
        const response = await fetch(`${API_URL}/validate-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.ok; // Token is valid if the response is OK
    } catch (error) {
        console.error("Token validation failed:", error.message);
        return false; // Token validation failed
    }
}

// Function to check if the user is logged in
export async function checkLogin() {
    const isValid = await isTokenValid();
    if (!isValid) {
        alert("You must log in to continue.");
        location.href = "login.html"; // Redirect to login page
    }
}
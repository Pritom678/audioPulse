import api from "@/lib/axios";

/**
 * Clear all cookies from the browser
 */
const clearAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

    // Clear cookie for current path
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Clear cookie for root domain
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;

    // Clear cookie for parent domain (if subdomain)
    const domain = window.location.hostname.split(".").slice(-2).join(".");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
  }
};

/**
 * Logout user - clears cookies and redirects to login
 */
export const logout = async () => {
  try {
    // Call logout endpoint to clear server-side cookie
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    // Always clear client-side cookies regardless of API response
    clearAllCookies();

    // Clear any client-side storage
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error("Storage clear error:", e);
    }

    // Force redirect to login page with full reload
    window.location.href = "/login";
  }
};

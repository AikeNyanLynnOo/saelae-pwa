import { setCookie } from "nookies";
/**
 * Sets the app_token cookie with a 24-hour expiration using next/cookies
 * @param token - The token value to be stored in the cookie
 */
export const setAppTokenCookie = (token: string): void => {
  const maxAge = 24 * 60 * 60; // 24 hours in seconds

  setCookie(null, "app_token", token, {
    maxAge: maxAge,
    path: "/",
    sameSite: "Strict",
    secure: true,
  });
};

/**
 * Extracts a readable string message from various message formats
 * @param message - The message that can be either a string or an object with nested arrays
 * @returns A formatted string message
 */
export const extractMessage = (message: any): string => {
  // If message is string, return directly
  if (typeof message === "string") {
    return message;
  }

  // If message is an object
  if (typeof message === "object" && message !== null) {
    // Get all values from object (handles nested arrays)
    const messageValues = Object.values(message).flat();

    // Join all messages with comma if multiple messages exist
    return messageValues.join(", ");
  }

  // Return empty string for undefined/null cases
  return "";
};

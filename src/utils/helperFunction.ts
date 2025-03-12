import { setCookie } from "nookies";

export const setAppTokenCookie = (token: string): void => {
  const maxAge = 24 * 60 * 60; // 24 hours in seconds

  // Decode the token before setting it in the cookie to prevent URL encoding
  setCookie(null, "app_token", token, {
    maxAge: maxAge,
    path: "/",
    sameSite: "Strict",
    secure: true,
  });
};

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

export const formatDate = (date: any) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getStateBaseOnData = (
  progressData: any
): "default" | "completed" | "half-completed" | "locked" | "progress" => {
  if (progressData.is_completed) {
    return "completed";
  }
  if (progressData.has_started && !progressData.is_completed) {
    return "progress";
  }

  return "default";
};

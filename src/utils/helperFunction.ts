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
export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
export const getDateFromString = (dateString: string): Date => {
  // Parse the ISO 8601 formatted date string to create a new Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string format");
  }

  return date;
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

export const calculateAge = (dateString: string): string => {
  // Parse the input date
  const birthDate = new Date(dateString);
  const today = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = birthDate.getTime() - today.getTime();

  // If date is in the future, calculate pregnancy duration
  if (timeDiff > 0) {
    // Convert time difference to date components for pregnancy
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;

    // Build the pregnancy duration string
    const parts: string[] = [];
    if (months > 0) {
      parts.push(`${months} month${months !== 1 ? "s" : ""}`);
    }
    if (remainingDays > 0) {
      parts.push(`${remainingDays} day${remainingDays !== 1 ? "s" : ""}`);
    }

    return `Due in ${parts.join(" and ")}`;
  }

  // For past dates, calculate age as before
  const pastTimeDiff = today.getTime() - birthDate.getTime();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust calculations if needed
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Build the age string
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} year${years !== 1 ? "s" : ""}`);
  }
  if (months > 0) {
    parts.push(`${months} month${months !== 1 ? "s" : ""}`);
  }
  if (days > 0) {
    parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  }
  if (days === 0) {
    parts.push(`Just Born Today`);
  }

  return parts.join(", ");
};

export const getGenderLabel = ({
  gender,
  lang,
}: {
  gender: string;
  lang: string;
}) => {
  if (lang === "mm") {
    return gender === "male" ? "ကျား" : "မ";
  } else {
    return gender === "male" ? "Male" : "Female";
  }
};

export const getStringForEachRsType = (
  arr: any[],
  lang: string,
  relationship: string
) => {
  let rsLabel = "";
  if (lang === "mm") {
    if (arr.length === 1) {
      return `${arr[0].name} ရဲ့ ${relationship} `;
    }
    arr.forEach((child, index) => {
      if (index === arr.length - 1) {
        rsLabel += `နဲ့ ${child.name} တို့ ${relationship} `;
      } else {
        rsLabel += `${child.name}၊ `;
      }
    });
    return rsLabel;
  }
  if (arr.length === 1) {
    return `${relationship} of ${arr[0].name}`;
  }
  arr.forEach((child, index) => {
    if (index === 0) {
      rsLabel += `${relationship} of ${arr[0].name}, `;
    }
    if (index === arr.length - 1) {
      rsLabel += `and ${child.name}`;
    }

    if (index > 0 && index < arr.length - 1) {
      rsLabel += `${child.name}, `;
    }
  });
};

export const getRelationshipLabel = ({
  children,
  lang = "mm",
}: {
  children: any[];
  lang?: string;
}) => {
  const mom = children.filter((child) => child.guardian_role === "mom");
  const dad = children.filter((child) => child.guardian_role === "dad");
  const grandpa = children.filter((child) => child.guardian_role === "grandpa");
  const grandma = children.filter((child) => child.guardian_role === "grandma");
  const uncle = children.filter((child) => child.guardian_role === "uncle");
  const aunt = children.filter((child) => child.guardian_role === "aunt");
  const brother = children.filter((child) => child.guardian_role === "brother");
  const sister = children.filter((child) => child.guardian_role === "sister");
  const caregiver = children.filter(
    (child) => child.guardian_role === "caregiver"
  );

  const momLabel = getStringForEachRsType(
    mom,
    lang,
    lang === "en" ? "Mom" : "မေမေ"
  );
  const dadLabel = getStringForEachRsType(
    dad,
    lang,
    lang === "en" ? "Dad" : "ဖေဖေ"
  );
  const grandpaLabel = getStringForEachRsType(
    grandpa,
    lang,
    lang === "en" ? "Grandpa" : "ဖိုးဖိုး"
  );
  const grandmaLabel = getStringForEachRsType(
    grandma,
    lang,
    lang === "en" ? "Grandma" : "ဖွားဖွား"
  );
  const uncleLabel = getStringForEachRsType(
    uncle,
    lang,
    lang === "en" ? "Uncle" : "ဦးဦး"
  );
  const auntLabel = getStringForEachRsType(
    aunt,
    lang,
    lang === "en" ? "Aunty" : "ဒေါ်ဒေါ်"
  );
  const brotherLabel = getStringForEachRsType(
    brother,
    lang,
    lang === "en" ? "Brother" : "ကိုကို"
  );
  const sisterLabel = getStringForEachRsType(
    sister,
    lang,
    lang === "en" ? "Sister" : "မမ"
  );
  const caregiverLabel = getStringForEachRsType(
    caregiver,
    lang,
    lang === "en" ? "Caregiver" : "စောင့်ရှောက်သူ"
  );

  return `${(momLabel && `${momLabel}</br>`) || ""}${(dadLabel && `${dadLabel}</br>`) || ""}${(grandpaLabel && `${grandpaLabel}</br>`) || ""}${(grandmaLabel && `${grandmaLabel}</br>`) || ""}${(uncleLabel && `${uncleLabel}</br>`) || ""}${(auntLabel && `${auntLabel}</br>`) || ""}${(brotherLabel && `${brotherLabel}</br>`) || ""}${(sisterLabel && `${sisterLabel}</br>`) || ""}${(caregiverLabel && `${caregiverLabel}</br>`) || ""}`;
};

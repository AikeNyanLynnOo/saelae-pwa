import { destroyCookie, setCookie } from "nookies";

export const setAppTokenCookie = (token: string): void => {
  const maxAge = 24 * 60 * 60; // 24 hours in seconds

  setCookie(null, "app_token", token, {
    maxAge: maxAge,
    path: "/",
    sameSite: "Strict",
    secure: true,
  });
};

export const deleteAppTokenCookie = (): void => {
  // Set cookie with immediate expiration to delete it
  destroyCookie(null, "app_token");
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

export const getCountryNameFromISO2 = (iso2: string): string => {
  const countries = new Map([
    ["AF", "Afghanistan"],
    ["AL", "Albania"],
    ["DZ", "Algeria"],
    ["AS", "American Samoa"],
    ["AD", "Andorra"],
    ["AO", "Angola"],
    ["AI", "Anguilla"],
    ["AQ", "Antarctica"],
    ["AG", "Antigua and Barbuda"],
    ["AR", "Argentina"],
    ["AM", "Armenia"],
    ["AW", "Aruba"],
    ["AU", "Australia"],
    ["AT", "Austria"],
    ["AZ", "Azerbaijan"],
    ["BS", "Bahamas"],
    ["BH", "Bahrain"],
    ["BD", "Bangladesh"],
    ["BB", "Barbados"],
    ["BY", "Belarus"],
    ["BE", "Belgium"],
    ["BZ", "Belize"],
    ["BJ", "Benin"],
    ["BM", "Bermuda"],
    ["BT", "Bhutan"],
    ["BO", "Bolivia"],
    ["BA", "Bosnia and Herzegovina"],
    ["BW", "Botswana"],
    ["BV", "Bouvet Island"],
    ["BR", "Brazil"],
    ["IO", "British Indian Ocean Territory"],
    ["BN", "Brunei Darussalam"],
    ["BG", "Bulgaria"],
    ["BF", "Burkina Faso"],
    ["BI", "Burundi"],
    ["KH", "Cambodia"],
    ["CM", "Cameroon"],
    ["CA", "Canada"],
    ["CV", "Cape Verde"],
    ["KY", "Cayman Islands"],
    ["CF", "Central African Republic"],
    ["TD", "Chad"],
    ["CL", "Chile"],
    ["CN", "China"],
    ["CX", "Christmas Island"],
    ["CC", "Cocos (Keeling) Islands"],
    ["CO", "Colombia"],
    ["KM", "Comoros"],
    ["CG", "Congo"],
    ["CD", "Congo, Democratic Republic of the"],
    ["CK", "Cook Islands"],
    ["CR", "Costa Rica"],
    ["CI", "Côte d'Ivoire"],
    ["HR", "Croatia"],
    ["CU", "Cuba"],
    ["CY", "Cyprus"],
    ["CZ", "Czech Republic"],
    ["DK", "Denmark"],
    ["DJ", "Djibouti"],
    ["DM", "Dominica"],
    ["DO", "Dominican Republic"],
    ["EC", "Ecuador"],
    ["EG", "Egypt"],
    ["SV", "El Salvador"],
    ["GQ", "Equatorial Guinea"],
    ["ER", "Eritrea"],
    ["EE", "Estonia"],
    ["ET", "Ethiopia"],
    ["FK", "Falkland Islands (Malvinas)"],
    ["FO", "Faroe Islands"],
    ["FJ", "Fiji"],
    ["FI", "Finland"],
    ["FR", "France"],
    ["GF", "French Guiana"],
    ["PF", "French Polynesia"],
    ["TF", "French Southern Territories"],
    ["GA", "Gabon"],
    ["GM", "Gambia"],
    ["GE", "Georgia"],
    ["DE", "Germany"],
    ["GH", "Ghana"],
    ["GI", "Gibraltar"],
    ["GR", "Greece"],
    ["GL", "Greenland"],
    ["GD", "Grenada"],
    ["GP", "Guadeloupe"],
    ["GU", "Guam"],
    ["GT", "Guatemala"],
    ["GN", "Guinea"],
    ["GW", "Guinea-Bissau"],
    ["GY", "Guyana"],
    ["HT", "Haiti"],
    ["HM", "Heard Island and McDonald Islands"],
    ["VA", "Holy See (Vatican City State)"],
    ["HN", "Honduras"],
    ["HK", "Hong Kong"],
    ["HU", "Hungary"],
    ["IS", "Iceland"],
    ["IN", "India"],
    ["ID", "Indonesia"],
    ["IR", "Iran"],
    ["IQ", "Iraq"],
    ["IE", "Ireland"],
    ["IL", "Israel"],
    ["IT", "Italy"],
    ["JM", "Jamaica"],
    ["JP", "Japan"],
    ["JO", "Jordan"],
    ["KZ", "Kazakhstan"],
    ["KE", "Kenya"],
    ["KI", "Kiribati"],
    ["KP", "North Korea"],
    ["KR", "South Korea"],
    ["KW", "Kuwait"],
    ["KG", "Kyrgyzstan"],
    ["LA", "Laos"],
    ["LV", "Latvia"],
    ["LB", "Lebanon"],
    ["LS", "Lesotho"],
    ["LR", "Liberia"],
    ["LY", "Libya"],
    ["LI", "Liechtenstein"],
    ["LT", "Lithuania"],
    ["LU", "Luxembourg"],
    ["MO", "Macao"],
    ["MK", "North Macedonia"],
    ["MG", "Madagascar"],
    ["MW", "Malawi"],
    ["MY", "Malaysia"],
    ["MV", "Maldives"],
    ["ML", "Mali"],
    ["MT", "Malta"],
    ["MH", "Marshall Islands"],
    ["MQ", "Martinique"],
    ["MR", "Mauritania"],
    ["MU", "Mauritius"],
    ["YT", "Mayotte"],
    ["MX", "Mexico"],
    ["FM", "Micronesia"],
    ["MD", "Moldova"],
    ["MC", "Monaco"],
    ["MN", "Mongolia"],
    ["MS", "Montserrat"],
    ["MA", "Morocco"],
    ["MZ", "Mozambique"],
    ["MM", "Myanmar"],
    ["NA", "Namibia"],
    ["NR", "Nauru"],
    ["NP", "Nepal"],
    ["NL", "Netherlands"],
    ["NC", "New Caledonia"],
    ["NZ", "New Zealand"],
    ["NI", "Nicaragua"],
    ["NE", "Niger"],
    ["NG", "Nigeria"],
    ["NU", "Niue"],
    ["NF", "Norfolk Island"],
    ["MP", "Northern Mariana Islands"],
    ["NO", "Norway"],
    ["OM", "Oman"],
    ["PK", "Pakistan"],
    ["PW", "Palau"],
    ["PS", "Palestine"],
    ["PA", "Panama"],
    ["PG", "Papua New Guinea"],
    ["PY", "Paraguay"],
    ["PE", "Peru"],
    ["PH", "Philippines"],
    ["PN", "Pitcairn"],
    ["PL", "Poland"],
    ["PT", "Portugal"],
    ["PR", "Puerto Rico"],
    ["QA", "Qatar"],
    ["RE", "Réunion"],
    ["RO", "Romania"],
    ["RU", "Russian Federation"],
    ["RW", "Rwanda"],
    ["SH", "Saint Helena"],
    ["KN", "Saint Kitts and Nevis"],
    ["LC", "Saint Lucia"],
    ["PM", "Saint Pierre and Miquelon"],
    ["VC", "Saint Vincent and the Grenadines"],
    ["WS", "Samoa"],
    ["SM", "San Marino"],
    ["ST", "Sao Tome and Principe"],
    ["SA", "Saudi Arabia"],
    ["SN", "Senegal"],
    ["SC", "Seychelles"],
    ["SL", "Sierra Leone"],
    ["SG", "Singapore"],
    ["SK", "Slovakia"],
    ["SI", "Slovenia"],
    ["SB", "Solomon Islands"],
    ["SO", "Somalia"],
    ["ZA", "South Africa"],
    ["ES", "Spain"],
    ["LK", "Sri Lanka"],
    ["SD", "Sudan"],
    ["SR", "Suriname"],
    ["SJ", "Svalbard and Jan Mayen"],
    ["SZ", "Eswatini"],
    ["SE", "Sweden"],
    ["CH", "Switzerland"],
    ["SY", "Syrian Arab Republic"],
    ["TW", "Taiwan"],
    ["TJ", "Tajikistan"],
    ["TZ", "Tanzania"],
    ["TH", "Thailand"],
    ["TL", "Timor-Leste"],
    ["TG", "Togo"],
    ["TK", "Tokelau"],
    ["TO", "Tonga"],
    ["TT", "Trinidad and Tobago"],
    ["TN", "Tunisia"],
    ["TR", "Turkey"],
    ["TM", "Turkmenistan"],
    ["TC", "Turks and Caicos Islands"],
    ["TV", "Tuvalu"],
    ["UG", "Uganda"],
    ["UA", "Ukraine"],
    ["AE", "United Arab Emirates"],
    ["GB", "United Kingdom"],
    ["US", "United States"],
    ["UY", "Uruguay"],
    ["UZ", "Uzbekistan"],
    ["VU", "Vanuatu"],
    ["VE", "Venezuela"],
    ["VN", "Vietnam"],
    ["VG", "Virgin Islands, British"],
    ["VI", "Virgin Islands, U.S."],
    ["WF", "Wallis and Futuna"],
    ["EH", "Western Sahara"],
    ["YE", "Yemen"],
    ["ZM", "Zambia"],
    ["ZW", "Zimbabwe"],
  ]);

  const countryName = countries.get(iso2.toUpperCase());
  return countryName || "Unknown Country";
};

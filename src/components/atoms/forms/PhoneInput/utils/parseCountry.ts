import { CountryData, ParsedCountry } from "@/components/atoms/forms/PhoneInput/types";

export const parseCountry = (countryData: CountryData): ParsedCountry => {
  const [name, iso2, dialCode, format, priority, areaCodes] = countryData;
  return {
    name,
    iso2,
    dialCode,
    format,
    priority,
    areaCodes,
  };
};

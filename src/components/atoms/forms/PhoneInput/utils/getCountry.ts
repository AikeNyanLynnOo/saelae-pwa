import { defaultCountries } from "@/components/atoms/forms/PhoneInput/data";
import { CountryData, ParsedCountry } from "@/components/atoms/forms/PhoneInput/types";
import { parseCountry } from "@/components/atoms/forms/PhoneInput/utils/parseCountry";

const constructFieldNotSupportedErrorMessage = (field: keyof ParsedCountry) => {
  return `Field "${field}" is not supported`;
};

export const getCountry = ({
  field,
  value,
  countries = defaultCountries,
}: {
  /**
   * field to search by
   */
  field: keyof ParsedCountry;
  /**
   * value to search for
   */
  value: CountryData[number];
  countries?: CountryData[];
}): ParsedCountry | undefined => {
  if (["priority"].includes(field)) {
    throw new Error(constructFieldNotSupportedErrorMessage(field));
  }
  const country = countries.find((country) => {
    const parsedCountry = parseCountry(country);
    return value === parsedCountry[field];
  });

  if (!country) return undefined;
  return parseCountry(country);
};

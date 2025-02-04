import { removeNonDigits } from "./removeNonDigits";

export const toE164 = ({
  phone,
  prefix,
}: {
  phone: string;
  prefix: string;
}) => {
  return phone ? `${prefix}${removeNonDigits(phone)}` : '';
};
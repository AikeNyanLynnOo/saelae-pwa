import { removeNonDigits } from "@/components/atoms/forms/PhoneInput/utils/removeNonDigits";

export const toE164 = ({
  phone,
  prefix,
}: {
  phone: string;
  prefix: string;
}) => {
  return phone ? `${prefix}${removeNonDigits(phone)}` : '';
};
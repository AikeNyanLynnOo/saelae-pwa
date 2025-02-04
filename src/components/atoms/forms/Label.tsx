import { SLTypo } from "@/components/SLTypo";
import { Label } from "@/components/ui/label";

interface LabelProps {
  labelText?: string;
  htmlFor?: string;
}

export const SLLabel = ({ labelText, htmlFor }: LabelProps) => {
  return (
    <Label htmlFor={htmlFor}>
      <SLTypo
        text={labelText}
        variant="fontLabelMedium"
        className="text-[color:--semantic-color-text-default]"
      />
    </Label>
  );
};

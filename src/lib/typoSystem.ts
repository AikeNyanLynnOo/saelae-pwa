import {
  fontBody1,
  fontBody2,
  fontBody2Intense,
  fontBody2Underlined,
  fontBody3,
  fontBody3Intense,
  fontBody3Underlined,
  fontBody4,
  fontBody5,
  fontButtonMd,
  fontButtonSm,
  fontCaption1,
  fontCaption2,
  fontH1,
  fontH2,
  fontH3,
  fontH4,
  fontH5,
  fontH6,
  fontLabel,
} from "@/lib/tokens";

export const notoMyanmar = "'Noto-Sans-Myanmar', 'Inter', sans-serif";

export const TypoVariants = [
  // h
  "fontH1Normal",
  "fontH1Medium",
  "fontH1Semibold",
  "fontH1Bold",

  "fontH2Normal",
  "fontH2Medium",
  "fontH2Semibold",
  "fontH2Bold",

  "fontH3Normal",
  "fontH3Medium",
  "fontH3Semibold",
  "fontH3Bold",

  "fontH3Normal",
  "fontH3Medium",
  "fontH3Semibold",
  "fontH3Bold",

  "fontH4Normal",
  "fontH4Medium",
  "fontH4Semibold",
  "fontH4Bold",

  "fontH5Normal",
  "fontH5Medium",
  "fontH5Semibold",
  "fontH5Bold",

  "fontH6Normal",
  "fontH6Medium",
  "fontH6Semibold",
  "fontH6Bold",

  // caption
  "fontCaption1Normal",
  "fontCaption1Medium",
  "fontCaption1Semibold",
  "fontCaption1Bold",

  "fontCaption2Normal",
  "fontCaption2Medium",
  "fontCaption2Semibold",
  "fontCaption2Bold",

  // body
  "fontBody1Normal",
  "fontBody1Medium",
  "fontBody1Semibold",
  "fontBody1Bold",

  "fontBody2Normal",
  "fontBody2Medium",
  "fontBody2Semibold",
  "fontBody2Bold",

  "fontBody3Normal",
  "fontBody3Medium",
  "fontBody3Semibold",
  "fontBody3Bold",

  "fontBody4Normal",
  "fontBody4Medium",
  "fontBody4Semibold",
  "fontBody4Bold",

  "fontBody5Normal",
  "fontBody5Medium",
  "fontBody5Semibold",
  "fontBody5Bold",

  // body underlined
  "fontBody2UnderlinedNormal",
  "fontBody2UnderlinedMedium",
  "fontBody2UnderlinedSemibold",
  "fontBody2UnderlinedBold",

  "fontBody3UnderlinedNormal",
  "fontBody3UnderlinedMedium",
  "fontBody3UnderlinedSemibold",
  "fontBody3UnderlinedBold",

  // body instense
  "fontBody2IntenseNormal",
  "fontBody2IntenseMedium",
  "fontBody2IntenseSemibold",
  "fontBody2IntenseBold",

  "fontBody3IntenseNormal",
  "fontBody3IntenseMedium",
  "fontBody3IntenseSemibold",
  "fontBody3IntenseBold",

  // label
  "fontLabelNormal",
  "fontLabelMedium",
  "fontLabelSemibold",
  "fontLabelBold",

  // font button
  "fontButtonSmNormal",
  "fontButtonSmMedium",
  "fontButtonSmSemibold",
  "fontButtonSmBold",

  "fontButtonMdNormal",
  "fontButtonMdMedium",
  "fontButtonMdSemibold",
  "fontButtonMdBold",
] as const;

export const fontFunc = ({
  fontFamily,
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight,
  ...otherProps
}: {
  fontFamily: string;
  fontSize: string | number;
  lineHeight: string | number;
  letterSpacing: string | number;
  fontWeight: string | number;
  [otherProp: string]: any;
}) => {
  return {
    fontFamily: [notoMyanmar, "-apple-system", "Arial"].join(","),
    fontSize,
    lineHeight:
      (lineHeight &&
        (typeof lineHeight === "number" ? `${lineHeight}px` : lineHeight)) ||
      "1.6em",
    letterSpacing,
    fontWeight,
  };
};

export const typoSystem: any = {
  fontFamily: [notoMyanmar, "-apple-system", "Arial"].join(","),

  // fontH1
  fontH1Normal: {
    ...fontH1,
    fontWeight: 400,
  },
  fontH1Medium: {
    ...fontH1,
    fontWeight: 500,
  },
  fontH1Semibold: {
    ...fontH1,
    fontWeight: 600,
  },
  fontH1Bold: {
    ...fontH1,
    fontWeight: 700,
  },

  // fontH2
  fontH2Normal: {
    ...fontH2,
    fontWeight: 400,
  },
  fontH2Medium: {
    ...fontH2,
    fontWeight: 500,
  },
  fontH2Semibold: {
    ...fontH2,
    fontWeight: 600,
  },
  fontH2Bold: {
    ...fontH2,
    fontWeight: 700,
  },

  // fontH3
  fontH3Normal: {
    ...fontH3,
    fontWeight: 400,
  },
  fontH3Medium: {
    ...fontH3,
    fontWeight: 500,
  },
  fontH3Semibold: {
    ...fontH3,
    fontWeight: 600,
  },
  fontH3Bold: {
    ...fontH3,
    fontWeight: 700,
  },

  // fontH4
  fontH4Normal: {
    ...fontH4,
    fontWeight: 400,
  },
  fontH4Medium: {
    ...fontH4,
    fontWeight: 500,
  },
  fontH4Semibold: {
    ...fontH4,
    fontWeight: 600,
  },
  fontH4Bold: {
    ...fontH4,
    fontWeight: 700,
  },

  // fontH5
  fontH5Normal: {
    ...fontH5,
    fontWeight: 400,
  },
  fontH5Medium: {
    ...fontH5,
    fontWeight: 500,
  },
  fontH5Semibold: {
    ...fontH5,
    fontWeight: 600,
  },
  fontH5Bold: {
    ...fontH5,
    fontWeight: 700,
  },

  // fontH6
  fontH6Normal: {
    ...fontH6,
    fontWeight: 400,
  },
  fontH6Medium: {
    ...fontH6,
    fontWeight: 500,
  },
  fontH6Semibold: {
    ...fontH6,
    fontWeight: 600,
  },
  fontH6Bold: {
    ...fontH6,
    fontWeight: 700,
  },

  // fontCaption1
  fontCaption1Normal: {
    ...fontCaption1,
    fontWeight: 400,
  },
  fontCaption1Medium: {
    ...fontCaption1,
    fontWeight: 500,
  },
  fontCaption1Semibold: {
    ...fontCaption1,
    fontWeight: 600,
  },
  fontCaption1Bold: {
    ...fontCaption1,
    fontWeight: 700,
  },

  // fontCaption2
  fontCaption2Normal: {
    ...fontCaption2,
    fontWeight: 400,
  },
  fontCaption2Medium: {
    ...fontCaption2,
    fontWeight: 500,
  },
  fontCaption2Semibold: {
    ...fontCaption2,
    fontWeight: 600,
  },
  fontCaption2Bold: {
    ...fontCaption2,
    fontWeight: 700,
  },

  // fontBody1
  fontBody1Normal: {
    ...fontBody1,
    fontWeight: 400,
  },
  fontBody1Medium: {
    ...fontBody1,
    fontWeight: 500,
  },
  fontBody1Semibold: {
    ...fontBody1,
    fontWeight: 600,
  },
  fontBody1Bold: {
    ...fontBody1,
    fontWeight: 700,
  },

  // fontBody2
  fontBody2Normal: {
    ...fontBody2,
    fontWeight: 400,
  },
  fontBody2Medium: {
    ...fontBody2,
    fontWeight: 500,
  },
  fontBody2Semibold: {
    ...fontBody2,
    fontWeight: 600,
  },
  fontBody2Bold: {
    ...fontBody2,
    fontWeight: 700,
  },

  // fontBody3
  fontBody3Normal: {
    ...fontBody3,
    fontWeight: 400,
  },
  fontBody3Medium: {
    ...fontBody3,
    fontWeight: 500,
  },
  fontBody3Semibold: {
    ...fontBody3,
    fontWeight: 600,
  },
  fontBody3Bold: {
    ...fontBody3,
    fontWeight: 700,
  },

  // fontBody4
  fontBody4Normal: {
    ...fontBody4,
    fontWeight: 400,
  },
  fontBody4Medium: {
    ...fontBody4,
    fontWeight: 500,
  },
  fontBody4Semibold: {
    ...fontBody4,
    fontWeight: 600,
  },
  fontBody4Bold: {
    ...fontBody4,
    fontWeight: 700,
  },

  // fontBody5
  fontBody5Normal: {
    ...fontBody5,
    fontWeight: 400,
  },
  fontBody5Medium: {
    ...fontBody5,
    fontWeight: 500,
  },
  fontBody5Semibold: {
    ...fontBody5,
    fontWeight: 600,
  },
  fontBody5Bold: {
    ...fontBody5,
    fontWeight: 700,
  },

  // fontBody2Underlined
  fontBody2UnderlinedNormal: {
    ...fontBody2Underlined,
    fontWeight: 400,
  },
  fontBody2UnderlinedMedium: {
    ...fontBody2Underlined,
    fontWeight: 500,
  },
  fontBody2UnderlinedSemibold: {
    ...fontBody2Underlined,
    fontWeight: 600,
  },
  fontBody2UnderlinedBold: {
    ...fontBody2Underlined,
    fontWeight: 700,
  },

  // fontBody3Underlined
  fontBody3UnderlinedNormal: {
    ...fontBody3Underlined,
    fontWeight: 400,
  },
  fontBody3UnderlinedMedium: {
    ...fontBody3Underlined,
    fontWeight: 500,
  },
  fontBody3UnderlinedSemibold: {
    ...fontBody3Underlined,
    fontWeight: 600,
  },
  fontBody3UnderlinedBold: {
    ...fontBody3Underlined,
    fontWeight: 700,
  },

  // fontBody2Intense
  fontBody2IntenseNormal: {
    ...fontBody2Intense,
    fontWeight: 400,
  },
  fontBody2IntenseMedium: {
    ...fontBody2Intense,
    fontWeight: 500,
  },
  fontBody2IntenseSemibold: {
    ...fontBody2Intense,
    fontWeight: 600,
  },
  fontBody2IntenseBold: {
    ...fontBody2Intense,
    fontWeight: 700,
  },

  // fontBody3Intense
  fontBody3IntenseNormal: {
    ...fontBody3Intense,
    fontWeight: 400,
  },
  fontBody3IntenseMedium: {
    ...fontBody3Intense,
    fontWeight: 500,
  },
  fontBody3IntenseSemibold: {
    ...fontBody3Intense,
    fontWeight: 600,
  },
  fontBody3IntenseBold: {
    ...fontBody3Intense,
    fontWeight: 700,
  },

  // label
  fontLabelNormal: {
    ...fontLabel,
    fontWeight: 400,
  },
  fontLabelMedium: {
    ...fontLabel,
    fontWeight: 500,
  },
  fontLabelSemibold: {
    ...fontLabel,
    fontWeight: 600,
  },
  fontLabelBold: {
    ...fontLabel,
    fontWeight: 700,
  },

  // fontButtonSm
  fontButtonSmNormal: {
    ...fontButtonSm,
    fontWeight: 400,
  },
  fontButtonSmMedium: {
    ...fontButtonSm,
    fontWeight: 500,
  },
  fontButtonSmSemibold: {
    ...fontButtonSm,
    fontWeight: 600,
  },
  fontButtonSmBold: {
    ...fontButtonSm,
    fontWeight: 700,
  },

  // fontButtonMd
  fontButtonMdNormal: {
    ...fontButtonMd,
    fontWeight: 400,
  },
  fontButtonMdMedium: {
    ...fontButtonMd,
    fontWeight: 500,
  },
  fontButtonMdSemibold: {
    ...fontButtonMd,
    fontWeight: 600,
  },
  fontButtonMdBold: {
    ...fontButtonMd,
    fontWeight: 700,
  },
};

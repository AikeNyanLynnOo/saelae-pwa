"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SLTypo } from "../SLTypo";
import { LabelWithIcon } from "./LabelWithIcon";
import { ChevronDown } from "lucide-react";
import { Female, Male } from "./CustomIcon";

interface Baby {
  name: string;
  gender: string;
  age?: string;
}

interface BabyNameWithDropDownProps {
  children?: React.ReactNode;
  customClasses?: string;
  babies?: Baby[];
}

export const BabyNameWithDropDown = ({
  children,
  customClasses,
  babies,
}: BabyNameWithDropDownProps) => {
  const [currentBaby, setCurrentBaby] = React.useState(
    (babies && babies[0]) || null
  );
  return (
    <div className="flex flex-col gap-y-[var(--core-spacing-base)] items-center">
      {(babies && babies.length > 1 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none p-0">
              <LabelWithIcon
                label={(currentBaby && currentBaby.name) || ""}
                icon={ChevronDown}
                iconPosition="end"
                variant="fontH4Semibold"
                className="pl-[var(--core-spacing-lg)] pr-[var(--core-spacing-md)] py-[var(--core-spacing-sm)]] bg-[var(--semantic-color-bg-primary)] rounded-[var(--core-border-radius-xs)]"
                iconClassName="h-4 w-4"
                labelClassName="text-[var(--semantic-color-text-default)]"
                labelFontFamily="var(--font-manrope)"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            {babies.map((baby: any, index: number) => (
              <>
                <DropdownMenuItem
                  key={index}
                  onSelect={() => setCurrentBaby(baby)}
                >
                  <LabelWithIcon
                    label={baby.name}
                    customIcon={baby.gender === "male" ? Male : Female}
                    iconPosition="start"
                    variant="fontBody2IntenseSemibold"
                    className="py-[var(--core-spacing-sm)] px-[var(--core-spacing-lg)]"
                    iconClassName="h-6 w-6"
                    labelClassName="text-[var(--semantic-color-text-default)]"
                    labelFontFamily="var(--font-figma)"
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )) || (
        <SLTypo
          as="h2"
          text={(babies && babies.length > 1 && babies[0].name) || ""}
          variant={"fontH4Semibold"}
          className="text-[var(--semantic-color-text-default)] px-[var(--core-spacing-lg)] py-[var(--core-spacing-sm)]] bg-[var(--semantic-color-bg-primary)] rounded-[var(--core-border-radius-xs)]"
          fontFamily="var(--font-manrope)"
        />
      )}
      <SLTypo
        as="span"
        text={(currentBaby && currentBaby.age) || ""}
        variant={"fontBody2Normal"}
        className="text-[var(--semantic-color-text-subtle)] text-center"
      />
    </div>
  );
};

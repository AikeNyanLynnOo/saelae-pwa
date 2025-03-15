"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { SLTypo } from "../SLTypo";
import { Female, Male } from "./CustomIcon";
import { LabelWithIcon } from "./LabelWithIcon";
import { useBabyStore } from "@/store/baby-store";
import { calculateAge } from "@/utils/helperFunction";

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
  const { currentBaby, setCurrentBaby } = useBabyStore();

  console.log("Babies>>", babies);
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
                    labelFontFamily="var(--font-figtree)"
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
          text={(currentBaby && currentBaby.name) || ""}
          variant={"fontH4Semibold"}
          className="text-[var(--semantic-color-text-default)] px-[var(--core-spacing-lg)] py-[var(--core-spacing-sm)]] bg-[var(--semantic-color-bg-primary)] rounded-[var(--core-border-radius-xs)]"
          fontFamily="var(--font-manrope)"
        />
      )}
      <SLTypo
        as="span"
        text={(currentBaby && calculateAge(currentBaby.birth_date)) || ""}
        variant={"fontBody2Normal"}
        className="text-[var(--semantic-color-text-subtle)] text-center"
      />
    </div>
  );
};

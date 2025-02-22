import "@/components/atoms/forms/PhoneInput/styles/CountrySelector.style.scss";

import React, { useMemo, useRef, useState } from "react";

import { defaultCountries } from "@/components/atoms/forms/PhoneInput/data";
import { buildClassNames } from "@/components/atoms/forms/PhoneInput/buildClassNames";
import {
  CountryData,
  CountryIso2,
} from "@/components/atoms/forms/PhoneInput/types";

import { getCountry } from "@/components/atoms/forms/PhoneInput/utils/getCountry";
import { FlagImage } from "@/components/atoms/forms/PhoneInput/FlagImage/FlagImage";
import {
  CountrySelectorDropdown,
  CountrySelectorDropdownProps,
  CountrySelectorDropdownStyleProps,
} from "@/components/atoms/forms/PhoneInput/CountrySelector/CountrySelectorDropdown";

export interface CountrySelectorStyleProps {
  style?: React.CSSProperties;
  className?: string;

  buttonStyle?: React.CSSProperties;
  buttonClassName?: string;

  buttonContentWrapperStyle?: React.CSSProperties;
  buttonContentWrapperClassName?: string;

  flagStyle?: React.CSSProperties;
  flagClassName?: string;

  dropdownArrowStyle?: React.CSSProperties;
  dropdownArrowClassName?: string;

  dropdownStyleProps?: CountrySelectorDropdownStyleProps;
}

type RenderButtonWrapperRootProps = {
  // Omit the event argument to prevent errors on event mistype
  onClick: () => void;
} & Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "onKeyDown"
  | "onMouseDown"
  | "title"
  | "disabled"
  | "role"
  | "aria-label"
  | "aria-haspopup"
  | "aria-expanded"
>;

export interface CountrySelectorProps extends CountrySelectorStyleProps {
  selectedCountry: CountryIso2;
  onSelect?: CountrySelectorDropdownProps["onSelect"];
  disabled?: boolean;
  hideDropdown?: boolean;
  countries?: CountryData[];
  preferredCountries?: CountryIso2[];
  flags?: CountrySelectorDropdownProps["flags"];
  renderButtonWrapper?: (props: {
    children: React.ReactNode;
    rootProps: RenderButtonWrapperRootProps;
  }) => React.ReactNode;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onSelect,
  disabled,
  hideDropdown,
  countries = defaultCountries,
  preferredCountries = [],
  flags,
  renderButtonWrapper,
  ...styleProps
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const fullSelectedCountry = useMemo(() => {
    if (!selectedCountry) return undefined;
    return getCountry({
      value: selectedCountry,
      field: "iso2",
      countries: countries,
    });
  }, [countries, selectedCountry]);

  const countrySelectorRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!e.key) return;

    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      setShowDropdown(true);
    }
  };

  const renderSelectorButton = () => {
    const rootProps: RenderButtonWrapperRootProps = {
      title: fullSelectedCountry?.name,
      onClick: () => setShowDropdown((v) => !v),
      // Need this to close dropdown on selector button click
      // https://stackoverflow.com/a/28963938
      onMouseDown: (e) => e.preventDefault(),
      onKeyDown: handleKeyDown,
      disabled: hideDropdown || disabled,
      role: "combobox",
      "aria-label": "Country selector",
      "aria-haspopup": "listbox",
      "aria-expanded": showDropdown,
    };

    const buttonContent = (
      <div
        className={buildClassNames({
          addPrefix: ["country-selector-button__button-content"],
          rawClassNames: [styleProps.buttonContentWrapperClassName],
        })}
        style={styleProps.buttonContentWrapperStyle}
      >
        <FlagImage
          iso2={selectedCountry}
          src={flags?.find((f: any) => f.iso2 === selectedCountry)?.src}
          className={buildClassNames({
            addPrefix: [
              "country-selector-button__flag-emoji",
              disabled && "country-selector-button__flag-emoji--disabled",
            ],
            rawClassNames: [styleProps.flagClassName],
          })}
          style={{
            visibility: selectedCountry ? "visible" : "hidden",
            ...styleProps.flagStyle,
          }}
        />
        {!hideDropdown && (
          <div
            className={buildClassNames({
              addPrefix: [
                "country-selector-button__dropdown-arrow",
                disabled && "country-selector-button__dropdown-arrow--disabled",
                showDropdown &&
                  "country-selector-button__dropdown-arrow--active",
              ],
              rawClassNames: [styleProps.dropdownArrowClassName],
            })}
            style={styleProps.dropdownArrowStyle}
          />
        )}
      </div>
    );
    if (renderButtonWrapper) {
      return renderButtonWrapper({
        children: buttonContent,
        rootProps: rootProps,
      });
    }
    return (
      <button
        {...rootProps}
        type="button"
        className={buildClassNames({
          addPrefix: [
            "country-selector-button",
            showDropdown && "country-selector-button--active",
            disabled && "country-selector-button--disabled",
            hideDropdown && "country-selector-button--hide-dropdown",
          ],
          rawClassNames: [styleProps.buttonClassName],
        })}
        data-country={selectedCountry}
        style={styleProps.buttonStyle}
      >
        {buttonContent}
      </button>
    );
  };

  return (
    <div
      className={buildClassNames({
        addPrefix: ["country-selector"],
        rawClassNames: [styleProps.className],
      })}
      style={styleProps.style}
      ref={countrySelectorRef}
    >
      {renderSelectorButton()}
      <CountrySelectorDropdown
        show={showDropdown}
        countries={countries}
        preferredCountries={preferredCountries}
        flags={flags}
        onSelect={(country: any) => {
          setShowDropdown(false);
          onSelect?.(country);
        }}
        selectedCountry={selectedCountry}
        onClose={() => {
          setShowDropdown(false);
        }}
        {...styleProps.dropdownStyleProps}
      />
    </div>
  );
};

"use client";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder: string;
};

const SelectCategory = ({ name, options, placeholder }: Props) => {
  const { register, setValue, getValues } = useFormContext();
  const [selectedValues, setSelectedValues] = useState<string[]>(
    getValues(name) || []
  );

  const handleSelect = (value: string) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v: string) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedValues);
    setValue(name, updatedValues);
  };

  const isSelected = (value: string) => selectedValues.includes(value);

  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Language</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className="justify-start ps-1"
            >
              {selectedValues.length ? (
                <MapValues options={options} selectedValues={selectedValues} />
              ) : (
                <span className="ml-3">{placeholder}</span>
              )}
              <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50 ml-auto" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={placeholder} className="h-9" />
            <CommandList>
              <CommandEmpty>No {name} found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={() => {
                      handleSelect(option.value);
                    }}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected(option.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

const MapValues = ({
  selectedValues,
  options,
}: {
  selectedValues: string[];
  options: {
    label: string;
    value: string;
  }[];
}) =>
  options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => (
      <span
        key={option.value}
        className="mr-1 py-[2px] px-2 rounded-md border border-neutral-300"
      >
        {option.label}
      </span>
    ));

export default SelectCategory;

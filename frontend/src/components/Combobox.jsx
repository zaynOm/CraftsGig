/* eslint-disable react/prop-types */
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({ filterKey, data, handleChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const lableKey = filterKey === "city" ? "name" : "title";

  const handleOnSelect = (currValue, item) => {
    handleChange((prev) => {
      if (currValue === value.toLowerCase()) {
        prev.delete(filterKey);
        setValue("");
      } else {
        prev.set(filterKey, item.id);
        setValue(item[lableKey]);
      }
      return prev;
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-40 justify-between"
        >
          {value ? value : `Select ${filterKey}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${filterKey}...`} />
          <ScrollArea className="h-52">
            <CommandEmpty>No {filterKey} found.</CommandEmpty>
            <CommandGroup>
              {data &&
                data.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={(currValue) => handleOnSelect(currValue, item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item[lableKey] ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {item[lableKey]}
                  </CommandItem>
                ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

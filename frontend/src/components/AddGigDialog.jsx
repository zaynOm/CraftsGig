import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import useFetchCities from "@/hooks/useFetchCities";
import { useAuth } from "@/context/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import BASE_URL from "@/api/apiconfig";
import { ScrollArea } from "./ui/scroll-area";

function AddGigDialog() {
  const { getUserId, getToken } = useAuth();
  const [newGig, setNewGig] = useState({
    title: "",
    description: "",
    worker_id: getUserId(),
    city_id: "",
  });

  const onSubmit = async () => {
    try {
      const res = await fetch(`${BASE_URL}/gigs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newGig),
      });

      if (!res.ok) throw new Error(res.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="size-12 rounded-full p-0">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new gig</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Title"
          onChange={(e) =>
            setNewGig((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        <Textarea
          placeholder="Description"
          onChange={(e) =>
            setNewGig((prev) => {
              return { ...prev, description: e.target.value };
            })
          }
        />
        <CitiesComboBox handleOnSelect={setNewGig} />
        <DialogFooter>
          <Button onClick={onSubmit}>Add gig</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddGigDialog;

function CitiesComboBox({ handleOnSelect }) {
  const cities = useFetchCities();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-40 justify-between"
        >
          {value ? value : `Select city...`}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search city...`} />
          <ScrollArea className="h-52">
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {cities &&
                cities.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() =>
                      handleOnSelect((prev) => {
                        setValue(item.name);
                        setOpen(false);
                        return { ...prev, city_id: item.id };
                      })
                    }
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.name ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

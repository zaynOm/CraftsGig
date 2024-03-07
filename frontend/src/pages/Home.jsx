import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";

import GigsList from "@/components/GigsList";
import { Combobox } from "@/components/Combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import useFetchCities from "@/hooks/useFetchCities";
import useFetchDomains from "@/hooks/useFetchDomains";

function Home() {
  const cities = useFetchCities();
  const domains = useFetchDomains();
  const isAvailable = useRef(false);

  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    city: "",
    domain: "",
    isAvailable: "",
  });

  const handleFilterChange = (e, filterKey) => {
    const value = typeof e === "boolean" ? e : e.target.value;

    setSearchParams((prev) => {
      prev.set(filterKey, value);
      return prev;
    });
  };

  return (
    <div className="mt-20 flex h-svh flex-col items-center gap-5">
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleFilterChange(e, "search")}
          />
        </div>
        <Combobox
          filterKey="city"
          data={cities}
          handleChange={setSearchParams}
        />{" "}
        <Combobox
          filterKey="domain"
          data={domains}
          handleChange={setSearchParams}
        />
        <label className="flex items-center gap-2">
          <Switch
            name="available"
            id="available"
            ref={isAvailable}
            onCheckedChange={(e) => handleFilterChange(e, "isAvailable")}
          />
          Is Available
        </label>
        <Button>
          Filter
          <Filter className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </div>
      <GigsList />
    </div>
  );
}

export default Home;

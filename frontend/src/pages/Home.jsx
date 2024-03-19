import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";

import GigsList from "@/components/GigsList";
import { Combobox } from "@/components/Combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import useFetchCities from "@/hooks/useFetchCities";
import useFetchDomains from "@/hooks/useFetchDomains";
import useQueryFetch from "@/hooks/useQueryFetch";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useAuth } from "@/context/AuthContext";

function Home() {
  const cities = useFetchCities();
  const domains = useFetchDomains();
  const isAvailable = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useQueryFetch("gigs", `gigs?${searchParams}`);
  const { refetch } = query;

  const handleFilterChange = (e, filterKey) => {
    const value = typeof e === "boolean" ? e : e.target.value;

    setSearchParams(
      (prev) => {
        prev.set(filterKey, value);
        if (!value) {
          prev.delete(filterKey);
        }
        return prev;
      },
      { replace: true },
    );
  };

  return (
    <>
      <div className="mt-20 flex min-h-dvh flex-col items-center gap-5">
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
          />
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
          <Button onClick={refetch}>
            Filter
            <Filter className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
        <GigsList query={query} />
      </div>

      <Footer />
    </>
  );
}

export default Home;

function Footer() {
  const { authenticated } = useAuth();
  return (
    <footer className="grid h-96 grid-cols-3 justify-items-center gap-y-24 border-t p-24">
      <div>
        <Link to="/" className="text-4xl font-extrabold">
          CraftsGig
        </Link>
        <p className="mt-3 text-xl">
          Craft Your Vision, Connect with Precision
        </p>
      </div>
      <div>
        <span className="text-lg font-semibold">Links</span>
        <menu>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!authenticated ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
        </menu>
      </div>
      <div>
        <span className="text-lg font-semibold">Get in touch</span>
        <menu className="flex gap-2">
          <Link to="https://github.com/zaynOm/CraftsGig" target="_blank">
            <GitHubLogoIcon className="size-8" />
          </Link>
          <Link to="https://twitter.com/omar_ouaziz1" target="_blank">
            <TwitterLogoIcon className="size-8" />
          </Link>
          <Link
            to="https://discordapp.com/users/692722159705129013"
            target="_blank"
          >
            <DiscordLogoIcon className="size-8" />
          </Link>
        </menu>
      </div>
      <div className="col-span-full w-10/12 border-t pt-6 text-center">
        © 2024 CraftsGig. All Rights Reserved.
      </div>
    </footer>
  );
}

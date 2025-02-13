import { useEffect, useState } from "react";
import { object, string, number, boolean, date, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import DatePicker from "@/components/DatePicker";
import BASE_URL from "@/api/apiconfig";
import { useAuth } from "@/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useFetchDomains from "@/hooks/useFetchDomains";

const schema = object({
  first_name: string().min(3).required(),
  last_name: string().min(3).required(),
  email: string().email().required(),
  password: string().min(8).required(),
  confirm: string()
    .min(8)
    .oneOf([ref("password")], "Passwords do not match")
    .required(),
  birth_date: date().required(),
  isCraftsMan: boolean(),
  domain_id: number().when("isCraftsMan", {
    is: true,
    then: (schema) => schema.required("Domain is required"),
  }),
  phone: string()
    .when("isCraftsMan", {
      is: true,
      then: (schema) => schema.required("Phone number is required"),
    })
    .min(10),
  experience: number().when("isCraftsMan", {
    is: true,
    then: (field) => field.required("Years of experience are required"),
  }),
});

function Register() {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isCraftsMan: false,
    },
  });

  useEffect(() => {
    if (authenticated) navigate("/");
  }, [authenticated, navigate]);

  const watchIsCraftsMan = form.watch("isCraftsMan");

  const onSubmit = async (data) => {
    data.birth_date = format(data.birth_date, "yyyy-MM-dd");
    delete data.confirm;
    data.role = data.isCraftsMan ? "worker" : "user";
    if (!data.isCraftsMan) {
      delete data.phone;
      delete data.experience;
    }
    delete data.isCraftsMan;
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(res.status);

      navigate("/login");
    } catch (error) {
      form.setError("root", {
        message: "Invalid credentials",
      });
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-4 mt-40 flex flex-col space-y-4 rounded-md border border-input p-20 xl:w-[40%]"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="First name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Last name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {watchIsCraftsMan && (
            <FormField
              control={form.control}
              name="domain_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DomainComboBox {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {watchIsCraftsMan && (
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {watchIsCraftsMan && (
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Experience" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="isCraftsMan"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label>
                    <input
                      {...field}
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mr-2"
                    />
                    I im a CraftsMan
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.isSubmitting}>
            {form.isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
          <Link to="/login" className="self-center">
            <Button variant="link">Alreadey have an account?</Button>
          </Link>
          <FormMessage />
        </form>
      </Form>
    </div>
  );
}

export default Register;

const DomainComboBox = ({ onChange, ...props }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const domains = useFetchDomains();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-40 justify-between"
        >
          {value ? value : "Select domain..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search domain..." />
          <ScrollArea className="h-52">
            <CommandEmpty>No domain found.</CommandEmpty>
            <CommandGroup>
              {domains &&
                domains.map((domain) => (
                  <CommandItem
                    key={domain.id}
                    value={domain.id}
                    onSelect={() => {
                      onChange(domain.id);
                      setValue(domain.title);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === domain.title ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {domain.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

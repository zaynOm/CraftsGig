import { object, string, number, boolean, date, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

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
  phone: string()
    .when("isCraftsMan", {
      is: true,
      then: (schema) => schema.required("phone number is required"),
    })
    .min(10),
  experience: number().when("isCraftsMan", {
    is: true,
    then: (field) => field.required("Years of experience are required"),
  }),
});

function Register() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isCraftsMan: false,
    },
  });

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-40 flex w-[40%] flex-col space-y-4 rounded-md border border-input p-20"
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
  );
}

export default Register;

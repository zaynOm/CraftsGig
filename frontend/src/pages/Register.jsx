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
      // first_name: "",
      // last_name: "",
      // email: "",
      // password: "",
      // confirm: "",
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

// import { DatePicker } from "@/components/DatePicker";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Link } from "react-router-dom";

// const schema = z
//   .object({
//     first_name: z.string().min(3),
//     last_name: z.string().min(3),
//     email: z.string().email(),
//     password: z.string().min(8),
//     confirm: z.string().min(8),
//     // date: z.string(),
//     isCraftsMan: z.boolean(),
//     phone: z.string().optional(),
//     experience: z.string().optional(),
//   })
//   .refine((schema) => {
//     return !schema.isCraftsMan && (!schema.phone || !schema.experience);
//   }, "Invalid phone || experience");

// function Register() {
//   const [isCraftsMan, setIsCraftsMan] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm({ resolver: zodResolver(schema), preventSubmit: false });

//   console.log(errors);
//   const onSubmit = async (data) => {
//     console.log(data);
//   };

//   return (
//     <div className="flex h-dvh flex-col items-center">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="m-20 flex min-h-[40rem] w-[40%] flex-col gap-6 border-2 p-20"
//       >
//         <h1>Sign up</h1>
//         <div className="flex w-auto gap-6">
//           <div className="max-w-full flex-1">
//             <Input
//               {...register("first_name")}
//               type="text"
//               name="first_name"
//               placeholder="First Name"
//             />
//             {errors.first_name && (
//               <span className="text-red-500">{errors.first_name.message}</span>
//             )}
//           </div>
//           <div className="max-w-full flex-1">
//             <Input
//               {...register("last_name")}
//               type="text"
//               name="last_name"
//               placeholder="Last Name"
//             />
//             {errors.last_name && (
//               <span className="text-red-500">{errors.last_name.message}</span>
//             )}
//           </div>
//         </div>
//         <div>
//           <Input {...register("email")} type="text" placeholder="Email" />
//           {errors.email && (
//             <span className="text-red-500">{errors.email.message}</span>
//           )}
//         </div>
//         <div>
//           <Input
//             {...register("password")}
//             type="password"
//             placeholder="Password"
//           />
//           {errors.password && (
//             <span className="text-red-500">{errors.password.message}</span>
//           )}
//         </div>
//         <div>
//           <Input
//             {...register("confirm")}
//             type="password"
//             name="confirm"
//             placeholder="Verify Password"
//           />
//           {errors.confirm && (
//             <span className="text-red-500">{errors.confirm.message}</span>
//           )}
//         </div>
//         {/* <div>
//           <DatePicker {...register("date")} />
//           {errors.date && (
//             <span className="text-red-500">{errors.date.message}</span>
//           )}
//         </div> */}
//         <div>
//           {isCraftsMan && (
//             <>
//               <Input
//                 {...register("phone", { value: "" })}
//                 type="tel"
//                 placeholder="Phone"
//               />
//               {errors.phone && (
//                 <span className="text-red-500">{errors.phone.message}</span>
//               )}
//             </>
//           )}
//         </div>
//         <div>
//           {isCraftsMan && (
//             <>
//               <Input
//                 {...register("experience", { value: "" })}
//                 type="number"
//                 placeholder="Years Of Experience"
//               />
//               {errors.experience && (
//                 <span className="text-red-500">
//                   {errors.experience.message}
//                 </span>
//               )}
//             </>
//           )}
//         </div>
//         <label>
//           <input
//             {...register("isCraftsMan")}
//             type="checkbox"
//             checked={isCraftsMan}
//             onChange={() => setIsCraftsMan(!isCraftsMan)}
//             className="mr-2"
//           />
//           I'm a CraftsMan
//         </label>
//         <Button disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Sign Up"}
//         </Button>
//         <Link to="/login" className="self-center">
//           <Button variant="link">Alreadey have an account?</Button>
//         </Link>
//         {errors.root && (
//           <div className="text-red-500">{errors.root.message}</div>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Register;

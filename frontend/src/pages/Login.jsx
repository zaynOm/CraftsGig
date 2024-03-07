import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(res.status);

      const result = await res.json();
      localStorage.setItem("access_token", result.access_token);
      login();
      navigate("/");
    } catch (error) {
      setError("root", {
        message: "Invalid credentials",
      });
    }
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[30rem] w-[40%] flex-col gap-2 border-2 border-black p-32"
      >
        <h1>Login</h1>
        <Input {...register("email")} type="text" placeholder="Email" />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Login"}
        </Button>
        <Link to="/register" className="self-center">
          <Button variant="link">Create an account</Button>
        </Link>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}

export default Login;

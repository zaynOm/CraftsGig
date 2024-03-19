import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import BASE_URL from "@/api/apiconfig";
import { useEffect } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function Login() {
  const navigate = useNavigate();
  const { authenticated, login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (authenticated) navigate("/");
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(res.status);

      const result = await res.json();
      login(result.access_token);
      navigate("/");
    } catch (error) {
      setError("root", {
        message: "Invalid credentials",
      });
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[40%] flex-col gap-6 rounded-md border border-input p-32"
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

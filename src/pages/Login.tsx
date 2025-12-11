import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setCredentials } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/store";
import { useEffect } from "react";

// Mock login function for MVP (Replace with actual API call)
const loginApi = async (email: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (email === "error@example.com") {
      throw new Error("Invalid credentials");
  }
  return {
    user: {
      id: "1",
      email,
      name: "Admin User",
      role: "admin",
    },
    token: "mock-jwt-token",
  };
};

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginFormData,
    validatorAdapter: zodValidator() as any,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }: { value: LoginFormData }) => {
      try {
        const data = await loginApi(value.email);
        dispatch(setCredentials(data));
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed (Mock: try any email except error@example.com)");
      }
    },
  } as any);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-8 space-y-6"
        >
          <div>
            <form.Field
              name="email"
              children={(field: any) => (
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? "border-red-500" : ""}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]?.message || String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <form.Field
              name="password"
              children={(field: any) => (
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? "border-red-500" : ""}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]?.message || String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={form.state.isSubmitting}>
             {form.state.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

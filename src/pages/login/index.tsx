import { LoginForm } from "@/components/login-form";
import type { LoginSchema } from "@/features/auth/auth.schema";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const handleSubmit = async (data: LoginSchema) => {
    try {
      await login(data).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
      // error handled below by RTK Query
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

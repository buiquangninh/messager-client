"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

export const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const { signUp, signIn } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);

    const { firstName, lastName, username, email, password } = data;

    if (variant === "REGISTER") {
      signUp(firstName, lastName, username, email, password).finally(() =>
        setIsLoading(false)
      );
    } else if (variant === "LOGIN") {
      signIn(username, password).finally(() => {
        setIsLoading(false);
        router.push("/users");
      });
    }
  };

  const socialAction = (action: string) => {
    console.log(`Social action: ${action}`);
  };

  const toggleVariant = () => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }

    reset();
    clearErrors();
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <>
              <div className="flex gap-2">
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id="firstName"
                  label="First Name"
                  type="text"
                />
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  id="lastName"
                  label="Last Name"
                  type="text"
                />
              </div>
            </>
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="username"
            label="Username"
            type="text"
          />
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email"
              label="Email"
              type="text"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

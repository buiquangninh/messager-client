"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = "text",
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={clsx(
          `block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900`,
          required && "after:content-['*'] after:ml-0.5 after:text-rose-500"
        )}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, {
            required: `${label} is required`,
            ...(id === "email" && {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            }),
          })}
          className={clsx(
            `
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            px-2
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus-visible:outline-none
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6`,
            errors[id] && "ring-rose-500 ",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
      {errors[id] && (
        <p className="mt-1 text-xs text-rose-500">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;

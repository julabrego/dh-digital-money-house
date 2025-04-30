import React from "react";
import { Controller, useFormContext } from "react-hook-form";


const TextInput = ({ name, defaultValue, ...props }: TextInputProps) => {
  const { control, formState: {errors} } = useFormContext();
  return (
    <Controller
      name={name}
      rules={{ required: true }}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <input
          {...field}
          placeholder="Nombre*"
          type="text"
          {...(errors[name] && {
            className: "border-error border-2",
          })}
          {...props}
          value={field.value || ""}
        />
      )}
    />
  );
};

type TextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  defaultValue?: string;
};

export default TextInput;


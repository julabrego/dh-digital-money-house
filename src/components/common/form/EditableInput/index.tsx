import { yupResolver } from "@hookform/resolvers/yup";
import { RefObject, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AnyObjectSchema } from "yup";
import TextInput from "../../TextInput";
import Typography from "../../Typography";

type EditableInputProps = {
  fieldName: string;
  label: string;
  value: string;
  secret?: boolean;
  onSubmit: () => Promise<unknown>;
  onBlur: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  className?: string;
  validationSchema?: AnyObjectSchema;
};

export const EditableInput = ({
  fieldName,
  label,
  value,
  secret,
  onBlur,
  onSubmit,
  inputRef,
  className,
  validationSchema,
}: EditableInputProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: {
      [fieldName]: value,
    },
  });

  const {
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!inputRef) return;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    setValue(fieldName, secret ? "" : value);
  }, [fieldName, methods, secret, setValue, value]);

  const handleComponentSubmit = async () => {
    setServerError(null);

    try {
      const isValid = await methods.trigger();
      if (!isValid) return;

      setIsLoading(true);
      await methods.handleSubmit(onSubmit)();
      onBlur();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className="filters">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput
            value={getValues(fieldName) ?? ""}
            ref={inputRef}
            placeholder={label}
            name={fieldName}
            onBlur={onBlur}
            disabled={isLoading}
            {...(secret && { type: "password" })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleComponentSubmit();
              } else if (e.key === "Escape") {
                onBlur();
              }
            }}
            className={className}
          />
        </form>
        {serverError ? (
          <Typography type="error">{serverError}</Typography>
        ) : (
          errors[fieldName] && (
            <Typography type="error">{errors[fieldName].message?.toString()}</Typography>
          )
        )}
      </section>
    </FormProvider>
  );
};

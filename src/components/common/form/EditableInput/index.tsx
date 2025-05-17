import { RefObject, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../TextInput";

type EditableInputProps = {
  fieldName: string;
  label: string;
  value: string;
  secret?: boolean;
  onSubmit: () => Promise<unknown>;
  onBlur: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  className?: string;
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
}: EditableInputProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm({});
  const { setValue, getValues } = methods;

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
    setError(null);

    try {
      setIsLoading(true);
      await methods.handleSubmit(onSubmit)();
      onBlur();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocurrió un error inesperado");
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
        {error && <p className="text-red-500">{error}</p>}
      </section>
    </FormProvider>
  );
};

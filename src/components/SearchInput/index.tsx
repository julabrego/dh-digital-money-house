"use client";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../common/TextInput";

const SearchInput = () => {
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <section className="filters">
        <TextInput placeholder="Buscar" name={"search"} />
      </section>
    </FormProvider>
  );
};

export default SearchInput;

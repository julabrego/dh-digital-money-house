"use client";

import TextInput from "@/components/common/TextInput";
import { useHeadersContext } from "@/contexts/headers.context";
import authService from "@/services/auth/auth.service";
import userApi from "@/services/user/user.api";
import { User } from "@/types/user.types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

// type ProfileDataProps = {
//   userData: User;
// };

const ProfileData = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { userId, token, accountId } = useHeadersContext();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData =
        userId && token && accountId
          ? await userApi.getUser(userId, token)
          : null;
      setUserData(userData);
    };
    fetchUserData();
  }, []);

  if (!userData) return <>Loading...</>;

  return (
    <article className="flex flex-col">
      <ProfileRow
        label="Email"
        fieldName="email"
        value={userData?.email}
        setUserData={setUserData}
      />
      <ProfileRow
        label="Nombre"
        fieldName="firstname"
        value={userData?.firstname}
        setUserData={setUserData}
      />
      <ProfileRow
        label="Apellido"
        fieldName="lastname"
        value={userData?.lastname}
        setUserData={setUserData}
      />
      <ProfileRow
        label="Teléfono"
        fieldName="phone"
        value={userData?.phone}
        setUserData={setUserData}
      />
      <ProfileRow
        label="Contraseña"
        fieldName="password"
        value={"******"}
        setUserData={setUserData}
        secret
      />
    </article>
  );
};

type ProfileRowProps = {
  label: string;
  fieldName: string;
  value: string;
  secret?: boolean;
  setUserData: Dispatch<SetStateAction<User | null>>;
};

const ProfileRow = ({
  label,
  fieldName,
  value,
  setUserData,
  secret,
}: ProfileRowProps) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="profile-data flex flex-row justify-between py-[8px] border-b-1 border-b-gray-400">
      <div className="flex flex-col md:flex-row w-full">
        <p className="text-[16px] md:min-w-[200px]">{label}</p>
        {editMode ? (
          <EditableInput
            fieldName={fieldName}
            value={value}
            onBlur={() => setEditMode(false)}
            label={label}
            setUserData={setUserData}
            secret={secret}
          />
        ) : (
          <p className="text-[16px] opacity-50">{value}</p>
        )}
      </div>
      {!editMode && (
        <p className="cursor-pointer" onClick={() => setEditMode(true)}>
          <Image
            src={"/images/edit.png"}
            alt={"edit"}
            width={22}
            height={22}
            className="w-[22px] h-[22px]"
          />
        </p>
      )}
    </div>
  );
};

type EditableInputProps = ProfileRowProps & {
  onBlur: () => void;
};

const EditableInput = ({
  fieldName,
  label,
  value,
  secret,
  onBlur,
  setUserData,
}: EditableInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId, token } = useHeadersContext();
  const methods = useForm({});

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    methods.setValue(fieldName, secret ? "" : value);
  }, [fieldName, methods, secret, value]);

  const onSubmit = async () => {
    setError(null);

    try {
      setIsLoading(true);

      const updatedUserData = await authService.update(
        userId!,
        {
          [fieldName]: inputRef.current?.value,
        },
        token!
      );

      setUserData(updatedUserData);
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
            value={methods.getValues(fieldName) ?? ""}
            ref={inputRef}
            placeholder={label}
            name={fieldName}
            onBlur={onBlur}
            disabled={isLoading}
            {...(secret && { type: "password" })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                methods.handleSubmit(onSubmit)();
              } else if (e.key === "Escape") {
                onBlur();
              }
            }}
          />
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </section>
    </FormProvider>
  );
};

export default ProfileData;

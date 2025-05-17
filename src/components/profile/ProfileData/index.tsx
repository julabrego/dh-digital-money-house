"use client";

import { EditableInput } from "@/components/common/form/EditableInput";
import { useHeadersContext } from "@/contexts/headers.context";
import RegisterSchema from "@/schemas/register.schema";
import authService from "@/services/auth/auth.service";
import userApi from "@/services/user/user.api";
import { User } from "@/types/user.types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

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
  }, [accountId, token, userId]);

  if (!userData) return <>Loading...</>;

  return (
    <article className="flex flex-col">
      <ProfileRow
        label="Email"
        fieldName="email"
        value={userData?.email}
        setUserData={setUserData}
        readOnly
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
  fieldName: keyof User;
  value: string;
  secret?: boolean;
  setUserData: Dispatch<SetStateAction<User | null>>;
  readOnly?: boolean;
};

const ProfileRow = ({
  label,
  fieldName,
  value,
  setUserData,
  secret,
  readOnly,
}: ProfileRowProps) => {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { token, userId } = useHeadersContext();

  const handleSubmit = async () => {
    return await authService
      .update(
        userId!,
        {
          [fieldName]: inputRef.current?.value,
        },
        token!
      )
      .then((updatedUserData) => {
        setUserData(updatedUserData);
      });
  };

  return (
    <div className="profile-data flex flex-row justify-between py-[8px] border-b-1 border-b-gray-400">
      <div className="flex flex-col md:flex-row w-full">
        <p className="text-[16px] md:min-w-[200px]">{label}</p>
        {editMode ? (
          <EditableInput
            inputRef={inputRef}
            fieldName={fieldName}
            value={value}
            onBlur={() => setEditMode(false)}
            label={label}
            onSubmit={handleSubmit}
            secret={secret}
            validationSchema={RegisterSchema.pick([fieldName])}
          />
        ) : (
          <p className="text-[16px] opacity-50">{value}</p>
        )}
      </div>
      {!editMode && !readOnly && (
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

export default ProfileData;

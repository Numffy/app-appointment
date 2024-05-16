"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [ErrorCC, setErrorCC] = useState(null);
  const [ErrorEmail, setErrorEmail] = useState(null);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      delete data.confirm_password;
      const user = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(user.status);
      if (user.status === 201) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.data.detail.target === "PRIMARY")
        setErrorCC(error.response);

      if (error.response.data.detail.target === "User_email_key")
        setErrorEmail(error.response);
    }
  });

  return (
    <div className="h-[calc(100vh-1rem)] flex justify-center items-center ">
      <form onSubmit={onSubmit} className="w-1/4 bg-slate-400 p-10 rounded-3xl">
        {ErrorEmail && (
          <span className="bg-red-500 p-2 block mb-4 rounded-md font-bold">
            Este Email ya se encuentra en uso
          </span>
        )}
        {ErrorCC && (
          <span className="bg-red-500 p-2 block mb-4 rounded-md font-bold">
            Este documento ya se encuentra en uso
          </span>
        )}
        <h1 className="text-4xl font-bold text-slate-200 mb-4">Registrarse</h1>
        <label
          htmlFor="cc"
          className="text-slate-500 text-sm font-bold mb-2 block"
        >
          Numero de Documento
        </label>
        <input
          type="cc"
          {...register("cc", {
            required: {
              value: true,
              message: "El numero de documento es requerido",
            },
          })}
          className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.cc && (
          <span className="text-red-500 text-sm  block  font-bold">
            {errors.cc.message}
          </span>
        )}
        <label
          htmlFor="name"
          className="text-slate-500 text-sm font-bold mb-2 block"
        >
          nombres
        </label>
        <input
          type="name"
          {...register("name", {
            required: {
              value: true,
              message: "El nombre es requerido",
            },
          })}
          className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
        />
        {errors.name && (
          <span className="text-sm text-red-500 font-bold block ">
            {errors.name.message}
          </span>
        )}

        <label
          htmlFor="last_name"
          className="text-slate-500 text-sm font-bold mb-2 block"
        >
          Apellidos
        </label>
        <input
          type="last_name"
          {...register("last_name", {
            required: {
              value: true,
              message: "El Apellido es requerido",
            },
          })}
          className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
        />
        {errors.last_name && (
          <span className="text-sm text-red-500 font-bold block ">
            {errors.last_name.message}
          </span>
        )}

        <label
          htmlFor="email"
          className="text-slate-500 text-sm font-bold mb-2 block"
        >
          Correo Electronico
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "El Correo es requerido",
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$/,
              message: "Correo no valido",
            },
          })}
          className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-sm text-red-500 font-bold block ">
            {errors.email.message}
          </span>
        )}

        <label
          htmlFor="password"
          className="text-slate-500 text-sm font-bold mb-2 block"
        >
          Contraseña
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es requerida",
            },
          })}
          className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-sm text-red-500 font-bold block ">
            {errors.password.message}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 text-sm font-bold mb-2 block"
        >
          Confirmar Contraseña
        </label>
        <input
          type="password"
          {...register("confirm_password", {
            required: {
              value: true,
              message: "Confirma la contraseña es requerido",
            },
            validate: (value) => {
              if (value === watch("password")) {
                return true;
              }

              return "La contraseña no coinciden";
            },
          })}
          className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
        />
        {errors.confirm_password && (
          <span className="text-sm text-red-500 font-bold block ">
            {errors.confirm_password.message}
          </span>
        )}

        <button className="bg-amber-300 w-full p-2 rounded-lg text-slate-300 font-bold mt-2">
          Registrarme
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;

"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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

      if (error.response.data.error === "the cc field is expected to be unique")
        setErrorEmail(error.response);
    }
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-10 rounded-3xl bg-gray-800"
      >
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
        <h1 className="text-4xl font-bold text-white mb-5 text-center">
          Registrarse
        </h1>

        <div>
          <label
            htmlFor="cc"
            className="text-white text-sm font-bold mb-2 block"
          >
            Numero de Documento
          </label>
          <input
            type="text"
            {...register("cc", {
              required: {
                value: true,
                message: "El numero de documento es requerido",
              },
              minLength: {
                value: 7,
                message: "Minimo 7 caracteres en el documento",
              },
            })}
            className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.cc && (
            <span className="text-red-500 text-sm block font-bold">
              {errors.cc.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="text-white text-sm font-bold mb-2 block"
          >
            Nombres
          </label>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
            })}
            className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
          />
          {errors.name && (
            <span className="text-sm text-red-500 font-bold block">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="text-white text-sm font-bold mb-2 block"
          >
            Apellidos
          </label>
          <input
            type="text"
            {...register("last_name", {
              required: {
                value: true,
                message: "El Apellido es requerido",
              },
            })}
            className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
          />
          {errors.last_name && (
            <span className="text-sm text-red-500 font-bold block">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-white text-sm font-bold mb-2 block"
          >
            Correo Electrónico
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
                message: "Correo no válido",
              },
            })}
            className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
          />
          {errors.email && (
            <span className="text-sm text-red-500 font-bold block">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-white text-sm font-bold mb-2 block"
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
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
            className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
          />
          {errors.password && (
            <span className="text-sm text-red-500 font-bold block">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm_password"
            className="text-white text-sm font-bold mb-2 block"
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
                return "Las contraseñas no coinciden";
              },
            })}
            className="p-2 rounded block bg-slate-900 mb-2 text-slate-300 w-full"
          />
          {errors.confirm_password && (
            <span className="text-sm text-red-500 font-bold block">
              {errors.confirm_password.message}
            </span>
          )}
        </div>

        <div>
          <button className="bg-amber-300 w-full p-2 rounded-lg text-slate-900  mt-2">
            Registrarme
          </button>
          <div className="mt-2">
            <p className="text-white">
              Ya tienes una cuenta?
              <Link className="text-blue-400 ml-2" href="/auth/login">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;

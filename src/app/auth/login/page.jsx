"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const nextAuthResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (nextAuthResponse.ok) {
      router.push("/dashboard");
      router.refresh();
    }

    if (nextAuthResponse.error) {
      setError(nextAuthResponse.error);
    }
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="w-full max-w-md p-10 rounded-3xl bg-gray-800"
        onSubmit={onSubmit}
      >
        {error && (
          <span className="bg-red-500 p-2 block mb-4 rounded-md font-bold">
            Usuario o Contraseña Incorrecto
          </span>
        )}
        <h1 className="text-4xl font-bold mb-4 text-center text-white">
          Iniciar Sesión
        </h1>

        <div>
          <label
            className="font-bold text-white mb-2 block text-sm"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="p-2 rounded mb-2 bg-slate-900 text-slate-300 w-full"
            id="email"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "El Correo es requerido",
              },
            })}
          />
          {errors.email && (
            <span className="text-sm block text-red-500 font-bold">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="font-bold text-white mb-2 block text-sm"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="p-2 bg-slate-900 text-slate-300 mb-2 rounded w-full"
            id="password"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es requerida",
              },
            })}
          />
          {errors.password && (
            <span className="block text-red-500 text-sm font-bold">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <button className="p-2 mb-2 w-full bg-amber-300 rounded-lg mt-2">
            Login
          </button>
        </div>
        <div>
          <p className="text-white">
            No tienes una cuenta?{" "}
            <Link className="text-blue-400" href="/auth/register">
              Registrarse
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

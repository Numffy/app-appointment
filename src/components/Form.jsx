import React from "react";
import { useForm } from "react-hook-form";

function Form() {
  const { register, watch } = useForm();
  return (
    <div className="h-[calc(100vh-0rem)] flex justify-center items-center">
      <form className="w-1/4 bg-slate-400 p-10 rounded-3xl">
        <label className="font-bold text-slate-500 mb-2 block text-sm" htmlFor="document_type">
          Tipo de documento
        </label>
        <select
          className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          {...register("document_type", {
            required: {
              value: true,
              message: "Campo requerido",
            },
          })}
          name="document_type"
        >
          <option value="cc">CEDULA DE CIUDADANIA</option>
          <option value="te">TAREJETA DE IDENTIDAD</option>
          <option value="rc">REGISTRO CIVIL</option>
          <option value="cn">CERIFICADO NACIDO VIVO</option>
          <option value="ce">CEDULA DE EXTRANJERIA</option>
          <option value="ps">PASAPORTE</option>
        </select>

        <label className="font-bold text-slate-500 mb-2 block text-sm" htmlFor="cc">Numero de Documento</label>
        <input
          className="p-2 rounded  mb-2 bg-slate-900 text-slate-300 w-full"
          {...register("cc", {
            required: {
              value: true,
              message: "Campo requerido",
            },
            maxLength: {
              value: 15,
              message: "Maximo 15 caracteres",
            },
            minLength: {
              value: 5,
              message: "Minimo 5 caracteres",
            },
          })}
        />

        <label className="font-bold text-slate-500 mb-2 block text-sm" htmlFor="name">Nombre</label>
        <input
          className="p-2 rounded  mb-2 bg-slate-900 text-slate-300 w-full "
          {...register("name", {
            required: {
              value: true,
              message: "Campo requerido",
            },
            maxLength: {
              value: 50,
              message: "Maximo 50 caracteres",
            },
            minLength: {
              value: 3,
              message: "Minimo 3 caracteres",
            },
          })}
        />

        <label className="font-bold text-slate-500 mb-2 block text-sm" htmlFor="last_name">Apellido</label>
        <input
          className="p-2 rounded  mb-2 bg-slate-900 text-slate-300 w-full"
          {...register("last_name", {
            required: {
              value: true,
              message: "Campo requerido",
            },
            maxLength: {
              value: 50,
              message: "Maximo 50 caracteres",
            },
            minLength: {
              value: 3,
              message: "Minimo 3 caracteres",
            },
          })}
        />

        <label className="font-bold text-slate-500 mb-2 block text-sm" htmlFor="email">Correo</label>
        <input
          className="p-2 rounded mb-2 bg-slate-900 text-slate-300 w-full "
          {...register("email", {
            required: {
              value: true,
              message: "Campo requerido",
            },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Correo invalido",
            },
          })}
        />
      </form>
    </div>
  );
}

export default Form;

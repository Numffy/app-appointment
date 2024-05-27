"use client";

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

function Form() {
  const [RegistroExitoso, setRegistroExitoso] = useState(false);
  const session = useSession();
  const token = session.data?.user?.token;
  const [cedula, setCedula] = useState(null);
  const [errorCC, setErrorCC] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const appointment = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointment`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (appointment.status === 201) {
        setRegistroExitoso(true);
        setCedula(data.cc);
      }
    } catch (error) {
      setErrorCC(error.response.data.error);
    }
  });

  const getPdf = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointment/generate/pdf/${cedula}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "appointment.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to fetch PDF:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while generating the PDF:", error);
    }
  };

  return (
    <div className="flex justify-center mt-4 items-center px-4 sm:px-6 lg:px-8">
      {RegistroExitoso ? (
        <div className="w-full max-w-md p-4 sm:p-6 rounded-3xl bg-white shadow-md mt-6">
          <h1 className="text-2xl sm:text-3xl mb-4 font-bold text-center text-green-500">
            ¡Cita Agendada!
          </h1>
          <p className="text-center text-md sm:text-lg">
            Tu cita ha sido agendada exitosamente. Te esperamos en la fecha y
            hora seleccionada.
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={getPdf}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Generar PDF
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => window.location.reload()}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Ir al Dashboard
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md p-4 sm:p-6 rounded-3xl bg-white shadow-md mt-6"
        >
          <h1 className="text-2xl sm:text-3xl mb-4 font-bold text-center">
            Agenda tu cita
          </h1>
          <div>
            {errorCC && (
              <span className="bg-red-500 p-2 block mb-4 rounded-md font-bold text-sm">
                El número de documento no coincide
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="typeOfConsultId"
            >
              Tipo de Consulta
            </label>
            <select
              className="p-1 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
              {...register("typeOfConsultId", { required: "Campo requerido" })}
              name="typeOfConsultId"
            >
              <option value="1">CONSULTA GENERAL</option>
              <option value="2">HIGIENE DENTAL</option>
              <option value="3">ODONTOLOGÍA PREVENTIVA</option>
              <option value="4">ODONTOLOGÍA RESTAURATIVA</option>
              <option value="5">ENDODONCIA</option>
              <option value="6">PERIODONCIA</option>
              <option value="7">ORTODONCIA</option>
              <option value="8">ODONTOPEDIATRÍA</option>
              <option value="9">CIRUGÍA ORAL</option>
              <option value="10">ODONTOLOGÍA ESTÉTICA</option>
              <option value="11">PROSTODONCIA</option>
              <option value="12">IMPLANTES DENTALES</option>
              <option value="13">URGENCIAS DENTALES</option>
              <option value="14">RADIOGRAFÍAS DENTALES</option>
              <option value="15">CONSULTA DE SEGUIMIENTO</option>
            </select>
            {errors.typeOfConsultId && (
              <span className="text-red-500 font-bold text-sm">
                {errors.typeOfConsultId.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="identification_type"
            >
              Tipo de documento
            </label>
            <select
              className="p-1 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
              {...register("identification_type", {
                required: "Campo requerido",
              })}
              name="identification_type"
            >
              <option value="CC">CÉDULA DE CIUDADANÍA</option>
              <option value="TE">TARJETA DE IDENTIDAD</option>
              <option value="RC">REGISTRO CIVIL</option>
              <option value="CN">CERTIFICADO NACIDO VIVO</option>
              <option value="CE">CÉDULA DE EXTRANJERÍA</option>
              <option value="PS">PASAPORTE</option>
            </select>
            {errors.identification_type && (
              <span className="text-red-500 font-bold text-sm">
                {errors.identification_type.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="cc"
            >
              Número de Documento
            </label>
            <input
              className="p-1 rounded mb-2 bg-slate-900 text-slate-300 w-full"
              {...register("cc", {
                required: "Este campo es requerido",
                maxLength: { value: 15, message: "Máximo 15 caracteres" },
                minLength: { value: 5, message: "Mínimo 5 caracteres" },
              })}
            />
            {errors.cc && (
              <span className="text-sm font-bold text-red-500 mb-2">
                {errors.cc.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              className="p-1 rounded mb-2 bg-slate-900 text-slate-300 w-full"
              {...register("name", {
                required: "Este campo es requerido",
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              })}
            />
            {errors.name && (
              <span className="text-sm font-bold text-red-500 mb-2">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="last_name"
            >
              Apellido
            </label>
            <input
              className="p-1 rounded mb-2 bg-slate-900 text-slate-300 w-full"
              {...register("last_name", {
                required: "Este campo es requerido",
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              })}
            />
            {errors.last_name && (
              <span className="text-sm font-bold text-red-500 mb-2">
                {errors.last_name.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              className="p-1 rounded mb-2 bg-slate-900 text-slate-300 w-full"
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Correo inválido",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm font-bold text-red-500 mb-2">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="phone"
            >
              Número de teléfono
            </label>
            <input
              className="p-1 rounded mb-2 bg-slate-900 text-slate-300 w-full"
              {...register("phone", {
                required: "Este campo es requerido",
                maxLength: { value: 12, message: "Máximo 12 caracteres" },
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
              })}
            />
            {errors.phone && (
              <span className="text-sm font-bold text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="date"
            >
              Fecha
            </label>
            <input
              className="p-1 rounded mb-2 bg-slate-900 text-slate-300 w-full"
              type="date"
              {...register("date", { required: "Este campo es requerido" })}
            />
            {errors.date && (
              <span className="text-sm font-bold text-red-500">
                {errors.date.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="font-bold text-slate-500 mb-1 block text-sm"
              htmlFor="hourId"
            >
              Hora
            </label>
            <select
              className="p-1 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
              {...register("hourId", { required: "Este campo es requerido" })}
              name="hourId"
            >
              <option value="020a1cd0-d9f1-42ba-b2a3-bfb261db7e35">
                7:00AM
              </option>
              <option value="4bb9b964-6402-49b8-b2fb-e10e7da04482">
                8:00AM
              </option>
              <option value="4bb9b961-6402-49b8-b2fb-e10e7da04482">
                9:00AM
              </option>
              <option value="10:00am">10:00AM</option>
              <option value="11:00am">11:00AM</option>
              <option value="12:00am">12:00PM</option>
              <option value="2:00pm">2:00PM</option>
              <option value="3:00pm">3:00PM</option>
              <option value="4:00pm">4:00PM</option>
              <option value="3:00pm">5:00PM</option>
            </select>
            {errors.hourId && (
              <span className="text-sm font-bold text-red-500">
                {errors.hourId.message}
              </span>
            )}
          </div>

          <div className="flex justify-center font-bold mb-2 w-full bg-amber-300 rounded-lg mt-2">
            <button className="p-2">Agendar Cita</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;

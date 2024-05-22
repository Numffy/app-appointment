import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

function Form() {
  const session = useSession();

  const token = session.data?.user?.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
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
      console.log(appointment);
    } catch (errror) {
      console.log(error.response)
    }
  });
  return (
    <div className="h-[calc(100vh-0rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4  p-10 rounded-3xl">
        <h1 className="text-5xl mb-7 font-bold">Agenda tu cita</h1>

        <div>
          <label
            className="font-bold text-slate-500 mb-2 block text-sm"
            htmlFor="typeOfConsultId"
          >
            Tipo de Consulta
          </label>
          <select
            className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            {...register("typeOfConsultId", {
              required: {
                value: true,
                message: "Campo requerido",
              },
            })}
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
            className="font-bold text-slate-500 mb-2 block text-sm"
            htmlFor="identification_type"
          >
            Tipo de documento
          </label>
          <select
            className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            {...register("identification_type", {
              required: {
                value: true,
                message: "Campo requerido",
              },
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
            className="font-bold text-slate-500 mb-2 block text-sm"
            htmlFor="cc"
          >
            Numero de Documento
          </label>
          <input
            className="p-2 rounded  mb-2 bg-slate-900 text-slate-300 w-full"
            {...register("cc", {
              required: {
                value: true,
                message: "Este campo es requerido",
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
          {errors.cc && (
            <span className="text-sm font-bold text-red-500 mb-2">
              {errors.cc.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="font-bold text-slate-500 mb-2 block text-sm"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="p-2 rounded  mb-2 bg-slate-900 text-slate-300 w-full "
            {...register("name", {
              required: {
                value: true,
                message: "Este campo es requerido",
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
          {errors.name && (
            <span className="text-sm font-bold text-red-500 mb-2">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="font-bold text-slate-500 mb-2 block text-sm"
            htmlFor="last_name"
          >
            Apellido
          </label>
          <input
            className="p-2 rounded  mb-2 bg-slate-900 text-slate-300 w-full"
            {...register("last_name", {
              required: {
                value: true,
                message: "Este campo es requerido",
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
          {errors.last_name && (
            <span className="text-sm font-bold text-red-500 mb-2">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="font-bold text-slate-500 mb-2 block text-sm"
            htmlFor="email"
          >
            Correo
          </label>
          <input
            className="p-2 rounded mb-2 bg-slate-900 text-slate-300 w-full "
            {...register("email", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Correo invalido",
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
            className="font-bold text-slate-500 mb-2 block text-sm"
            htmlFor="phone"
          >
            Numero de telefono
          </label>
          <input
            className="p-2 rounded  mb-2 bg-slate-900 text-slate-300 w-full"
            {...register("phone", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              maxLength: {
                value: 12,
                message: "Maximo 12 caracteres",
              },
              minLength: {
                value: 10,
                message: "Minimo 10 caracteres",
              },
            })}
          />
          {errors.phone && (
            <span className="text-sm font-bold text-red-500">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="date">Fecha</label>
          <input
            {...register("date", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
            className="p-2 rounded  mb-2 bg-slate-900 text-slate-300 w-full"
            type="date"
          />
          {errors.date && (
            <span className="text-sm font-bold text-red-500">
              {errors.date.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="font-bold text-slate-500 mb-2 block text-sm"
            htmlFor="document_type"
          >
            Hora
          </label>
          <select
            className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            {...register("hourId", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
            name="hourId"
          >
            <option value="020a1cd0-d9f1-42ba-b2a3-bfb261db7e35">7:00AM</option>
            <option value="4bb9b964-6402-49b8-b2fb-e10e7da04482">8:00AM</option>
            <option value="4bb9b961-6402-49b8-b2fb-e10e7da04482">9:00AM</option>
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

        <div className="p-2 flex justify-center font-bold mb-2 w-full bg-amber-300 rounded-lg mt-2">
          <button>Agendar Cita</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

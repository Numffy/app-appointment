import React from "react";
import { useForm } from "react-hook-form";

function Form() {
  const { register, watch } = useForm();
  console.log(watch("document_type"));
  return (
    <div>
      <form className="flex justify-center gap-6 items-center h-screen">
        <label className="" htmlFor="document_type">
          Tipo de documento
        </label>
        <select {...register("document_type")} name="document_type">
          <option value="cc">CEDULA DE CIUDADANIA</option>
          <option value="te">TAREJETA DE IDENTIDAD</option>
          <option value="rc">REGISTRO CIVIL</option>
          <option value="cn">CERIFICADO NACIDO VIVO</option>
          <option value="ce">CEDULA DE EXTRANJERIA</option>
          <option value="ps">PASAPORTE</option>
        </select>
        
        <label htmlFor="cc">Numero de Documento</label>
        <input type="text" />
      </form>
    </div>
  );
}

export default Form;

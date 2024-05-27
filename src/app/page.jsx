import React from "react";
import Link from "next/link";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Bienvenido a nuestro consultorio
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            En nuestro consultorio odontológico, nos preocupamos por la salud
            bucal de nuestros pacientes. Ofrecemos una amplia gama de servicios,
            desde limpiezas dentales regulares hasta tratamientos de ortodoncia
            avanzados, todo ello realizado por profesionales cualificados y con
            la última tecnología disponible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Limpiezas Dentales"
              description="Nuestros higienistas dentales expertos pueden ayudarte a
                mantener tu sonrisa brillante y saludable con limpiezas dentales
                profesionales regulares."
            />
            <ServiceCard
              title="Ortodoncia"
              description="¿Deseas una sonrisa perfectamente alineada? Nuestros
                ortodoncistas pueden diseñar un plan de tratamiento
                personalizado para corregir tus dientes y mejorar tu salud oral."
            />
            <ServiceCard
              title="Implantes Dentales"
              description="Si te falta un diente o más, los implantes dentales pueden
                ser una solución permanente para restaurar tu sonrisa y tu
                confianza."
            />

            <ServiceCard
              title="Blanqueamiento Dental"
              description="¿Quieres una sonrisa más blanca y brillante? Nuestros
                tratamientos de blanqueamiento dental pueden ayudarte a
                conseguir una sonrisa más radiante en poco tiempo."
            />
            <ServiceCard
              title="Consulta General"
              description="Si tienes alguna duda sobre tu salud bucal, no dudes en
                contactar con nosotros. Nuestros dentistas generales pueden
                responder a tus preguntas y ofrecerte la mejor atención
                posible."
            />
            <ServiceCard
              title="periodoncia"
              description="La periodoncia es la especialidad de la odontología que se
                encarga de prevenir, diagnosticar y tratar las enfermedades
                periodontales, como la gingivitis y la periodontitis."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function ServiceCard({ title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <Link href="/auth/login">
        <button className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Agendar
        </button>
      </Link>
    </div>
  );
}

export default HomePage;

import React from "react";

const Footer = () => (
  <footer className="bg-gray-300 py-4">
    <div className="container mx-auto text-center text-gray-700">
      <p>
        © {new Date().getFullYear()} Consultorio Odontológico - Todos los
        derechos reservados
      </p>
    </div>
  </footer>
);

export default Footer;

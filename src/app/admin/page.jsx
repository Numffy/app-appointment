"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchAppointments();
    } else if (status === "unauthenticated") {
      setLoading(false);
      setError(new Error("User is not authenticated or token is missing"));
    }
  }, [status]);

  const fetchAppointments = async () => {
    const token = session?.user?.token;

    if (!token) {
      setLoading(false);
      setError(new Error("User token is missing"));
      return;
    }

    try {
      console.log("session token", token);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointment`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err);
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    const token = session?.user?.token;

    if (!token) {
      console.error("User token is missing");
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading appointments: {error.message}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Gestionar Citas</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Tipo de consulta</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Hora</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">{appointment.id}</td>
              <td className="py-2 px-4 border-b">{appointment.name}</td>
              <td className="py-2 px-4 border-b">
                {appointment.typeOfConsultId}
              </td>
              <td className="py-2 px-4 border-b">{appointment.date}</td>
              <td className="py-2 px-4 border-b">{appointment.hourId}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteAppointment(appointment.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAppointments;

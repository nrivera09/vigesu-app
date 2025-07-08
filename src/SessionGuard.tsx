"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { getCookie } from "cookies-next";

const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutos

export default function SessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, user, logout } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  // 👀 1. Verifica actividad del cursor
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        logout();
        setShowModal(true);
      }, INACTIVITY_LIMIT);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [logout]);

  // ✅ 2. Suscripción al store de Zustand
  useEffect(() => {
    const unsub = useAuthStore.subscribe((state) => {
      if (!state.token || !state.user) {
        setShowModal(true);
      }
    });
    return () => unsub();
  }, []);

  // ✅ 3. Verificación periódica cookies + localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getCookie("auth-token");
      const storage = localStorage.getItem("auth-storage");
      if (!token || !storage) {
        logout();
        setShowModal(true);
      }
    }, 5000); // cada 5 segundos

    return () => clearInterval(interval);
  }, [logout]);

  const handleLoginRedirect = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <>
      {children}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
          <div className="bg-white p-8 rounded-md shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Sesión finalizada</h2>
            <p className="mb-6 text-gray-600">
              Por inactividad o pérdida de sesión, debes iniciar nuevamente.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="btn btn-neutral w-full"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      )}
    </>
  );
}

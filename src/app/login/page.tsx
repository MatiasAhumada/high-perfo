"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import { Mail01Icon, LockPasswordIcon } from "hugeicons-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage("Credenciales inválidas");
      setIsLoading(false);
    } else {
      window.location.href = ROUTES.HOME;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(248,23,26,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(194,198,215,0.03)_0%,_transparent_50%)]" />

      <div className="absolute top-20 right-20 w-72 h-72 bg-on-tertiary-container/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h1 className="font-display font-bold text-5xl sm:text-6xl text-on-surface tracking-tight uppercase mb-3">
              High Perfo
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-outline-variant" />
              <p className="text-on-surface-variant text-sm font-body px-2">
                {UI_TEXTS.BRAND_TAGLINE}
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-outline-variant" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-surface-container/80 backdrop-blur-sm border border-outline-variant/40 rounded-lg p-8 shadow-2xl shadow-black/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-label-caps text-on-surface-variant font-display flex items-center gap-2"
              >
                <Mail01Icon size={14} />
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-surface-container-low border border-outline-variant text-on-surface font-body text-base py-3 px-4 rounded focus:outline-none focus:border-on-tertiary-container focus:ring-2 focus:ring-on-tertiary-container/20 transition-all placeholder:text-on-surface-variant/40"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-label-caps text-on-surface-variant font-display flex items-center gap-2"
              >
                <LockPasswordIcon size={14} />
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-surface-container-low border border-outline-variant text-on-surface font-body text-base py-3 px-4 rounded focus:outline-none focus:border-on-tertiary-container focus:ring-2 focus:ring-on-tertiary-container/20 transition-all placeholder:text-on-surface-variant/40"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-error-container/20 border border-error/30 rounded px-4 py-3"
              >
                <p className="text-sm text-error font-body">{errorMessage}</p>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-on-tertiary-container hover:bg-on-tertiary-container/90 text-on-surface font-display font-bold text-sm uppercase tracking-wider py-6 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-on-tertiary-container/30 hover:shadow-xl hover:shadow-on-tertiary-container/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-on-surface border-t-transparent rounded-full animate-spin" />
                  {UI_TEXTS.ACTIONS.PROCESSING}
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-on-surface-variant/60 text-xs font-body">
            Acceso exclusivo para entrenadores certificados
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

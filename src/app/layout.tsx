import type { Metadata } from "next"
import { Space_Grotesk, Manrope } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/components/providers/auth-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "High-Perfo | Inteligencia Deportiva de Alto Nivel",
  description: "Motor operativo de prescripción de carga y análisis biomecánico para instituciones deportivas de élite",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={cn("h-full dark", spaceGrotesk.variable, manrope.variable, "font-sans")}
      suppressHydrationWarning
    >
    <body className="min-h-screen bg-surface text-on-surface antialiased">
      <AuthProvider>{children}</AuthProvider>
      <Toaster richColors position="bottom-right" />
    </body>
    </html>
  )
}

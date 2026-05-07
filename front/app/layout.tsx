import "./globals.css";
import { Montserrat } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata = {
  title: "Buena Vida",
  description: "App",
  icons: {
    icon: [
      { url: "/buenavida.png", sizes: "192x192", type: "image/png" },
      { url: "/buenavida.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>

      <body className={montserrat.variable}>
        <GoogleOAuthProvider clientId="TU_GOOGLE_CLIENT_ID">
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

import "./globals.css";
export const metadata = {
  title: "KODEX Discovery Platform",
  description: "Magnetic Architecture Discovery Platform by KODEX Research Labs"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}

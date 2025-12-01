import Header from "@/components/Homepage/Header";
import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

import Navbar from "./navbar";
import './globals.css';
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
}

export default function Layout({ children, showNavbar = true }: LayoutProps) {
  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}
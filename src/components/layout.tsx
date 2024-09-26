import Navbar from "./navbar";
import './globals.css';
import { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
}

export default function Layout({ children, showNavbar = true }: LayoutProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme: dark)" />
      </Head>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}
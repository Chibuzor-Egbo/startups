import React from "react";
import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";

async function Navbar() {
  const session = await auth();

  const handleLogin = async () => {
    "use server";
    await signIn("github");
  };

  const handleLogout = async () => {
    "use server";
    await signOut();
  };
  return (
    <header className="px-5 py-3 bg-white shadow-sm sticky top-0 z-1000">
      <nav className="flex justify-between items-center">
        <Link href="/">Home</Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form action={handleLogout}>
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={handleLogin}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

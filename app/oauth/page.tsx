// 


"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
      method: 'GET',
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();

        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);

        router.replace("/register");
      })
      .catch(() => {
        router.replace("/login");
      });
  }, []);

  return <p>Redirecting...</p>;
}

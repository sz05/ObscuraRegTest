//

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OAuthRedirect() {
  const router = useRouter();

  // const redirectTo = localStorage.getItem("redirectTo");
  const [redirectTo, setRedirectTo] = useState<string>();

  setRedirectTo(localStorage.getItem("redirectTo") ?? "/play");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();

        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);

        router.replace(redirectTo!);
      })
      .catch(() => {
        router.replace("/login");
      });
  }, []);

  return <p>Redirecting...</p>;
}

"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./AuthContext";

function withProtectedRoute(Component: React.ComponentType) {
  const Wrapper = () => {
    const { isAuth } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isAuth) {
        router.push("/");
      }
    }, [isAuth]);

    if (!isAuth) return null;

    return <Component />;
  };

  return Wrapper;
}

export default withProtectedRoute;

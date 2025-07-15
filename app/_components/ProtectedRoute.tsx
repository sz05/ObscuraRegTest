"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./AuthContext";

function withProtectedRoute(Component: React.ComponentType) {
  const Wrapper = () => {
    const { isAuth, isAuthenticatedLoaded } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isAuth && isAuthenticatedLoaded) {
        router.push("/");
      }
    }, [isAuth, isAuthenticatedLoaded]);

    if (!isAuth) return null;

    return <Component />;
  };

  return Wrapper;
}

export default withProtectedRoute;

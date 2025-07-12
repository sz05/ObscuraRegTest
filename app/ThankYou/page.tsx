"use client";

import { Suspense } from "react";
import ThankYou from "./components/ThankYou";
import withProtectedRoute from "../_components/ProtectedRoute";

function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou />
    </Suspense>
  );
}

export default withProtectedRoute(ThankYouPage);

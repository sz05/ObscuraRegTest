import { Suspense } from "react";
import ThankYou from "./components/ThankYou";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou />
    </Suspense>
  );
}

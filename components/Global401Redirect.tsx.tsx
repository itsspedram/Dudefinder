
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Global401Redirect() {
  const router = useRouter();

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      if (response.status === 401 && !window.location.pathname.includes("/login")) {
        router.push("/login");
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [router]);

  return null;
}

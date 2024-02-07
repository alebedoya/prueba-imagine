'use client'
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.location.href = "/articles";
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);



  return <div className="mt-10">Home</div>;
}

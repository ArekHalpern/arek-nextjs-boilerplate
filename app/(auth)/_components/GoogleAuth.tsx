"use client";

import { Icons } from "./Icons";
import { Button } from "../../../components/ui/button";
import { createClient } from "../../../lib/auth/supabase/client";
import React from "react";

export default function GoogleAuth() {
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full h-12 justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={handleGoogleSignIn}
    >
      <Icons.google className="mr-2 h-5 w-5" />
      Sign up with Google
    </Button>
  );
}
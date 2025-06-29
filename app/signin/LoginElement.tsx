"use client";

import ImageLogo from "@/components/navbar/ImageLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import imageGoogle from "@/public/images/google.webp";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-xs">
        <CardHeader>
          <div className="flex w-full items-center justify-center">
            <ImageLogo width={64} height={64} />
          </div>
          <CardTitle className="text-2xl w-full text-center">Login</CardTitle>
          <CardDescription className="w-full text-center">
            Sign in to practice interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <Button
                type="button"
                variant="outline"
                className="w-full text-base"
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
              >
                <Image src={imageGoogle} alt="google" width={20} height={20} />
                Signin with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

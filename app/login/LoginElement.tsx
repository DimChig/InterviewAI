"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import imageGoogle from "@/public/images/google.webp";
import Image from "next/image";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <Button
                type="button"
                variant="outline"
                className="w-full text-base"
                onClick={() => signIn("google", { callbackUrl: "/" })}
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

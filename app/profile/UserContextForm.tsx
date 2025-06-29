"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { loadUserContext, saveUserContext } from "@/lib/userContextStorage";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Define Zod schema for validation
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number." })
    .min(0, { message: "Age must be a positive number." }),
  resume: z.any().refine((files) => files?.length === 1, {
    message: "Resume file is required.",
  }),
  field: z.string().min(1, { message: "Job field is required." }),
  desc: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export const UserContextForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userContext, setUserContext] = useState<string | null>(null);
  const { data: authData } = useSession();

  useEffect(() => {
    console.log(authData?.user?.id);
    setUserContext(loadUserContext(authData?.user?.id));
  }, [authData]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      age: 0,
      resume: undefined,
      field: "",
      desc: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", String(data.age));
    formData.append("field", data.field);
    formData.append("desc", data.desc || "");
    formData.append("resume", data.resume[0]); // :contentReference[oaicite:2]{index=2}

    const res = await fetch("/api/userroute", {
      method: "POST",
      body: formData, // browser sets Content-Type: multipart/form-data
    });

    if (res.ok) {
      const context = await res.json();
      console.log("saved:");
      saveUserContext(context.summary, authData?.user?.id);
    } else {
      console.error("Failed to save user profile", await res.text());
    }

    setLoading(false);
  }

  return (
    <div className="p-6 flex gap-12 w-full h-full justify-center">
      <Card className="w-full max-w-md h-fit">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Please fill out the details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resume */}
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => {
                  const { onChange, onBlur, name, ref } = field;
                  return (
                    <FormItem>
                      <FormLabel>Resume (PDF)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf"
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
                          onChange={(e) => {
                            onChange(e.target.files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Job Field */}
              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Field</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Developer, etc..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Post Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-48 max-h-48"
                        placeholder="Copy and paste your job description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <LoaderCircle className="animate-spin" />}
                {isLoading ? "Submiting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {userContext && (
        <Card className="max-w-lg max-h-[83%] opacity-20 hover:opacity-100 transition-all">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>For demonstrational purposes</CardDescription>
          </CardHeader>
          <CardContent className="overflow-y-auto">{userContext}</CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserContextForm;

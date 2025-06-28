"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

export const Page = () => {
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
    // …handle res.ok / res.json() as before…
  }

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Application Form</CardTitle>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume (PDF)</FormLabel>
                    <FormControl>
                      <Input type="file" accept="application/pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Job Field */}
              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Field</FormLabel>
                    <FormControl>
                      <Input placeholder="Desired field" {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

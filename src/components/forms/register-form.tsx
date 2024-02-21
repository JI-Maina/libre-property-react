"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { regSchema } from "./form-schema";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof regSchema>>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNo: "",
      password: "",
      cfmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof regSchema>) => {
    const user = {
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.username,
      phone_no: values.phoneNo,
      password: values.password,
      is_owner: true,
      is_caretaker: false,
      is_tenant: false,
    };
    // console.log(user);
    const url = `${process.env.NEXT_PUBLIC_DJANGO_BASE_URL}/auth/register/`;

    try {
      const res = await axios.post(url, user, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        router.push("/auth/login");
        toast({
          title: "Success",
          description: "Account created! login to your account",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data);
        if (!error?.response) {
          toast({
            description: "Registration Failed! Check your internet connection",
            variant: "destructive",
          });
        } else if (error?.response?.status === 400) {
          if (error.response.data.phone_no && error.response.data.username) {
            toast({
              description: `${error?.response?.data?.username[0]} ${error.response.data.phone_no[0]}`,
              variant: "destructive",
            });
          } else if (error.response.data.phone_no) {
            toast({
              description: error.response.data?.phone_no[0],
              variant: "destructive",
            });
          } else if (error.response.data.username) {
            toast({
              description: error.response.data?.username[0],
              variant: "destructive",
            });
          }
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname:</FormLabel>
                <FormControl>
                  <Input placeholder="john" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname:</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input placeholder="jonte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number:</FormLabel>
                <FormControl>
                  <Input placeholder="0700000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input placeholder="your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cfmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password:</FormLabel>
              <FormControl>
                <Input
                  placeholder="re-enter password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign-up
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

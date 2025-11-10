"use client";

import { z } from "zod";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import User from "@/components/feature/User";
import ExternalFlagPhoneInput from "@/components/feature/Phone";
import CountryPhoneInputForm from "@/components/feature/CountryPhoneInputForm";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

const fnLoadUsers = fetch('http://localhost:8080/user').then(res => res.json())

const page = () => {
    const allUsers = use(fnLoadUsers);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        fetch('http://localhost:8080/user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                console.log("submit done", data);
            })
            .then(() => {
                form.reset();
            })
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-[750px] items-center justify-center">
                    <div className="w-[550px] border p-6 space-y-2 rounded-xl">
                        <h1 className="text-4xl text-center pb-4 font-bold ">Create User</h1>
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password:</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="w-[100px] bg-green-400 hover:bg-green-500 font-bold tracking-normal italic hover:tracking-widest hover:italic"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
            {/* Country Phone Input Form */}
            <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone Number</label>
                <CountryPhoneInputForm />
            </div>
            <div className="flex justify-center w-full">
                <div className="">
                    <h1 className="text-4xl text-center pb-4 font-bold ">All Users</h1>
                    <User allUsers={allUsers}></User>
                </div>
            </div>
        </div>
    )
}

export default page
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CountryPhoneInput from "@/components/feature/CountryPhoneInput";

// Define the form schema
const countryPhoneFormSchema = z.object({
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
});

export default function CountryPhoneInputForm() {
  const form = useForm<z.infer<typeof countryPhoneFormSchema>>({
    resolver: zodResolver(countryPhoneFormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof countryPhoneFormSchema>) {
    // Parse the combined value
    const [countryCode, phoneNumber] = values.phoneNumber.split("|");
    
    // Log the values to the console
    console.log("Country Phone Form Values:", values);
    console.log("Country Code:", countryCode);
    console.log("Phone Number:", phoneNumber);
    
    // Here you would typically send the data to your backend
    // For now, we'll just log it to the console
    alert(`Phone number submitted: ${countryCode} ${phoneNumber}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <CountryPhoneInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Phone Number</Button>
      </form>
    </Form>
  );
}
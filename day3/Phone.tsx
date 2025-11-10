"use client";

import { useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ExternalFlagPhoneInput() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<CountryData | null>(null);
  const [countryCode, setCountryCode] = useState("+880"); // default Bangladesh

  const handleChange = (
    value: string,
    data: {} | CountryData,
    _event: any,
    _formattedValue: string
  ) => {
    setPhone(value);

    if ("dialCode" in data) {
      setCountry(data);
      setCountryCode("+" + data.dialCode);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Country dropdown outside */}
      <div className="w-8">
        <PhoneInput
          country={"bd"}
          value={phone}
          onChange={handleChange}
          inputStyle={{
            display: "none",
          }}
        />
      </div>

      {/* Visible input field with +country code */}
      <div className="flex flex-1 items-center border border-gray-300 rounded-lg px-3 py-2 text-sm focus-within:border-blue-500">
        <span className="text-gray-500 select-none">{countryCode}</span>
        <input
          type="tel"
          placeholder="Enter phone number"
          className="flex-1 ml-2 bg-transparent outline-none"
          value={phone.replace(/^\+\d+\s?/, "")}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );
}

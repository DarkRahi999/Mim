"use client";

import { useState, useMemo, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import countriesData from '@/data/countries.json';

// Define the country data type to match the updated JSON structure
interface Country {
  name: string;
  code: string;
  image: string;
  dial_code: string;
}

// Extend the component to accept ref and other props for form integration
interface CountryPhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CountryPhoneInput = forwardRef<HTMLInputElement, CountryPhoneInputProps>(({ value, onChange }, ref) => {
  // Extract phone number and country code from value if provided
  const initialValue = value || "";
  const initialPhone = initialValue.includes("|") ? initialValue.split("|")[1] : initialValue;
  const initialCountryCode = initialValue.includes("|") ? initialValue.split("|")[0] : "+880"; // Default to Bangladesh

  const [phone, setPhone] = useState(initialPhone);
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    // Find country by dial code or default to Bangladesh
    const country = countriesData.find((country: Country) => country.dial_code === initialCountryCode);
    return country || countriesData.find((country: Country) => country.code === "BD") || countriesData[0];
  });
  const [isOpen, setIsOpen] = useState(false);

  // Filter countries for search
  const [search, setSearch] = useState("");

  const filteredCountries = useMemo(() => {
    if (!search) return countriesData;
    return countriesData.filter((country: Country) => 
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.code.toLowerCase().includes(search.toLowerCase()) ||  // Add country code search
      country.dial_code.includes(search)
    );
  }, [search]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch("");
    
    // Notify parent of the change with both country code and phone number
    if (onChange) {
      onChange(`${country.dial_code}|${phone}`);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhone(newValue);
    
    // Notify parent of the change with both country code and phone number
    if (onChange) {
      onChange(`${selectedCountry.dial_code}|${newValue}`);
    }
  };

  // Function to get flag image URL
  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {/* Country selector dropdown */}
        <div className="relative w-24">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-1 px-2 py-2 text-sm w-full justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Display flag image instead of emoji */}
            <div className="flex items-center gap-1">
              <div className="w-5 h-5">
                <img 
                  src={getFlagUrl(selectedCountry.code)} 
                  alt={selectedCountry.name}
                  className="w-5 h-5"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect width='20' height='20' fill='%23ccc'/%3E%3Ctext x='10' y='14' font-family='Arial' font-size='12' text-anchor='middle' fill='%23666'%3E%3F%3F%3F%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <span>{selectedCountry.dial_code}</span>
            </div>
            <svg 
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
              {/* Search input */}
              <div className="p-2 border-b border-gray-200">
                <Input
                  type="text"
                  placeholder="Search country or code..."
                  className="text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
              
              {/* Country list */}
              <ScrollArea className="h-40">
                <div className="py-1">
                  {filteredCountries.map((country: Country) => (
                    <Button
                      key={country.code}
                      type="button"
                      variant="ghost"
                      className={`flex items-center gap-2 w-full px-3 py-2 text-left text-sm justify-start hover:bg-gray-100 ${
                        selectedCountry.code === country.code ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleCountrySelect(country)}
                    >
                      {/* Display flag image instead of emoji */}
                      <div className="w-5 h-5">
                        <img 
                          src={getFlagUrl(country.code)} 
                          alt={country.name}
                          className="w-5 h-5"
                          onError={(e) => {
                            // Fallback to a placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect width='20' height='20' fill='%23ccc'/%3E%3Ctext x='10' y='14' font-family='Arial' font-size='12' text-anchor='middle' fill='%23666'%3E%3F%3F%3F%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <span className="flex-1">{country.name}</span>
                      <span>{country.dial_code}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Phone input field */}
        <div className="flex flex-1">
          <Input
            ref={ref}
            type="tel"
            placeholder="Enter phone number"
            className="text-sm"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
      </div>
    </div>
  );
});

CountryPhoneInput.displayName = "CountryPhoneInput";

export default CountryPhoneInput;
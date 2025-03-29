import z from "zod";

export const ShippersignupSchema = z.object({
  username: z.string(),
  password: z.string().min(4, "Password must be at least 4 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  mc_dot: z.string().min(3, "MC/DOT number must be at least 3 characters"),
  carrierType: z.string().min(2, "Carrier type must be at least 2 characters"),
  country: z.string().min(2, "Country name must be at least 2 characters"),
  state: z.string().min(2, "State name must be at least 2 characters"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  zipcode: z.string().min(5, "Zipcode must be at least 5 characters"),
  fleetSize: z.string().min(1, "Fleet size is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  role: z.string(),
});
export const truckerSignupSchema = z.object({
  username: z.string(),
  password: z.string().min(4, "Password must be at least 4 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  vehicleType: z.string().min(3, "Vehicle type must be at least 3 characters"),
  licenseNo: z.string().min(2, "License number must be at least 2 characters"),
  latitude: z.number(),
  longitude: z.number(),
  availability: z.boolean(),
});

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

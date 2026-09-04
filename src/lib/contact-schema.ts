import { z } from "zod";
import { contact } from "@/content/site";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresá tu nombre").max(80, "Nombre demasiado largo"),
  email: z.string().trim().email("Ingresá un email válido").max(120),
  type: z.enum(contact.types),
  message: z.string().trim().min(10, "Contame un poco más").max(2000, "Mensaje demasiado largo"),
  // Honeypot: los humanos no lo ven; los bots lo completan.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

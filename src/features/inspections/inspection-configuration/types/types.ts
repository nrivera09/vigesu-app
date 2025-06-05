// types.ts
import { z } from "zod";

export const SubResponseSchema: z.ZodType<SubResponse> = z.lazy(() =>
  z.object({
    value: z.string().min(1, "Respuesta requerida"),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Color inválido"),
    subresponses: z.array(SubResponseSchema).optional(),
  })
);

export const QuestionSchema = z.object({
  description: z.string().min(1),
  type: z.enum(["Texto", "Número", "Hora"]),
  has_extra: z.boolean(),
  auto_responses: z.array(SubResponseSchema),
});

export const HeaderOrderSchema = z.object({
  inspection_type: z.string(),
  last_annual_inspection: z.string(),
  new_fmcsa: z.boolean(),
  last_california_inspection: z.string(),
  new_bit: z.boolean(),
  license_number: z.string(),
  state: z.string(),
  location: z.string(),
  equipment_mark: z.string(),
  owner_or_lessor: z.string(),
});

export const FullFormSchema = z.object({
  header_order: HeaderOrderSchema,
  body_order: z.array(QuestionSchema),
});

export type SubResponse = z.infer<typeof SubResponseSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type FullForm = z.infer<typeof FullFormSchema>;

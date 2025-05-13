import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UpdatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
});

export class UpdatePostDto extends createZodDto(UpdatePostSchema) {}

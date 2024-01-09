import { z } from "zod";

const SpecimenValidator = z.object({
    body: z.object({
        value: z.string({
            required_error: 'Value is required'
        }),
        description: z.string({
            required_error: 'Description is required'
        }),
        label: z.string({
            required_error: 'Label is required'
        })
    })
})


export const SpecimenValidation = {
    SpecimenValidator
}

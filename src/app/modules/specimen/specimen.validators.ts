import { z } from "zod";

const specimen_validator = z.object({
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


export const specimen_validation = {
    specimen_validator
}

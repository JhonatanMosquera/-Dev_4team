import {z} from 'zod'


export const registerSchema = z.object({
    name: z.string({required_error: "name is required"}),
    email: z.string({
        required_error: "imail is requiered"
    }).email({
        message: "invalid imail"
    }),
    password: z.string({
        required_error: "passworld is requiere"
    }).min(6,{
        message: "la contraseña debe ser minimo de 6 caracteres"
    }),
})

export const LoginSchema = z.object({
    email: z.string({
        required_error: "email is requiered"
    }).email({
        message: "invalid email"
    }),
    password: z.string({
        required_error: "passworld is requiere"
    }).min(6,{
        message: "la contraseña debe ser minimo de 6 caracteres"
    }),
})


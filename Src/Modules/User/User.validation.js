import joi from "joi";
import { generalFields } from "../../Middleware/validation.js";

export const profile={
    file:generalFields.file.required(),
}
export const updatePassword={
    body:joi.object({
        oldPassword:generalFields.password,
        newPassword:generalFields.password.invalid(joi.ref('oldPassword')),
        cPassword:joi.valid(joi.ref('newPassword')).required(),
    })
}
export const shareProfile={
    params:joi.object({
        id:generalFields.id,
    })
}
import React from 'react'
import * as zod from "zod"
export const schema = zod.object({
    name:zod.string().nonempty("name is required").min(3,"name must be more than 3 letters").max(15, "name must be less than 15 letters") ,
    email:zod.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"the email is invalid"),
   password:zod.string().nonempty("password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must be at least 8 characters, include uppercase, number, and symbol"),
   rePassword:zod.string().nonempty("repassword is required"),
      phone:zod.string().nonempty("phone is required").regex(/^01[0125][0-9]{8}$/,"we need egyptian phone number"),

}).refine(({password, rePassword})=>password=== rePassword,{
    path:['rePassword'],
    message:"invaid rePassword "
})



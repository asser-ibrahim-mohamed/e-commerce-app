import React from 'react'
import * as zod from "zod"
export const schemaLogin = zod.object({
    email:zod.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"the email is invalid"),
   password:zod.string().nonempty("password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must be at least 8 characters, include uppercase, number, and symbol"),
  
})


// next-auth.d.ts
import { UserResponse } from "@/Interfaces/AuthInterfaces";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";



declare module "next-auth" {

  interface Session {
    user: UserResponse;
    token: string; 
  }


  interface User extends DefaultUser {
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserResponse;
    token: string;
  }
}
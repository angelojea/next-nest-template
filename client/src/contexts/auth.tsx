"use client";
import { loginSchemaType } from "@/schemas/login.schema";
import { signupSchemaType } from "@/schemas/signUp.schema";
import { cookieStore } from "@/services/cookies.service";
import httpService from "@/services/http.service";
import { HttpStatusCode } from "axios";
import { createContext, PropsWithChildren, ReactNode, useContext, useState } from "react";

type RoleType = "employee" | "admin";

export type AuthContextType = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  sub: number;
  roles: RoleType[];
};

export type AuthContextProps = {
  user?: AuthContextType;
  login: (values: loginSchemaType) => Promise<void>;
  logout: () => void;
  signUp: (values: signupSchemaType) => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  login: (v) => Promise.resolve(),
  logout: () => null,
  signUp: (v) => Promise.resolve(),
});

type AuthProviderProps = {
  ssrUser?: AuthContextType;
} & PropsWithChildren;

export function AuthProvider(props: AuthProviderProps) {
  const login = async (values: loginSchemaType) => {
    const response = await httpService.post("/api/login", values);

    if (response.status === HttpStatusCode.BadRequest) {
      alert("Invalid credentials");
    }
    setTimeout(() => location.reload(), 500);
  };
  const signUp = async (values: signupSchemaType) => {
    const response = await httpService.post("/api/signup", {
      ...values,
      username: values.email,
    });
    setTimeout(() => location.reload(), 500);
  };

  const logout = async () => {
    cookieStore.remove("aoj-token");
    setTimeout(() => location.replace("/"), 500);
  };

  return <AuthContext.Provider value={{ user: props.ssrUser, login, logout, signUp }}>{props.children}</AuthContext.Provider>;
}
export function useAuth() {
  const authCtx = useContext(AuthContext);
  return {
    ...authCtx,
    isAdmin: Boolean(authCtx.user?.roles.includes("admin")),
  };
}

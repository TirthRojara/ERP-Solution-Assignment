import api from "@/lib/axios/client";
import { LoginApiPayload, LoginFormPayload, LoginResponse } from "./types";
import { toFormData } from "axios";
import { ApiResponse } from "@/types/api";

export const login = async (payload: LoginFormPayload): Promise<LoginResponse> => {
    const apiPayload: LoginApiPayload = {
        cmd: "login",
        ...payload,
    }

    // const res = await api.post('/login', new URLSearchParams(apiPayload));
    const res = await api.post('/login', toFormData(apiPayload));
    return res.data;
}

export const logout = async (): Promise<void> => {
    const res = await api.post('/api/method/logout');
    return res.data;
}

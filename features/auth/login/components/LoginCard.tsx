"use client";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom-input";
import { CustomLabel } from "@/components/custom-label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Mail, LockKeyhole, Eye } from "lucide-react";
import {
    defaultLoginFormValue,
    LoginFormPayload,
    loginSchema,
} from "../api/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { CustomCheckbox } from "@/components/custom-checkbox";
import SocialButton from "./LoginButtons";
import { useLogin } from "../api/hooks";

export default function LoginCard() {
    const { mutate, isPending } = useLogin();

    const form = useForm<LoginFormPayload>({
        defaultValues: defaultLoginFormValue,
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const onSubmit = (data: LoginFormPayload) => {
        console.log({ data });

        mutate(data);
    };

    return (
        <Card className="w-full max-w-sm px-2 py-6">
            <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-xl font-semibold">
                    Login to{" "}
                    <span className="text-primary">Sterling Cloud</span>
                </CardTitle>
                <CardDescription className="text-foreground/50">
                    Let&apos;s login into your account first
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <Controller
                            control={form.control}
                            name="usr"
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-1.5">
                                    <CustomLabel
                                        label="Username"
                                        required
                                        htmlFor="usr"
                                    />
                                    <CustomInput
                                        {...field}
                                        id="usr"
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter Username"
                                        leftIcon={{ icon: <Mail /> }}
                                        errorMessage={fieldState.error?.message}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="pwd"
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-1.5">
                                    <CustomLabel
                                        label="Password"
                                        required
                                        htmlFor="pwd"
                                    />
                                    <CustomInput
                                        {...field}
                                        id="pwd"
                                        type="password"
                                        variant="outlined"
                                        placeholder="Enter Password"
                                        leftIcon={{ icon: <LockKeyhole /> }}
                                        rightIcon={{
                                            icon: <Eye />,
                                            onClick: () => {},
                                        }}
                                        errorMessage={fieldState.error?.message}
                                    />
                                </div>
                            )}
                        />

                        <div className="flex justify-between">
                            <CustomCheckbox
                                variant="withLabelMuted"
                                label="Remember me"
                            />
                            <p className="cursor-pointer hover:underline text-foreground/70">
                                Forgot Password?
                            </p>
                        </div>

                        <Button type="submit">Sign In</Button>

                        <div className="flex items-center gap-4">
                            <Separator className="flex-1 bg-gray/30 border-t h-px" />

                            <p className="text-9px text-foreground/50 whitespace-nowrap">
                                Or Sign in with
                            </p>

                            <Separator className="flex-1 bg-gray/30 border-t h-px" />
                        </div>

                        {/* Social login buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <SocialButton provider="google" />
                            <SocialButton provider="facebook" />
                        </div>

                        <span className="text-center text-sm text-foreground/50">
                            Don&apos;t have an account?{" "}
                            <a
                                href="#"
                                className="text-primary hover:underline"
                            >
                                Register
                            </a>
                        </span>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

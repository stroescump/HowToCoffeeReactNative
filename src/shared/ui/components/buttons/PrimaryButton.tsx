import React from "react";
import Button, { ButtonProps } from "./Button";

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
    return <Button variant="primary" {...props} />;
}
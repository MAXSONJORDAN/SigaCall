'use client'

import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const BackButton = (props:ButtonProps) => {

    const router = useRouter();

    return (<Button {...props} onClick={() => {
        router.back();
        router.refresh();
    }}>
        {props.children}
    </Button>)
}
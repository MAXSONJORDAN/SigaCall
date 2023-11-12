'use client'
import { VStack } from '@chakra-ui/react'


export function MenuList({ children }: any) {

    return (
        <VStack pl={5} align={'normal'} textDecoration={'underline'} spacing={5}>
            {children}
        </VStack>
    )
}

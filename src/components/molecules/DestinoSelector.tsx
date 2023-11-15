import { Box, Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"


type IProps = {
    destino: any,
    onChange: (value: any) => void,
    destinos: any[]
}
export const DestinoSelector = (props: IProps) => {

    const [editMode, setEditMod] = useState(false);
    const [value, setValue] = useState(props.destino ?? props.destinos.length > 0 ? props.destinos[0] : null);
    const { isOpen, onOpen, onClose } = useDisclosure();


    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const handleSave = (val) => {
        if (val) {
            setValue(val)
            props.onChange(val)
            if (window) {
                window.localStorage.setItem("destino", val)
            }
        } else {
            if (props.destinos && props.destinos.length > 0) {
                const destino = props.destinos[0].identificador;
                setValue(destino);
                props.onChange(destino);
                window.localStorage.setItem("destino", destino)
            }

        }

    }

    const handleLoad = () => {
        if (window) {
            const destino = window.localStorage.getItem("destino")
            if (destino) {

                if (props.destinos && props.destinos.length > 0) {
                    const destinos = props.destinos.filter(item => {
                        return item.identificador === destino;
                    })

                    if (destinos.length > 0) {
                        setValue(destino);
                        props.onChange(destino)
                    } else {
                        onOpen();
                    }
                }


            } else {
                onOpen();
            }

        }
    }

    useEffect(() => {
        handleLoad()
    }, [])

    return (
        <Flex bg={'white'} borderRadius={10} mt={4} w={'100%'} flexDirection={'column'} padding={2}>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => { }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Selecione o Local de Atendimento</ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody pb={6}>
                        <FormControl id="tratamentoId" size={'sm'}>
                            <FormLabel>Destino de Atendimento</FormLabel>
                            <Select
                                name="tratamentoId"
                                size={'sm'}
                                value={value}
                                onChange={(ev) => { setValue(ev.target.value) }}
                            >
                                {props.destinos.map((item: any) => {
                                    return <option value={item.identificador}>{item.identificador}</option>
                                })}

                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            handleSave(value);
                            onClose();
                        }}>
                            Salvar
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>



            <Flex flexDirection={'row'}>
                <FormControl id="tratamentoId" size={'sm'}>
                    <FormLabel>Destino de Atendimento</FormLabel>
                    <Select
                        name="tratamentoId"
                        disabled={!editMode}
                        size={'sm'}
                        value={value}
                        onChange={(ev) => { setValue(ev.target.value) }}
                    >
                        {props.destinos.map((item: any) => {
                            return <option value={item.identificador}>{item.identificador}</option>
                        })}

                    </Select>
                </FormControl>
                <Flex mt={2}>
                    <Box flex={1} />
                    <Button ml={2} mt={6} size={'sm'} colorScheme="brand"
                        onClick={() => {
                            if (!editMode) {
                                setEditMod(true);
                            } else {
                                props.onChange(value)
                                setEditMod(false)
                            }
                        }}
                    >
                        {editMode ? "Salvar" : "Alterar"}
                    </Button>
                </Flex>
            </Flex>
        </Flex >
    )
}
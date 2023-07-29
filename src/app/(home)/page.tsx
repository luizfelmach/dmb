"use client";
import { Header } from "@/components/Header";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  useBoolean,
} from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useBoolean(false);

  const [nameError, setNameError] = useBoolean(false);
  const [addressError, setAddressError] = useBoolean(false);
  const [peoplesError, setPeoplesError] = useBoolean(false);
  const [eventDateError, setEventDateError] = useBoolean(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [peoples, setPeoples] = useState(0);
  const [eventDate, setEventDate] = useState("");

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") setNameError.off();
    setName(e.target.value);
  };

  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") setAddressError.off();
    setAddress(e.target.value);
  };

  const handlePeoples = (value: String) => {
    if (+value !== 0) setPeoplesError.off();

    setPeoples(+value);
  };

  const handleEventDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEventDate(e.target.value);
  };

  const handleSubmit = () => {
    if (name === "") setNameError.on();
    if (address === "") setAddressError.on();
    if (peoples === 0) setPeoplesError.on();

    if (name === "" || address === "" || peoples === 0) {
      return;
    }

    setLoading.on();
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });
  };

  return (
    <Container>
      <Header />

      <Box my={10}>
        <Heading my={3}>Informações Gerais</Heading>
        <Text fontSize="sm" mt={3}>
          Nome
        </Text>
        <Input
          onChange={handleName}
          value={name}
          isInvalid={nameError}
          size={"lg"}
          focusBorderColor="purple.100"
        />
        <Text fontSize="sm" mt={3}>
          Endereço do evento
        </Text>
        <Input
          onChange={handleAddress}
          value={address}
          size={"lg"}
          isInvalid={addressError}
          focusBorderColor="purple.100"
        />
        <Text fontSize="sm" mt={3}>
          Quantidade de pessoas
        </Text>
        <NumberInput
          onChange={handlePeoples}
          value={peoples === 0 ? "" : peoples}
          min={0}
          size={"lg"}
          isInvalid={peoplesError}
          focusBorderColor="purple.100"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text fontSize="sm" mt={3}>
          Dia do evento
        </Text>
        <Input
          onChange={handleEventDate}
          value={eventDate}
          type="date"
          size={"lg"}
          isInvalid={eventDateError}
          focusBorderColor="purple.100"
        />
      </Box>

      <Box my={10}>
        <Heading my={3}>Serviços</Heading>
      </Box>

      <Box my={10}>
        <Heading my={3}>Observações</Heading>
        <Text fontSize="sm">Deixe algumas observações</Text>
        <Textarea focusBorderColor="purple.100" />
      </Box>

      <Box my={10} display={"flex"} justifyContent={"center"}>
        <Button
          isLoading={loading}
          colorScheme="purple"
          size="lg"
          onClick={handleSubmit}
          width={"xs"}
        >
          Finalizar
        </Button>
      </Box>
    </Container>
  );
}

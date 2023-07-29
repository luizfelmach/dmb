"use client";
import { Header } from "@/components/Header";
import { services } from "@/utils/services";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Text,
  Textarea,
  UnorderedList,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useBoolean(false);

  const [nameError, setNameError] = useBoolean(false);
  const [addressError, setAddressError] = useBoolean(false);
  const [peoplesError, setPeoplesError] = useBoolean(false);
  const [eventDateError, setEventDateError] = useBoolean(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [peoples, setPeoples] = useState(0);
  const [eventDate, setEventDate] = useState("");
  const [comment, setComment] = useState("");

  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesState, setServices] = useState(services);
  const [serviceIndex, setServiceIndex] = useState(0);

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

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSelectService = (index: number) => {
    setSelectedServices((prev) => {
      let newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleEditItem = (indexItem: number, value: string) => {
    setServices((prev) => {
      let newState = [...prev];
      newState[serviceIndex].items[indexItem] = value;
      return newState;
    });
  };

  const handleAddItem = () => {
    setServices((prev) => {
      let newState = [...prev];
      newState[serviceIndex].items.push("item");
      return newState;
    });
  };

  const handleDeleteItem = (indexItem: number) => {
    setServices((prev) => {
      let newState = [...prev];
      newState[serviceIndex].items.splice(indexItem, 1);
      return newState;
    });
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

    const order = {
      name,
      address,
      eventDate,
      peoples,
      services: [],
      comment,
    };

    selectedServices.forEach((flag, index) => {
      if (flag) order.services.push({ ...servicesState[index] });
    });

    fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != undefined) {
          router.push(`/${data.id}`);
        }
        setLoading.off();
      })
      .catch((error) => console.log(error));
  };

  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

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
        <List spacing={4}>
          {services.map((service, index) => {
            return (
              <Box display={"flex"} alignItems={"center"} key={index}>
                <ListItem
                  border={"1px"}
                  borderColor={
                    !selectedServices[index] ? "whiteAlpha.200" : "purple.100"
                  }
                  bgColor={"whiteAlpha.200"}
                  display={"flex"}
                  padding={"10px"}
                  borderRadius={"lg"}
                  height={"10"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexGrow={1}
                  _hover={{
                    bgColor: "whiteAlpha.100",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelectService(index)}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    alignContent={"center"}
                  >
                    <Text fontSize={"medium"}>{service.name}</Text>
                  </Box>
                </ListItem>
                <IconButton
                  key={index + 100}
                  ml={2}
                  colorScheme="purple"
                  aria-label="Visualize os itens do serviço"
                  icon={<ViewIcon />}
                  onClick={() => {
                    setServiceIndex(index);
                    onOpenView();
                  }}
                />
                <IconButton
                  ml={2}
                  key={index + 200}
                  colorScheme="purple"
                  aria-label="Visualize os itens do serviço"
                  icon={<EditIcon />}
                  onClick={() => {
                    setServiceIndex(index);
                    onOpenEdit();
                  }}
                />
              </Box>
            );
          })}
        </List>
      </Box>

      <Box my={10}>
        <Heading my={3}>Observações</Heading>
        <Text fontSize="sm">Deixe algumas observações</Text>
        <Textarea
          value={comment}
          onChange={handleComment}
          focusBorderColor="purple.100"
        />
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

      <Modal isCentered isOpen={isOpenView} onClose={onCloseView}>
        <ModalOverlay backdropFilter="auto" backdropBlur="10px" />
        <ModalContent bg={"#101010"}>
          <ModalHeader>{services[serviceIndex].name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList spacing={2}>
              {services[serviceIndex].items.map((item, index) => {
                return <ListItem key={index}>{item}</ListItem>;
              })}
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isCentered isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay backdropFilter="auto" backdropBlur="10px" />
        <ModalContent bg={"#101010"}>
          <ModalHeader>{services[serviceIndex].name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList spacing={2}>
              {services[serviceIndex].items.map((item, index) => {
                return (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    alignContent={"center"}
                    key={index}
                  >
                    <ListItem flexGrow={1}>
                      <Editable
                        value={item}
                        padding={"1"}
                        bg={"whiteAlpha.200"}
                        borderRadius={"md"}
                        onChange={(value) => handleEditItem(index, value)}
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </ListItem>
                    <IconButton
                      ml={2}
                      colorScheme="red"
                      aria-label="Delete o item do serviço"
                      icon={<DeleteIcon />}
                      onClick={(e) => handleDeleteItem(index)}
                    />
                  </Box>
                );
              })}
            </UnorderedList>
            <IconButton
              m={5}
              colorScheme="green"
              aria-label="Adicione item ao serviço"
              icon={<AddIcon />}
              onClick={handleAddItem}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

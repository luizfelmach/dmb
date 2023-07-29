"use client";

import { Header } from "@/components/Header";
import { Order } from "@/types/order";
import {
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/order/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setOrder(data);
          console.log(process.env.DATABASE_URL);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleShare = () => {
    let baselink = "https://api.whatsapp.com/send?phone=5527997531022&text=";
    baselink += `Olá, Darlene!\nFiz o meu pedido em https://dmb-luizfelmach.vercel.app/${params.id} e gostaria que fizesse o orçamento! Obrigado(a)!`;
    router.push(baselink);
  };

  return (
    <Container>
      <Header />

      {order ? (
        <>
          <Box display={"flex"} justifyContent={"center"}>
            <Button onClick={handleShare} colorScheme="whatsapp">
              Whatsapp
            </Button>
          </Box>

          <Box my={10}>
            <Heading my={3}>Informações Gerais</Heading>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} mr={2}>
                Nome:
              </Text>
              <Text color={"gray"}>{order.name}</Text>
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} mr={2}>
                Endereço do evento:
              </Text>
              <Text color={"gray"}>{order.address}</Text>
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} mr={2}>
                Quantidade de pessoas:
              </Text>
              <Text color={"gray"}>{order.peoples} pessoas</Text>
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} mr={2}>
                Data do evento:
              </Text>
              <Text color={"gray"}>
                {new Date(order.eventDate).toLocaleDateString()}
              </Text>
            </Box>
          </Box>

          <Box my={10}>
            {order.services.map((service, serviceIndex) => {
              return (
                <Box key={serviceIndex}>
                  <Heading my={3}>{service.name}</Heading>
                  <UnorderedList spacing={1} mx={10}>
                    {service.items.map((item, itemIndex) => {
                      return (
                        <ListItem key={itemIndex}>
                          <Text color={"gray"}>{item}</Text>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                </Box>
              );
            })}
          </Box>

          {order.comment !== "" ? (
            <>
              <Box my={10}>
                <Heading my={3}>Observações</Heading>
                <Text color={"gray"}>{order.comment}</Text>
              </Box>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <Box display={"flex"} justifyContent={"center"} mt={20}>
          <Spinner color="purple.200" size={"xl"} />
        </Box>
      )}
    </Container>
  );
}

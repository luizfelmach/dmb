"use client";
import { HeaderCompany } from "@/components/company-header";
import { Section } from "@/components/section";
import { useToast } from "@/components/ui/use-toast";
import { company } from "@/utils/company";
import { Order } from "@/utils/order.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { DollarSign, Dot } from "lucide-react";

function Loading() {
  return "Carregando";
}

export default function OrderView({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch(`/api/order/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.id) {
          setOrder(data);
        } else {
          router.push("/");
          toast({
            title: "Nao foi possível encontrar esse pedido",
            variant: "destructive",
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleWhatsapp = () => {
    let self = `https://darlenemachadobuffet.top/${params.id}`;
    let phone = "5527997531022";
    let message = `Ol%C3%A1,%20Darlene!%0A%0AFiz%20um%20pedido%20em%20${self}%20e%20gostaria%20de%20saber%20o%20pre%C3%A7o.%20Obrigado(a)!`;
    let link = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(link, "_blank");
  };

  return (
    <div>
      <HeaderCompany {...company} />

      <div className="flex justify-center">
        <div className="w-11/12 max-w-2xl mt-9 space-y-9">
          {order ? (
            <>
              <div className="flex justify-end">
                <p className="text-foreground/50 text-sm mr-3 max-w-[110px]">
                  Solicite o preço do pedido aqui
                </p>
                <Button size={"icon"} onClick={handleWhatsapp}>
                  <DollarSign />
                </Button>
              </div>
              <Section
                title="Informações"
                description="Dados gerais para o orçamento."
              >
                <div className="flex space-x-2">
                  <span className="font-bold">Nome: </span>
                  <p className="text-foreground/50">{order.name}</p>
                </div>
                <div className="flex space-x-2">
                  <span className="font-bold">Endereço do evento: </span>
                  <p className="text-foreground/50">{order.address}</p>
                </div>

                <div className="flex space-x-2">
                  <span className="font-bold">Quantidade de pessoas: </span>
                  <p className="text-foreground/50">{order.peoples} pessoas</p>
                </div>

                <div className="flex space-x-2">
                  <span className="font-bold">Data do evento: </span>
                  <p className="text-foreground/50">
                    {format(new Date(order.eventDate), "PPP", { locale: ptBR })}
                  </p>
                </div>
                {order.comment !== "" ? (
                  <>
                    <div className="flex space-x-2">
                      <span className="font-bold">Observações: </span>
                      <p className="text-foreground/50">{order.comment}</p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </Section>

              <div className="space-y-6">
                {order.services.map((service, serviceIndex) => {
                  return (
                    <div key={serviceIndex}>
                      <h1 className="font-bold text-xl mb-4">{service.name}</h1>

                      <div className="pl-4">
                        {service.items.map((item, itemIndex) => {
                          return (
                            <div key={itemIndex} className="flex">
                              <Dot className="flex-shrink-0" />
                              <span className="inline text-foreground/50">
                                {item}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-10"></div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

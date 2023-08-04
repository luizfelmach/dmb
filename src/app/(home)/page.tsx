"use client";

import { HeaderCompany } from "@/components/company-header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BadgeCheck,
  BadgePlus,
  CalendarIcon,
  Loader,
  Plus,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Section } from "@/components/section";
import { Textarea } from "@/components/ui/textarea";

import { services } from "@/utils/services";
import { ServiceToggle } from "@/components/service-toggle";
import confetti from "canvas-confetti";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Order, Service } from "@/utils/order.type";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { company } from "@/utils/company";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Nome curto.")
    .max(40, "Por favor, limite o nome a 40 caracteres."),
  address: z
    .string()
    .min(2, "Endereço curto.")
    .max(40, "Por favor, limite o endereço a 40 caracteres."),
  peoples: z.number().min(20, "Mínimo de 20 pessoas necessário."),
  eventDate: z.date({ required_error: "Selecione uma data." }),
  comment: z.string(),
});

export default function Company() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<boolean[]>([]);
  const [modalView, setModalView] = useState<boolean>(false);
  const [addItem, setAddItem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  let initialItemState = Array(services.length);
  for (var i = 0; i < initialItemState.length; i++)
    initialItemState[i] = Array(0);

  const [selectedItems, setSelectedItems] =
    useState<boolean[][]>(initialItemState);
  const [servicesState, setServices] = useState<Service[]>(services);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      peoples: 0,
      comment: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (selectedServices.filter((a) => a).length === 0) {
      toast({
        title: "Nenhum serviço foi selecionado",
        description: "Selecione pelo menos um serviço.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setLoading(true);

    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });

    const { name, address, eventDate, peoples, comment } = form.getValues();

    const order: Order = {
      name,
      address,
      eventDate: eventDate.toDateString(),
      peoples,
      services: [],
      comment,
    };

    selectedServices.forEach((flag, index) => {
      if (flag) {
        let service: Service = {
          name: services[index].name,
          items: [],
        };

        for (let i = 0; i < selectedItems[index].length; i++) {
          if (selectedItems[index][i]) {
            service.items.push(servicesState[index].items[i]);
          }
        }

        order.services.push(service);
      }
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
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <HeaderCompany {...company} />

      <div className="flex justify-center">
        <div className="w-11/12 max-w-2xl mt-9">
          <form
            className="space-y-10 mb-16"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Section
              title="Informações gerais"
              description="Forneça detalhes de você e do evento."
            >
              <Form {...form}>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Nome"
                            className="text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Endereço do evento"
                            className="text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="peoples"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="text-base"
                            placeholder="Quantidade de pessoas"
                            type="number"
                            {...field}
                            value={field.value === 0 ? "" : field.value}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal text-base",
                                  !field.value && " text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
                                ) : (
                                  <span className="text-base">
                                    Data do evento
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              locale={ptBR}
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date <= new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </Section>

            <Section
              title="Serviços"
              description="Selecione os serviços que deseja orçar."
            >
              <div className="desktop:flex desktop:flex-wrap desktop:justify-center">
                {services.map((service, index) => {
                  return (
                    <ServiceToggle
                      key={index}
                      title={service.name}
                      image={service.image}
                      enable={selectedServices[index]}
                      onClick={() => {
                        setSelectedIndex(index);
                        setModalView(true);
                      }}
                      total={selectedItems[index].filter((a) => a).length}
                      onCheckedChange={() => {
                        setSelectedServices((prev) => {
                          let newState = [...prev];
                          if (!newState[index]) {
                            setSelectedIndex(index);
                            setModalView(true);
                          } else {
                            setSelectedItems((prev) => {
                              let newState = [...prev];
                              newState[index].fill(false);
                              return newState;
                            });
                          }
                          newState[index] = !newState[index];
                          return newState;
                        });
                      }}
                    ></ServiceToggle>
                  );
                })}
              </div>
            </Section>

            <Section
              title="Observações"
              description="Deixe algumas observações, se necessário."
            >
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Escreve suas observações"
                          className="resize-none text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </Section>

            <Button
              disabled={loading}
              className="w-full"
              variant={"default"}
              type="submit"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
                <>
                  <span className="font-bold text-base">Finalizar</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      <Dialog
        open={modalView}
        onOpenChange={() => {
          if (selectedItems[selectedIndex].filter((a) => a).length == 0) {
            toast({
              title: "Nenhum item foi selecionado",
              description: "Selecione pelo menos um item.",
              variant: "destructive",
              duration: 3000,
            });
            setSelectedServices((prev) => {
              let newState = [...prev];
              newState[selectedIndex] = false;
              return newState;
            });
          }
          setModalView(!modalView);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{services[selectedIndex].name}</DialogTitle>
            <DialogDescription>
              Selecione os itens que deseja no seu evento.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-56">
            <div className="flex flex-wrap justify-center">
              {services[selectedIndex].items.map((item, index) => {
                return (
                  <Toggle
                    key={index}
                    className="m-1 texy-sm flex min-h-[35px] h-min"
                    variant="outline"
                    pressed={selectedItems[selectedIndex][index]}
                    onPressedChange={() => {
                      setSelectedItems((prev) => {
                        let newState = [...prev];
                        newState[selectedIndex][index] =
                          !newState[selectedIndex][index];
                        return newState;
                      });
                    }}
                  >
                    {selectedItems[selectedIndex][index] ? (
                      <BadgeCheck className="flex-shrink-0 mr-1 text-primary " />
                    ) : (
                      <></>
                    )}
                    <span className="">{item}</span>
                  </Toggle>
                );
              })}
            </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex justify-center space-x-4">
              <Input
                className="text-base"
                value={addItem}
                type="text"
                onChange={(e) => {
                  setAddItem(e.target.value);
                }}
                placeholder="Adicione um item"
              />
              <Button
                size={"icon"}
                onClick={() => {
                  setServices((prev) => {
                    let newState = [...prev];
                    let last = newState[selectedIndex].items.length;
                    newState[selectedIndex].items.push(addItem);
                    setSelectedItems((prevItems) => {
                      let newState = [...prevItems];
                      newState[selectedIndex][last] = true;
                      return newState;
                    });
                    setAddItem("");
                    return newState;
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

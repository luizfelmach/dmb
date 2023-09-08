"use client"
import { PdfDocument } from "@/components/pdf-document";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { pdf } from "@react-pdf/renderer";
import { Loader, Stars } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveAs } from "file-saver";


const formSchema = z.object({
    prompt: z.string()
});


export default function Home() {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        fetch("/api/ai", {
            method: "POST",
            body: JSON.stringify({ prompt: values.prompt }),
        })
            .then((response) => response.json())
            .then((data) => {

                const document = <PdfDocument budge={data} />;
                console.log(data)

                pdf(document)
                    .toBlob()
                    .then((blob) => {
                        saveAs(blob, `Orçamento.pdf`);
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false)
                    });
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            });
    }

    return (
        <div className="flex justify-center">
            <div className="w-11/12 max-w-2xl mt-9">

                <h1 className="font-bold text-3xl mb-8">Gere orçamentos</h1>

                <Form {...form}>
                    <form
                        className="space-y-10 mb-16"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >

                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Forneça detalhes do orçamento"
                                            className="h-96 text-base"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                    <Stars className="mr-2" />
                                    <span className="font-bold text-base">
                                        Gerar
                                    </span>
                                </>
                            )}
                        </Button>

                    </form>
                </Form>


            </div>
        </div >
    )
}
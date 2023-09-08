export function createPrompt(budget: string): string {
  return `
    O seu trabalho é pegar um texto tanscrito de uma pessoa falando e eu preciso que você interprete esse texto e gere um JSON em formato string.
    
    ME RETORNE APENAS O JSON EM FORMATO STRING.
    
    Eu preciso que você gere um JSON para mim com o seguinte schema. O schema especifica o que tem e o que é opcional. Ele está no formato de typescript.

    export type ServiceType = {
        label: string;
        items: string[];
      };
      
      export type BudgeType = {
        to: string
        guests: number;
        entry?: string;
        services: ServiceType[];
        comments: string[];
        price: number;
      };
    
    Texto transcrito:

    ${budget}

    ME RETORNE APENAS O JSON NO FORMATO STRING.
    `
}
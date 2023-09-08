export function createPrompt(budget: string): string {
    return `
    O seu trabalho é pegar um texto tanscrito e eu preciso que você interprete esse texto e gere um JSON em formato string.

    Corrija eventuais erros gramáticos e capitalize palavras se necessário. 
    
    ME RETORNE APENAS O JSON EM FORMATO STRING.
    
    Eu preciso que você gere um JSON para mim com o seguinte schema. O schema especifica o que tem e o que é opcional. Ele está no formato de typescript.
        
    Os serviços são algumas categorias de um Buffet. Por exemplo: Roda de Buteco, Jantar, Almoço, Bebidas, Equipe e entre muitos outros que podem estar em uma empresa de buffet. Cada serviço tem uma série de item.
    A entrada pode ser: salgadinhos, roda de boteco, e entre outros.

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
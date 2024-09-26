import { Ticket } from "@/models/models";

export const exampleTicket: Ticket = {
    id: "1", 
    area: "Recursos Humanos", 
    status: "Novo", 
    category: "suporte", 
    title: "exemplo de um cartão", 
    description: `With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.

    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.`,  
    dateOfCreation: new Date("2024-09-25T12:22:30"), 
    requesterId: "1"
}
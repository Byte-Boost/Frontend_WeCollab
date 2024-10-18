import { Ticket } from "@/models/models";

export const exampleTicket: Ticket = {
    id: "1",
    title: "Title",
    description: "Description",
    status: "Open",
    area: "Area",
    dateOfCreation: new Date(),
    requesterId: "1",
    Owner: {
        id: 1,
        name: "Owner"
    },
    Observers: [{
        id: "1",
        User: {
            name: "Owner",
            role: "",
            area: "",
            username: "",
            cpf: "",
            password: "",
            admin: false
        }
    }]
}
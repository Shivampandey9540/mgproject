import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("http://localhost:8080/v1")
  .setProject("6397017b8a0a41bdc2d5");

export const account = new Account(client);

//Database

export const databases = new Databases(client, "6397017b8a0a41bdc2d5");

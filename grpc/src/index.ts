import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./generated/a";
import { AddressBookServiceHandlers } from "./generated/AddressBookService";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const PERSONS = [
  {
    name: "Garvit",
    age: 20,
  },
  {
    name: "Pradyut",
    age: 20,
  },
];

const handlers: AddressBookServiceHandlers = {
  AddPerson(call, callback) {
    console.log(call);
    let person = {
      name: call.request.name,
      age: call.request.age,
    };
    PERSONS.push(person);
    callback(null, person);
  },
  GetPersonByName(call, callback) {
    const person = PERSONS.find((p) => p.name === call.request.name);
    if (person) {
      callback(null, person);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
};

const server = new grpc.Server();

server.addService(personProto.AddressBookService.service, handlers);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);

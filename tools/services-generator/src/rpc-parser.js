import fs from "fs";

class RpcParser {
  #protoPath = "";
  #services = [];
  constructor(protoPath) {
    this.#protoPath = protoPath;
  }

  parse() {
    fs.readdirSync(this.#protoPath).forEach((file) => {
      const proto = fs.readFileSync(`${this.#protoPath}/${file}`, "utf-8");
      this.#parseProtoFile(proto);
    });

    return this.#services;
  }

  #parseProtoFile(data) {
    const serviceMatches = [...data.matchAll(/service\s+(\w+)\s+{/g)];
    const serviceName = serviceMatches[0][1];
    const rpcMatches = [
      ...data.matchAll(/rpc\s+(\w+)\((\w+)\)\s+returns\s+\((\w+)\)/g),
    ];

    const service = {
      serviceName: serviceName.replace(/Service$/, ''),
      rpcList: [],
    };

    for (const item of rpcMatches) {
      service.rpcList.push({
        rpcName: item[1],
        rpcRequestType: item[2],
        rpcResponseType: item[3],
      });
    }

    this.#services.push(service);
  }
}

export default RpcParser;

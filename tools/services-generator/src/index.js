import fs from "fs";
import Handlebars from "./handlebars-wrapper.js";
import RpcParser from "./rpc-parser.js";

const main = (args) => {
  const [templatesDir, protoDir, destDir] = args;
  const parser = new RpcParser(protoDir);
  const services = parser.parse();

  const serviceTemplateText = fs.readFileSync(
    `${templatesDir}/service.js.hbs`,
    "utf-8"
  );
  const serviceTypesTemplateText = fs.readFileSync(
    `${templatesDir}/service_types.d.ts.hbs`,
    "utf-8"
  );
  const serviceTemplate = Handlebars.compile(serviceTemplateText);
  const serviceTypeTemplate = Handlebars.compile(serviceTypesTemplateText);
  const serviceFileTemplate = Handlebars.compile('{{snakeCase serviceName}}_service.js');
  const serviceTypeFileTemplate = Handlebars.compile('{{snakeCase serviceName}}_service.d.ts');

  for (const service of services) {
    const serviceFileName = serviceFileTemplate(service);
    const serviceFileTypeName = serviceTypeFileTemplate(service);
    const serviceCodeGenerated = serviceTemplate(service);
    const serviceCodeTypeGenerated = serviceTypeTemplate(service);

    fs.writeFileSync(`${destDir}/${serviceFileName}`, serviceCodeGenerated);
    fs.writeFileSync(`${destDir}/${serviceFileTypeName}`, serviceCodeTypeGenerated);
  }
};

main(process.argv.slice(2));

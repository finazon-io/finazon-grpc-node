const { credentials, Metadata } = require('@grpc/grpc-js');
const { DatasetsRequest } = require('@finazon/finazon-grpc-node/datasets_pb');
const { DatasetsServiceClient } = require('@finazon/finazon-grpc-node/datasets_grpc_pb');

const HOST ='grpc-latest.finazon.io:443'
const API_KEY = 'your_api_key';

const datasetsService = new DatasetsServiceClient(HOST, credentials.createSsl());

const request = new DatasetsRequest();
request.setCode('sip_non_pro');

const meta = new Metadata();
meta.set('authorization', `Bearer ${API_KEY}`);

datasetsService.getDatasets(request, meta, (err, value) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(JSON.stringify(value.toObject(), null, 2));
});

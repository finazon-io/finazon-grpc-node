const { credentials, Metadata } = require('@grpc/grpc-js');
const { TimeSeriesRequest } = require('@finazon/finazon-grpc-node/time_series_pb');
const { TimeSeriesServiceClient } = require('@finazon/finazon-grpc-node/time_series_grpc_pb');

const HOST ='grpc-latest.finazon.io:443'
const API_KEY = 'your_api_key';

const timeSeriesService = new TimeSeriesServiceClient(HOST, credentials.createSsl());

const request = new TimeSeriesRequest();
request.setDataset('sip_non_pro');
request.setTicker('AAPL');

const meta = new Metadata();
meta.set('authorization', `Bearer ${API_KEY}`);

timeSeriesService.getTimeSeries(request, meta, (err, value) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(JSON.stringify(value.toObject(), null, 2));
});

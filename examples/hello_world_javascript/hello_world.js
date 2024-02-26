const { GetTimeSeriesRequest } = require('@finazon/finazon-grpc-node/time_series_pb');
const { TimeSeriesService } = require('@finazon/finazon-grpc-node/time_series_service');

const API_KEY = 'your_api_key';

const service = new TimeSeriesService(API_KEY);

const request = new GetTimeSeriesRequest();
request.setDataset('sip_non_pro');
request.setTicker('AAPL');

service.getTimeSeries(request, (err, value) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(JSON.stringify(value.toObject(), null, 2));
});

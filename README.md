# Finazon node client for grpc

Official Node library for Finazon. This package supports all main features of the service:
 - Get datasets, publishers, markets, tickers list
 - Get market data (ticker snapshot, time series, trades, technical indicators)
 - Get dataset specific data (Benzinga, Binance, Crypto, Forex, SEC, SIP)
 - Javascript and Typescript both supported

**API key** is required. If you don't have it yet, get it by signing up [here](https://finazon.io/).

## Installation

You'll need to have Node 18.0.0 or later version on your local development machine. We recommend using the latest LTS version. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

### npm

```bash
npm install @finazon/finazon-grpc-node --save
```

### yarn

```bash
yarn add @finazon/finazon-grpc-node
```

Npm package: https://www.npmjs.com/package/@finazon/finazon-grpc-node


## Quick Start

### 1. Create a new project and install required dependencies
```bash
mkdir hello-finazon && cd hello-finazon
npm init -y
npm install --save-dev @grpc/grpc-js @finazon/finazon-grpc-node
```

### 2. Create hello-world.js script

```javascript
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

```

### 3. Set correct api key into API_KEY varaible

### 4. Run example

```bash
node hello-world.js
```

Example output:
```json
{
  "resultList": [
    {
      "code": "sip_non_pro",
      "name": "Real-Time Stock API: Stock Market Data"
    }
  ]
}
```

You can find this example [here](https://github.com/finazon-io/finazon-grpc-node/tree/main/examples/hello_world_javascript)


## Supported rpc list

| Service           | rpc                     | Description                                   |
|-------------------|-------------------------|-----------------------------------------------|
| ApiUsageService   | GetApiUsage             | Get a list of products with quota limit/usage |
| BenzingaService   | GetDividentsCalendar    | Returns the dividends calendar from Benzinga  |
| BenzingaService   | GetEarningsCalendar     | Returns the earnings calendar from Benzinga   |
| BenzingaService   | GetIPO                  | Returns IPO data from Benzinga                |
| BenzingaService   | GetNews                 | Returns the news articles from Benzinga       |
| BinanceService    | GetTimeSeries           | Get time series data without technical indicators |
| DatasetsService   | GetDatasets             | Get a list of all datasets available at Finazon |
| ExchangeService   | GetMarketsCrypto        | Returns a list of supported crypto markets    |
| ExchangeService   | GetMarketsStocks        | Returns a list of supported stock markets      |
| PublisherService  | GetPublishers           | Get a list of all publishers available at Finazon |
| SecService        | GetFilings              | Real-time and historical access to all forms, filings, and exhibits directly from the SEC’s EDGAR system |
| SipService        | GetMarketCenter         | Returns a list of market centers              |
| SipService        | GetTrades               | Returns detailed information on trades executed through the Securities Information Processor (SIP) |
| SnapshotService   | GetSnapshot             | This endpoint returns a combination of different data points, such as daily performance, last quote, last trade, minute data, and previous day performance |
| TickersService    | FindTickersCrypto       | This API call returns an array of crypto tickers available at Finazon Data API. This list is updated daily |
| TickersService    | FindTickersForex        | This API call returns an array of forex tickers available at Finazon Data API. This list is updated daily |
| TickersService    | FindTickersStocks       | This API call returns an array of stocks tickers available at Finazon Data API. This list is updated daily |
| TimeSeriesService | GetTimeSeries           | Get time series data without technical indicators |
| TimeSeriesService | GetTimeSeriesAtr        | Get time series data for ATR technical indicator |
| TimeSeriesService | GetTimeSeriesBBands     | Get time series data for BBands technical indicator |
| TimeSeriesService | GetTimeSeriesIchimoku   | Get time series data for Ichimoku technical indicator |
| TimeSeriesService | GetTimeSeriesMa         | Get time series data for Ma technical indicator |
| TimeSeriesService | GetTimeSeriesMacd       | Get time series data for Macd technical indicator |
| TimeSeriesService | GetTimeSeriesObv        | Get time series data for Obv technical indicator |
| TimeSeriesService | GetTimeSeriesRsi        | Get time series data for Rsi technical indicator |
| TimeSeriesService | GetTimeSeriesSar        | Get time series data for Sar technical indicator |
| TimeSeriesService | GetTimeSeriesStoch      | Get time series data for Stoch technical indicator |
| TradeService      | GetTrades               | Returns general information on executed trades |


You can import `client` and `request` objects for `ServiceName` and `RpcName` like this:

<pre>
const { <b>ServiceName</b>ServiceClient } = require('@finazon/finazon-grpc-node/<b>service_name</b>_grpc_pb');
const { <b>RpcName</b>Request } = require('@finazon/finazon-grpc-node/<b>rpc_name</b>_pb');

// ...

const service = new <b>ServiceName</b>ServiceClient('grpc-latest.finazon.io:443', credentials.createSsl());
const request = new <b>RpcName</b>Request();
service.<b>RpcName</b>(request, meta, (err, value) => {});
</pre>

## Documentation

You can find instructions and many tips in its [documentation](https://finazon.io/docs).

## Usage Examples

See [examples](https://github.com/finazon-io/finazon-grpc-node/tree/main/examples) folder in this repo.


## Support

Visit our official website [contact page](https://finazon.io/contact-sales) or [support center](https://support.finazon.io/en/).

## Announcements

Follow us on [𝕏](https://twitter.com/finazon_io) for announcements and updates about this library.

## Contributing

1. Clone repo and create a new branch: `$ git clone https://github.com/finazon-io/finazon-grpc-node.git`.
2. Create a new branch: `$ cd finazon-grpc-node && git checkout -b some-branch`.
2. Make changes and test.
3. Submit Pull Request with comprehensive description of changes.

More info about contributing you can find [GitHub Docs](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)

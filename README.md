
# Finazon Node gRPC Client

This is the official Node.js library for Finazon, offering access to:
- Lists of datasets, publishers, markets, and tickers.
- Market data: ticker snapshots, time series, trades, and technical indicators.
- Data from specific datasets such as Benzinga, Binance, Crypto, Forex, SEC, and SIP.
- Full compatibility with both JavaScript and TypeScript.

🔑 **API key** is essential. If you haven't got one yet, [sign up here](https://finazon.io/).

## Installation requirements
Ensure you have Node.js v18.0.0 or later. We recommend the latest LTS version. Use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) for Node version management across projects.

### Using npm
```bash
npm install @finazon/finazon-grpc-node --save
```

### Using yarn
```bash
yarn add @finazon/finazon-grpc-node
```

🔗 View the package on [npm](https://www.npmjs.com/package/@finazon/finazon-grpc-node).

## Quick start

### 1. Set up a new project
```bash
mkdir hello-finazon && cd hello-finazon
npm init -y
npm install --save-dev @grpc/grpc-js @finazon/finazon-grpc-node
```

### 2. Create `hello-world.js` script

```javascript
const { credentials, Metadata } = require('@grpc/grpc-js');
const { GetTimeSeriesRequest } = require('@finazon/finazon-grpc-node/time_series_pb');
const { TimeSeriesServiceClient } = require('@finazon/finazon-grpc-node/time_series_grpc_pb');

const HOST ='grpc-latest.finazon.io:443'
const API_KEY = 'your_api_key';

const timeSeriesService = new TimeSeriesServiceClient(HOST, credentials.createSsl());

const request = new GetTimeSeriesRequest();
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

```

### 3. Input your API key
Replace `'your_api_key'` with your actual key.

### 4. Run the example
```bash
node hello-world.js
```
📝 Expected output:
```json5
{
  "resultList": [
    {
      "timestamp": 1698438120,
      "open": 167.85,
      "close": 167.83,
      "high": 167.91,
      "low": 167.83,
      "volume": 2020
    },
    {
      "timestamp": 1698436740,
      "open": 168.095,
      "close": 168.22,
      "high": 168.34,
      "low": 168.06,
      "volume": 7874313
    },
    // ...
    {
      "timestamp": 1698435060,
      "open": 168.07,
      "close": 167.965,
      "high": 168.1,
      "low": 167.96,
      "volume": 131572
    }
  ]
}
```

👀 Check the full example [here](https://github.com/finazon-io/finazon-grpc-node/tree/main/examples/hello_world_javascript).

## RPC support

The following table outlines the supported rpc calls:
<!--rpc_table_boundary-->
| Service              | rpc                       | Description                                        |
|----------------------|---------------------------|----------------------------------------------------|
| ApiUsageService      | getApiUsage               | Get a list of products with quota limit/usage      |
| BenzingaService      | getDividentsCalendar      | Returns the dividends calendar from Benzinga       |
| BenzingaService      | getEarningsCalendar       | Returns the earnings calendar from Benzinga        |
| BenzingaService      | getNews                   | Returns the news articles from Benzinga            |
| BenzingaService      | getIPO                    | Returns IPO data from Benzinga                     |
| BinanceService       | getTimeSeries             | Get time series data without technical indicators  |
| DatasetsService      | getDatasets               | Get a list of all datasets available at Finazon    |
| ExchangeService      | getMarketsCrypto          | Returns a list of supported crypto markets         |
| ExchangeService      | getMarketsStocks          | Returns a list of supported stock markets          |
| PublisherService     | getPublishers             | Get a list of all publishers available at Finazon  |
| SecService           | getFilings                | Real-time and historical access to all forms, filings, and exhibits directly from the SEC's EDGAR system |
| SipService           | getTrades                 | Returns detailed information on trades executed through the Securities Information Processor (SIP) |
| SipService           | getMarketCenter           | Returns a list of market centers                   |
| SnapshotService      | getSnapshot               | This endpoint returns a combination of different data points, such as daily performance, last quote, last trade, minute data, and previous day performance |
| TickersService       | findTickersStocks         | This API call returns an array of stocks tickers available at Finazon Data API. This list is updated daily |
| TickersService       | findTickersCrypto         | This API call returns an array of crypto tickers available at Finazon Data API. This list is updated daily |
| TickersService       | findTickersForex          | This API call returns an array of forex tickers available at Finazon Data API. This list is updated daily |
| TickersService       | findTickerUS              | This API call returns an array of US tickers available at Finazon Data API. This list is updated daily |
| TimeSeriesService    | getTimeSeries             | Get time series data without technical indicators  |
| TimeSeriesService    | getTimeSeriesAtr          | Get time series data for ATR technical indicator   |
| TimeSeriesService    | getTimeSeriesBBands       | Get time series data for BBands technical indicator |
| TimeSeriesService    | getTimeSeriesIchimoku     | Get time series data for Ichimoku technical indicator |
| TimeSeriesService    | getTimeSeriesMa           | Get time series data for Ma technical indicator    |
| TimeSeriesService    | getTimeSeriesMacd         | Get time series data for Macd technical indicator  |
| TimeSeriesService    | getTimeSeriesObv          | Get time series data for Obv technical indicator   |
| TimeSeriesService    | getTimeSeriesRsi          | Get time series data for Rsi technical indicator   |
| TimeSeriesService    | getTimeSeriesSar          | Get time series data for Sar technical indicator   |
| TimeSeriesService    | getTimeSeriesStoch        | Get time series data for Stoch technical indicator |
| TradeService         | getTrades                 | Returns general information on executed trades     |
<!--rpc_table_boundary-->
Here's how you can import `client` and `request` objects:

```javascript
const { ServiceNameServiceClient } = require('@finazon/finazon-grpc-node/service_name_grpc_pb');
const { RpcNameRequest } = require('@finazon/finazon-grpc-node/service_name_pb');

// ...

const service = new ServiceNameServiceClient('grpc-latest.finazon.io:443', credentials.createSsl());
const request = new RpcNameRequest();
service.rpcName(request, meta, (err, value) => {});
```

## Documentation
Delve deeper with our [official documentation](https://finazon.io/docs).

## Examples
Explore practical scenarios in the [examples](https://github.com/finazon-io/finazon-grpc-node/tree/main/examples) directory.

## Support
- 🌐 Visit our [contact page](https://finazon.io/contact-sales).
- 🛠 Or our [support center](https://support.finazon.io/en/).

## Stay updated
- Follow us on [𝕏](https://twitter.com/finazon_io).
- Join our community on [Discord](https://discord.gg/D5u4ZpB7w7).
- Follow us on [LinkedIn](https://www.linkedin.com/company/finazon).

## Contributing
1. Fork and clone: `$ git clone https://github.com/finazon-io/finazon-grpc-node.git`.
2. Branch out: `$ cd finazon-grpc-node && git checkout -b my-feature`.
3. Commit changes and test.
4. Push your branch and open a pull request with a comprehensive description.

For more guidance on contributing, see the [GitHub Docs](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) on GitHub.

## License

This project is licensed under the MIT License. See the `LICENSE.txt` file in this repository for more details.

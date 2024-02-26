const { FindTickersCryptoRequest } = require('@finazon/finazon-grpc-node/tickers_pb');
const { TickersService } = require('@finazon/finazon-grpc-node/tickers_service');

const API_KEY = ""; // set your api_key here

const main = async () => {
    if (API_KEY.length === 0) {
        console.error('Please set correct api key into API_KEY variable');
        return;
    }

    console.log('reading tickers crypto...');
    const tickers = await getTickersCrypto('$ADS/ETH');
    console.log(JSON.stringify(tickers.toObject(), null, 2));
};

const getTickersCrypto = async (ticker) => {
    const tickersService = new TickersService(API_KEY);

    const request = new FindTickersCryptoRequest();
    if (ticker) {
        request.setTicker(ticker);
    }

    const result = await new Promise((resolve, reject) => {
        tickersService.findTickersCrypto(request, (err, value) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(value);
        })
    });

    return result;
};

main();

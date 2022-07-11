export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;


export const fearAPIstat= `https://api.alternative.me/fng/?limit=100&date_format=us`;

const newsAPIKey = "914441331d294fb49e4fa1b85ca239ac"

export const NewsAPI=(newstitle)=> `https://newsapi.org/v2/everything?q=${newstitle}&from=2022-06-10&sortBy=publishedAt&language=en&pageSize=10&apiKey=${newsAPIKey}`;


export const fearAPI=(date)=> `https://alternative.me/images/fng/crypto-fear-and-greed-index-${date}.png`;


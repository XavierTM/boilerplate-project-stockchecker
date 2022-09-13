'use strict';

const axios = require("axios");

const stocks = {}

module.exports = function (app) {

	app.route('/api/stock-prices')

		.get(async function (req, res){

			const { stock , like} = req.query;
			const ipAddress = req.socket.remoteAddress;


			try {
				
				if (Array.isArray(stock)) {

					const [ first, second ] = stock;

					if (like) {
						likeStock(first, ipAddress);
						likeStock(second, ipAddress);
					}

					const firstPrice = await getStockPrice(first);
					const secondPrice = await getStockPrice(second);

					const firstLikes = await getStockLikes(first);
					const secondLikes = await getStockLikes(second);

					res.send({
						stockData: [
							{
								stock: first,
								price: firstPrice,
								rel_likes: firstLikes - secondLikes
							},
							{
								stock: second,
								price: secondPrice,
								rel_likes: secondLikes - firstLikes
							}
						]
					})

				} else {

					if (like) {
						likeStock(stock, ipAddress);
					}

					const price = await getStockPrice(stock);
					const likes = getStockLikes(stock);

					return res.send({
						stockData: { stock, price, likes }
					});
				}

				

			} catch (err) {
				
			}

			
		});

		
};


async function getStockPrice(stock) {

	const response = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
	const data = response.data;

	const { latestPrice: price } = data;

	return price;

}


function getStockLikes(stock) {
	const stockObject = stocks[stock];

	if (stockObject)
		return stockObject.likes;

	return 0;

}

function likeStock(stock, ipAddress) {
	
	let stockObject = stocks[stock];

	if (!stockObject) {
		stocks[stock] = { likes: 0, ips: new Set };
		stockObject = stocks[stock];
	}

	if (!stockObject.ips.has(ipAddress)) {
		stockObject.likes++;
		stockObject.ips.add(ipAddress)
	}

	

	
}

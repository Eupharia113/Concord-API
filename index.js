const req = require('requestify')
const basePublicUrl = 'https://www.cxd.network/api/public/v1/'
var cachedPrices = [] /* Temporary solution until i properly learn Promises/Callbacks! Please do a pull-request if you can fix this. <3 */
/* cachedProfiles = [] */

exports.price = function (coin) {
  if (coin && coin != null && typeof coin === 'string' && coin.length >= 2) {
    checkPrice(coin)
  } else {
    console.warn('String variable missing, "' + typeof coin + ' - ' + coin + '" was recieved')
    return
  }
  if (cachedPrices.length >= 1) {
    for (var ii = 0; ii < cachedPrices.length; ii++) {
      if (cachedPrices[ii].coin === coin.toLowerCase()) {
        if (cachedPrices[ii].price !== undefined && cachedPrices[ii].price >= 0.00000001) {
          /* console.log(cachedPrices[ii].price); */
          return cachedPrices[ii].price
        } else {
          console.warn('API Response could not be parsed, Concord REST API may be down, or your input of "' + coin.toUpperCase() + '" is an incorrect Ticker')
        }
      }
    }
  } else {
    return console.log('Cache has not loaded correctly, please use the connect() function to refresh cache')
  }
}
exports.connect = function () { /* This exists to help with starter-caching of CXD Service API data, as i am currently unable to correctly return data from this module to a dev's main script :( */
  try {
    req.get(basePublicUrl + 'getprice?coin=ic').then(function (res) {
      var price = Number(res.body)
      if (price > 0 && price !== undefined) {
        if (cachedPrices.length === 0) {
          cachedPrices.push({coin: 'ic', price: price}) /* If coin isn't already cached, cache it! */
        }
        console.log('CXDx Prices cached... Services are Ready')
      }
    })
  } catch (err) {
    console.warn('API Request failed, error: ' + err)
  }
}

/* None-Sandboxed functions */
function checkPrice (coin) {
  try {
    req.get(basePublicUrl + 'getprice?coin=' + coin.toLowerCase()).then(function (res) {
      var price = Number(res.body)
      if (price >= 0.00000001 && price !== undefined) {
        if (cachedPrices.length > 0) {
          var i, /* eslint-disable-line */
            iLength = cachedPrices.length
          for (i = 0; i < iLength; i++) {
            if (cachedPrices[i].coin === coin.toLowerCase()) {
              cachedPrices[i].price = price /* If coin is already cached, update the cache! */
            }
          }
        } else {
          cachedPrices.push({coin: 'ic', price: price}) /* If coin isn't already cached, cache it! */
        }
      } else {
        console.warn('API Response could not be parsed, Concord REST API may be down, or your input of "' + coin.toUpperCase() + '" is an incorrect Ticker')
      }
    })
  } catch (err) {
    console.warn('API Request failed, error: ' + err)
  }
}

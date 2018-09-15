const req = require('requestify')
const basePublicUrl = 'https://www.cxd.network/api/public/v1/'
var lastPrice = 0,
  lastCoin = '',
  user = {discordID: '', discordUsername: '', balance: 0}

exports.price = async function (coin) {
  if (coin && coin != null && typeof coin === 'string' && coin.length >= 2) {
    try {
      var price = await req.get(basePublicUrl + 'getprice?coin=' + coin.toLowerCase())
      price = Number(price.body)
      if (price <= 0 || price === NaN || price === null || price === undefined) {
        throw 'Price returned for ' + coin + ' is not a number, you may have entered an incorrect ticker'
      }
      lastPrice = price
      lastCoin = coin
      return price
    } catch (err) {
      if (err.body) {
        console.log('ConcordAPI Error caught: (' + err.body + ')')
      } else {
        console.log('ConcordAPI Error caught: (' + err + ')')
      }
      if (lastCoin === coin) {
        return lastPrice
      } else {
        return 0
      }
    }
  } else {
    console.warn('String variable missing, "' + typeof coin + ' - ' + coin + '" was recieved')
  }
}

exports.getBalance = async function (discordID) {
  if (discordID && discordID != null && typeof discordID === 'string' && discordID.length === 18) {
    try {
      var balance = await req.get(basePublicUrl + 'getprofile?id=' + discordID)
      balance = Number((Number(JSON.parse(balance.body).balance) - 0.00000001).toFixed(8))
      return balance
    } catch (err) {
      if (err.body) {
        console.log('ConcordAPI Error caught: (' + err.body + ')')
      } else {
        console.log('ConcordAPI Error caught: (' + err + ')')
      }
    }
  } else if (typeof discordID !== 'string') {
    console.warn('String variable missing, "' + typeof discordID + ' - ' + discordID + '" was recieved')
  } else {
    console.warn('Invalid parameters, please ensure discordID is 18 characters long and is the correct format: string')
  }
}

exports.getUser = async function (discordID) {
  if (discordID && discordID != null && typeof discordID === 'string' && discordID.length === 18) {
    try {
      var data = await req.get(basePublicUrl + 'getprofile?id=' + discordID)
      let userData = user
      userData.balance = Number((Number(JSON.parse(data.body).balance) - 0.00000001).toFixed(8))
      userData.discordID = discordID
      userData.discordUsername = JSON.parse(data.body).username
      return userData
    } catch (err) {
      if (err.body) {
        console.log('ConcordAPI Error caught: (' + err.body + ')')
      } else {
        console.log('ConcordAPI Error caught: (' + err + ')')
      }
    }
  } else if (typeof discordID !== 'string') {
    console.warn('String variable missing, "' + typeof discordID + ' - ' + discordID + '" was recieved')
  } else {
    console.warn('Invalid parameters, please ensure discordID is 18 characters long and is the correct format: string')
  }
}

var WAValidator = require('wallet-address-validator');
 
let Cryptos = ["ETH", "BTC", "LTC"];
/** 
* @namespace getCoinName
* @Returns a pair from 2 addreses 
* @param {String} address1 - Address
* @param {String} address2 - Address
* @param {Array} Cryptos - Array containing UPERCASE coin symbols 
 */ 

function findCoinName(Cryptos, address) {
    let coinName
    Cryptos.forEach(symbol => {
        let test = WAValidator.validate(address, symbol)
        if(test) coinName = symbol;
    });
    return coinName;
}

function getCoinName(address1, address2, Cryptos) {

    let coin1 = findCoinName( Cryptos, address1);
    let coin2 = findCoinName(Cryptos, address2);
    
    // finds and returns a pair 
    function findPair(address1, address2){

        //check if its BTC market
        if(address1 == "BTC")
        {
            let pair = {
            address1,
            address2,
            "pair":`${address1}-${address2}`
        }
            return pair

        }
        else if(address2 == "BTC")
        {
            let pair =  {
                address1,
                address2,
                "pair": `${address2}-${address1}`
            }
            return pair
        }
        //check if its ETH market
        else if(address1 == "ETH")
        {   
            let pair =  {
                address1,
                address2,
                "pair": `${address1}-${address2}`
            };
            return pair
        }
        else if (address2 == "ETH")
        {   
            let pair = {
                address1,
                address2,
                "pair": `${address2}-${address1}`
            };
            return pair
        }
        //check if its XMR market
        else if(address1 == "XMR")
        {   
            let pair = {
                address1,
                address2,
                "pair": `${address1}-${address2}`
            };
            return pair
        }
        else if (address2 == "XMR")
        {   
            let pair = {
                address1,
                address2,
                "pair": `${address2}-${address1}`
            };
            return pair
        }
    }
    let pair = findPair(coin1, coin2);
    return pair
}


module.exports = getCoinName
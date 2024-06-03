import BigNumber from 'bignumber.js';

// convert ethereuem tokens  in readable format
export function convertToReadable(amountInMinUnits, decimals = 18) {
    const amount = new BigNumber(amountInMinUnits);
    const divisor = new BigNumber(10).pow(decimals);
    return amount.dividedBy(divisor).toFixed();  
}



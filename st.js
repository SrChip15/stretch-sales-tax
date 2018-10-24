let taxes = {
  rates: {
    AB: 0.05,
    BC: 0.12,
    SK: 0.10
  },

  computeTaxes: function (province, totalSales) {
    return this.rates[province] * totalSales;
  }
};

let companySalesData = [{
    name: "Telus",
    province: "BC",
    sales: [100, 200, 400]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [80, 20, 10, 100, 90, 500]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [500, 100]
  }
];

// make new property name 'totalSales' in companySalesData object (side-effect)
function aggregateSales() {
  for (let company in companySalesData) {
    let totalSales = 0;
    // console.log(`${company} -> ${companySalesData[company].name}`);

    companySalesData[company].sales.forEach(sales => {
      totalSales += sales;
    });
    companySalesData[company].totalSales = totalSales;
  }
}

function calculateSalesTax(salesData, taxRates) {
  // Implement your code here
  let telus = {};
  let bombardier = {};

  aggregateSales();

  for (var company in salesData) {
    let name = salesData[company].name; 
    let totalSales = salesData[company].totalSales;

    let totalTaxes = taxes.computeTaxes(salesData[company].province, totalSales);

    if (name === 'Telus') {
      telus.totalSales = telus.totalSales == undefined ? totalSales : telus.totalSales += totalSales;
      telus.totalTaxes = telus.totalTaxes == undefined ? totalTaxes : telus.totalTaxes += totalTaxes;
    } else {
      bombardier.totalSales = bombardier.totalSales == undefined ? totalSales : bombardier.totalSales += totalSales;
      bombardier.totalTaxes = bombardier.totalTaxes == undefined ? totalTaxes : bombardier.totalTaxes += totalTaxes;
    }
  }

  // console.log({telus, bombardier});
  return {telus, bombardier};
}

console.log(calculateSalesTax(companySalesData));


// console.log(taxes.computeTaxes('AB', 1000)); WORKS
// console.log(companySalesData);
// var results = calculateSalesTax(companySalesData, salesTaxRates);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/
// async function buildMarquee() {
//   const numberOfCompaniesToShow = 100;
//   const getCompaniesRequestUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/sp500_constituent `;

//   const companiesResponse = await fetch(getCompaniesRequestUrl);
//   const companies = await companiesResponse.json();
//   for (let i = 0; i < numberOfCompaniesToShow; i++) {
//     const stockName = companies[i].symbol;
//     addPriceToCompanyName(stockName, i);
//     const html = `<div data-id='${i}'>
//                         <span class='stock-name'>
//                             ${stockName}
//                         </span>
//                  </div>`;
//     const marqueeElement = document.getElementById("marqueeRes");
//     marqueeElement.insertAdjacentHTML("beforeend", html);
//   }
// }
// buildMarquee();

// async function addPriceToCompanyName(companySymbol, elementId) {
//   const basePriceUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`;
//   const companyResponse = await fetch(basePriceUrl);
//   const companyInfo = await companyResponse.json();
//   const price = companyInfo?.profile?.price || "";
//   const parentElement = document.querySelector(
//     `#marqueeRes div[data-id="${elementId}"]`
//   );
//   const html = `<span class="company-price">${price}</span>`;
//   parentElement.insertAdjacentHTML("beforeend", html);
// }





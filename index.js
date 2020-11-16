// const button = document.getElementById("searchButton");
// const input = document.getElementById("searchInput");
// const result = document.getElementById("result");
// const spinner = document.getElementById("spinner");
// const searchParams = new URLSearchParams(window.location.search);
// const symbol = searchParams.get("symbol");
// // const y=document.getElementById("marquee");
// const marqueeRes = document.getElementById("marquee");

// button.addEventListener("click", stockCompaniesSearch);
// function stockCompaniesSearch() {
//   toggleSpinner(true);
//   fetch(
//     `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       toggleSpinner(false);
//       for (let i = 0; i < response.length; i++) {
//         const link = document.createElement("a");
//         link.id = response[i].symbol;
//         link.href = `/js-project-2-Barry992/company.html?symbol=${response[i].symbol}`;
//         link.innerHTML = `<img id="${response[i].symbol}img">${response[i].name}(${response[i].symbol})<div id="${response[i].symbol}percent"></div>`;
//         callWithSymbol(response[i].symbol);
//         link.setAttribute("target", "_blank");

//         result.appendChild(link);
//       }
//     });
// }

// function toggleSpinner() {
//   spinner.classList.toggle("hide");
// }

// function callWithSymbol(symbol) {
//   fetch(
//     `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (body) {
//       let data = body.profile;
//       let image = document.getElementById(`${symbol}img`);
//       image.setAttribute("src", data.image);
//       let color;
//       if (data.changesPercentage.includes(`-`)) {
//         color = `red`;
//       } else {
//         color = `green`;
//       }
//       let percentElement = document.getElementById(`${symbol}percent`);
//       percentElement.innerHTML =
//         `  <div style="color:${color} ">` + data.changesPercentage + `</div>`;
//     });
// }

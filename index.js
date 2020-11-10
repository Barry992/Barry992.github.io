const button = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const result = document.getElementById("result");
const spinner = document.getElementById("spinner");

button.addEventListener("click", search);
function search() {
  toggle();
  fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`
  )
    .then(function (response) {
      toggle();

      return response.json();
    })
    .then(function (body) {
      console.log(body);
      for (let i = 0; i < body.length; i++) {
        const link = document.createElement("a");
        link.id = body[i].symbol;
        link.href = `/js-project-2-Barry992/company.html?symbol=${body[i].symbol}`;
        link.innerHTML = `<img id="${body[i].symbol}img">${body[i].name}(${body[i].symbol})<div id="${body[i].symbol}percent"></div>`;
        callWithSymbol(body[i].symbol);
        link.setAttribute("target", "_blank");

        result.appendChild(link);
        
      }
    });
}

function toggle() {
  spinner.classList.toggle("hide");
}



function callWithSymbol(symbol) {
  fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
  ).then(function (response) {
      //   console.log(response);
      return response.json();
    })
    .then(function (body) {
      //   console.log(body.profile);
      let data = body.profile;
      console.log(data);
      let image = document.getElementById(`${symbol}img`);
      image.setAttribute("src", data.image);
      let color;
      if( data.changesPercentage.includes(`-`)){
        color = `red`;
      }else{
        color = `green`;
      }
      let percentElement = document.getElementById(`${symbol}percent`);
      percentElement.innerHTML =`  <div style="color:${color} ">` + data.changesPercentage+`</div>`;
    });
}
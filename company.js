/// get query param (symbol)
const header = document.getElementById("header");
const companyName = document.getElementById("name");
const stock = document.getElementById("stock");
const price = document.getElementById("price");
const description = document.getElementById("description");
// const chart = document.getElementById("chart");
const searchParams = new URLSearchParams(window.location.search);
const symbol = searchParams.get("symbol");


// console.log("symbol", symbol);

// call api with the value of symbol
function callWithSymbol() {
  fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
  )
    .then(function (response) {
      //   console.log(response);
      return response.json();
    })
    .then(function (body) {
      //   console.log(body.profile);
      let data = body.profile;
      console.log(data);
      const image = document.createElement("img");
      image.setAttribute("src", data.image);
      header.appendChild(image);
      companyName.innerHTML = data.companyName;
      let color;
      let percent = document.getElementById("percent");
      percent=data.changesPercentage;
      if( data.changesPercentage.includes(`-`)){
        color = `red`;
      }else{
        color = `green`;
      }

      stock.innerHTML = "Stock price :$" + data.price + `  <div style="color:${color} ">` + percent+`</div>`;
      description.innerHTML = data.description;
    });
}

callWithSymbol();
let historyData = async () => {
  // }
  // async function history() {
  let response = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
  );
  let responseJson = await response.json();
  let data = responseJson.historical;
  return data;
};

async function chart() {
  let newArr = await historyData();
  // console.log('newArr :>> ', newArr);


console.log(typeof(  newArr.map(element => element.close)
));
  


  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: newArr.map(element => element.date),
      datasets: [
        {
          label: "# of Votes",
          data: newArr.map(element => element.close),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
chart();

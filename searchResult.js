class SearchResult {
  constructor(element) {
    this.element = element;
  }
  renderResults(items = []) {
    for (let item of items) {
      const link = document.createElement("a");
      link.id = item.symbol;
      link.href = `/js-project-2-Barry992/company.html?symbol=${item.symbol}`;
      link.innerHTML = `<img id="${item.symbol}img">${item.name}(${item.symbol})<div id="${item.symbol}percent"></div>`;
      this.callWithSymbol(item.symbol);
      link.setAttribute("target", "_blank");

      this.element.appendChild(link);
    }
  }
  toggleSpinner() {
    spinner.classList.toggle("hide");
  }
  callWithSymbol(symbol) {
    this.toggleSpinner();
    fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        this.toggleSpinner();

        let data = body.profile;
        console.log("data", data);
        let image = document.getElementById(`${symbol}img`);
        image.setAttribute("src", data?.image);
        let color;
        if (data.changesPercentage.includes(`-`)) {
          color = `red`;
        } else {
          color = `green`;
        }
        let percentElement = document.getElementById(`${symbol}percent`);
        percentElement.innerHTML =
          `  <div style="color:${color} ">` + data.changesPercentage + `</div>`;
      }.bind(this));
  }
}

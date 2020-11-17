class SearchResult {
  constructor(element) {
    this.element = element;
  }
  highlightText(str, value) {
    value = value.toLowerCase();
    let text = str.toLowerCase();
    let start = text.indexOf(value);
    let end = start + value.length;
    console.log(start,start + end,str);
    console.log(str.slice(start, start + end));
    console.log(str.slice(0, start));
    console.log(str.slice(end));

    return (
      str.slice(0, start) +
      '<span class="mark">' +
      str.slice(start,end) +
      "</span>" +
      str.slice(end)
    );
  }
  renderResults(items = [], value) {
    this.element.innerHTML = ''
    for (let item of items) {
      const link = document.createElement("a");
      link.id = item.symbol;
      value = value.toLowerCase();
      let name = item.name.toLowerCase();
      let symbol = item.symbol.toLowerCase();
      let nameIndex = name.indexOf(value);
      let symbolIndex = symbol.indexOf(value);
      let nameText =
        nameIndex != -1 ? this.highlightText(item.name, value) : item.name;
      let symbolText =
      symbolIndex != -1 ? this.highlightText(item.symbol, value) : item.symbol;

      link.href = `/js-project-2-Barry992/company.html?symbol=${item.symbol}`;
      link.innerHTML = `<img id="${item.symbol}img">${nameText}(${symbolText})<div id="${item.symbol}percent"></div>`;
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
      .then(
        function (body) {
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
            `  <div style="color:${color} ">` +
            data.changesPercentage +
            `</div>`;
        }.bind(this)
      );
  }
}

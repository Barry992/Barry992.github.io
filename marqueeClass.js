const apiBaseUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

class StockMarquee {
  GetCompaniesNameByUrl = `${apiBaseUrl}sp500_constituent `;
  GetCompaniesPriceBySymbolUrl = `${apiBaseUrl}company/profile/`;

  constructor(containerElementId, numberOfCompaniesToShow) {
    this.containerElementId = containerElementId;
    this.numberOfCompaniesToShow = numberOfCompaniesToShow;
    this.build = this.build.bind(this);
    this.addPriceToCompanyName = this.addPriceToCompanyName.bind(this);
  }

  async fetchApi(url) {
    const response = await fetch(url);
    const body = await response.json();
    return body;
  }

  async build() {
    const companies = await this.fetchApi(this.GetCompaniesNameByUrl);
    for (let i = 0; i < this.numberOfCompaniesToShow; i++) {
      const stockName = companies[i].symbol;
      const html = `<div data-id='${i}'>
      <span class='stock-name'>
      ${stockName}
      </span>
      </div>`;
      const marqueeElement = document.getElementById(this.containerElementId);
      marqueeElement.insertAdjacentHTML("beforeend", html);
      this.addPriceToCompanyName(stockName, i);
    }
  }

  async addPriceToCompanyName(stockName, elementId) {
    const companyInfo = this.fetchApi(
      `${this.GetCompaniesPriceBySymbolUrl}${stockName}`
    );
    let price = companyInfo?.profile?.price || "";
    const parentElement = document.querySelector(
      `#${this.containerElementId} div[data-id="${elementId}"]`
    );
    const html = `<span class="company-price">${price}</span>`;
    parentElement?.insertAdjacentHTML("beforeend", html);
  }
}

const topMarquee = new StockMarquee("marqueeRes", 100);

topMarquee.build();

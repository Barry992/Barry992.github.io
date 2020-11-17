class SearchForm {
  constructor(element) {
    this.element = element;
    this.input = null;
    this.btn = null;
    this.render();
  }

   onSearch(callback) {
      this.callback = callback;
    
  }
  async search(){
    const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.input.value}&limit=10&exchange=NASDAQ`
      );
      const data = await response.json();
      
      this.callback(data,this.input.value);
  }
  render() {
    this.element.innerHTML = `
      <div class="input-group mb-3">
        <input
            type="text"
            class="form-control"
            id="searchInput"
            placeholder="search  stock..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
        />
      <div class="input-group-append">
        <button
          id="searchButton"
          class="btn btn-outline-secondary"
          type="button"
        >
          search
        </button> 
        </div> 
    </div>
    `;
    this.input = document.getElementById("searchInput");
    this.btn = document.getElementById("searchButton");
    this.btn.addEventListener("click", () => this.search());
  }
}

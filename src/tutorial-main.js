import { LitElement, html, css } from "lit";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";

class TutorialMain extends LitElement {
  static get styles() {
    return [css`
    
@import url('https://fonts.googleapis.com/css2?family=Eczar&family=Outfit:wght@100;300;500;600;700&family=Poppins:ital,wght@0,100;0,300;400;0,500;1,100&family=Roboto&display=swap');

/* *{
  font-family: 'Poppins', sans-serif;
} */
.navbar {
    font-weight: 300;
    overflow: hidden;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
  }

  .overlay{
    position: fixed;
    display: block;
    width: 40%;
    height: 100%;
    right:-1000px;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    cursor: pointer;
    transition: right 0.5s ease;
  }

  .mobile-navbar{
    
    display: block;
    transition: left 0.5s ease;
  }

  .navbar-left{
    /* background-color: #4caf50; */
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-left: 20px;
    /* width: 150px; */
  }

  #menu-icon{
    display: none;
    font-size: 30px;
    color: gray;
  }

  sl-button#each-topic::part(base){
    padding: 5px 2px;
    margin-top: 10px;
    padding-left: 10px;
    width: 100%;
    justify-content: left;
    color:#80868B;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    
  }

  sl-button#each-topic.active::part(base) {
    color: #212121;
    font-weight: bold;
  }

  .navbar h3{
    font-family: 'Outfit', sans-serif;
    font-weight: normal;
    font-size: 20px;
    color: #3C4043;
  }

  .navbar > .timer,
  p {
    margin: 10px;
  }

  .spinner-div{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
  }

  .container {
    font-family: 'Poppins', sans-serif;
    margin-top: 50px;
    height: 100vh;
    justify-content: space-around;
  }

  #topics {
    width: 20%;
    /* background-color: rebeccapurple; */
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 20%;
    margin: 10px;
    justify-content: center;
    flex-direction: column;
  }

  /* #each-topic {
    margin-top: 10px;
    width: 100%;
  } */


  #content-scroller {
    justify-content: right;
    position: fixed;
    bottom: 0;
    overflow-y: auto;
    top: 10%;
    left: 35%;
    margin: 20px;
    width: 50%;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
      rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  }



  #content-top p {
    min-height: 50px; /* Set a minimum height for the description */
    overflow-y: auto; /* Enable vertical scrolling if content exceeds the minimum height */
  }

  #content-top {
    padding: 10px;
  }

  #timer {
    /* background-color: aqua; */
    width: 300px;
    font-weight:500;
    font-family: 'Roboto', sans-serif;
    color: #3C4043;
    /* opacity: 0.7; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #content-bottom {
    width: 65%;
    margin: 0 auto;
    position: fixed;
    left: 28%;
    bottom: 50;
  }

  #nav-btns {
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }

  #progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 7px;
    background-color: #4caf50;
    width: 0;
    transition: width 0.3s ease;
  }

  /* Responsive CSS */

  @media only screen and (max-width: 1024px){
    #topics{
      display: none;
    }

    .container {
      margin-top: 50px;
      height: 100vh;
      /* justify-content: space-around; */
    }

    #content {
       justify-content: center;
      position: fixed; 
      left: 5%;
      margin: 12px auto;
      width: 90%;
      background-color: #ffffff;
    }

    #content-scroller {
      justify-content: center;
      position: fixed; 
      left: 5%;
      margin: 12px auto;
      width: 90%;
      background-color: #ffffff;
    }

    #content-bottom {
      /* background-color: blue; */
      width: 100%;
      margin: 0 auto;
      position: fixed;
      left: 0;
      bottom: 50;
    }

    .mobile-navbar > #timer {
      font-weight: 500;
      color: #3C4043;
      display: flex;
      width: 100%;
      padding-left: 25px;
      text-align: center;
      justify-content: center;
      align-items: center;
      font-size: 15px !important;
    }

    #nav-btns {
      display: flex;
      justify-content: space-between;
      margin: 10px;
    }
    #menu-icon{
      display: block;
    }

    .mobile-navbar{
      display: block;
      position: fixed;
      left: -1000;
      top: 0;
      bottom: 0;
      height: 100vh;
      width: 60%;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
      background-color: white;
      z-index: 2;
    }

    /* .mobile-navbar > #timer{
     
      display: flex;
      justify-content:left;
      align-items: center;
      font-size: 12px;
      font-weight: medium;
      margin: 10px;
    } */

    .mobile-navbar > p{
      font-size: 15px;
      font-weight:500;
      text-align: center;
    font-family: 'Roboto', sans-serif;
    color: #212121;
    }

    .mobile-navbar > #topics{
      display: flex;
       width: 55%;
       justify-content: space-between;
       /* margin: auto auto; */
      top:10%; 
    }

   

    sl-button#each-topic::part(base){
      margin-top: 20px;
      padding: 5px 2px;
      padding-left: 5px;
      font-size: 10px;
      /* width: 200px; */
      width: 100%;
      justify-content: left;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      
    }

    

    
    /*Tablets [601px -> 1200px]*/
}

@media only screen and (max-width: 630px){
  #timer {
    display: none;
  }

  .mobile-navbar > .mobile-timer{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight:500;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    color: #212121;
  }

  .navbar h3{
        font-size: 15px;
  }
}
    `];
  }
  static properties = {
    jsonData: { type: Array },
    titles: { type: Array },
    descriptions: { type: Array },
    topics: { type: Array },
    currentIndex: { type: Number },
    timer: { type: Number },
    isAtBottom: { type: Boolean },
    isActiveLink: { type: Boolean },
    allowedPages: { type: Number },
  };

  constructor() {
    super();
    this.jsonData = [];
    this.isActiveLink = false; // handle active link
    // Load the allowedPages array from sessionStorage or set it to an initial state
    this.allowedPages = parseInt(sessionStorage.getItem("allowedPages")) || 0;

    this.fetchJsonData().then(() => {
      this.requestUpdate();
    });

    this.topics = [
      { title: "Topic 1", content: "Content for Topic 1" },
      { title: "Topic 2", content: "Content for Topic 2" },
      { title: "Topic 3", content: "Content for Topic 3" },
      { title: "Topic 4", content: "Content for Topic 4" },
      { title: "Topic 5", content: "Content for Topic 5" },
      { title: "Topic 6", content: "Content for Topic 6" },
      { title: "Topic 7", content: "Content for Topic 7" },
      { title: "Topic 8", content: "Content for Topic 8" },
      { title: "Topic 9", content: "Content for Topic 9" },
      { title: "Topic 10", content: "Content for Topic 10" },
    ];

    this.currentIndex = 0;
    if (window.location.hash) {
      const hashIndex = parseInt(window.location.hash.substring(1), 10);
      if (
        !isNaN(hashIndex) &&
        hashIndex >= 0 &&
        hashIndex < this.topics.length
      ) {
        this.currentIndex = hashIndex;
      }
    }

    this.timer = 50; // Initial timer value in seconds
    this.isAtBottom = false;
  }

  handleActiveLink() {
    this.isActive = !this.isActive;
    const button = this.shadowRoot.querySelector("sl-button#each-topic");
    button.classList.toggle("active", this.isActive);
  }

  async fetchJsonData() {
    try {
      const response = await fetch("./assets/listing.json"); // Adjust the path to your JSON file
      if (response.ok) {
        this.jsonData = await response.json();

        if (this.jsonData && this.jsonData.data && this.jsonData.data.items) {
          this.titles = this.jsonData.data.items.map((item) => item.title);
          this.descriptions = this.jsonData.data.items.map(
            (item) => item.description
          );
        } else {
          console.error(
            "JSON data is missing required properties:",
            this.jsonData
          );
        }
      } else {
        console.error("Error fetching JSON data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching JSON data:", error.message);
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    // Bind the handleScroll method to the class instance
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);

    document.addEventListener("click", this.handleOutsideClick);

    // Check if the app is being loaded for the first time
    if (!window.location.hash) {
      // Fetch and display the content for the initial page (Topic_1.html)
      await this.fetchTopicContent(0);

      // Set the initial hash in the URL
      const url = new URL(window.location.href);
      url.hash = "#0";
      window.history.replaceState({}, "", url.href);
    } else {
      // If the page is being refreshed, fetch and display the content based on the current hash
      const currentIndex = parseInt(window.location.hash.substring(1), 10);
      await this.fetchTopicContent(currentIndex);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick = (event) => {
    const shadowRoot = this.shadowRoot;
    const mobileNav = shadowRoot.querySelector(".mobile-navbar");
    const overlay = shadowRoot.querySelector(".overlay");

    // Check if mobileNav is found
    if (mobileNav) {
      // Check if the clicked element is outside the component and not the mobileNav
      if (
        !this.contains(event.target) ||
        (overlay &&
          event.composedPath().includes(overlay) &&
          event.target !== mobileNav)
      ) {
        // If clicked outside the .mobile-navbar, move it to left
        mobileNav.style.left = "-1000px";
        overlay.style.right = "-1000px";
      } else {
      }
    }
  };

  handleScroll() {
    const contentScroller = this.shadowRoot.getElementById("content-scroller");

    const scrollPosition = contentScroller.scrollTop;
    const totalHeight =
      contentScroller.scrollHeight - contentScroller.clientHeight;
    const progress = (scrollPosition / totalHeight) * 100;

    const progressBar = this.shadowRoot.getElementById("progress-bar");
    progressBar.style.width = progress + "%";

    // Check if the user is at the bottom
    this.isAtBottom = scrollPosition >= totalHeight - 10; // Adjust the threshold as needed
  }

  scrollToTop() {
    const contentScroller = this.shadowRoot.getElementById("content-scroller");
    contentScroller.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  toggleMobileNavbar() {
    const mobileNavbar = this.shadowRoot.querySelector(".mobile-navbar");
    const overlay = this.shadowRoot.querySelector(".overlay");

    // Check the current left property and toggle accordingly
    if (mobileNavbar.style.left === "-1000px" || !mobileNavbar.style.left) {
      mobileNavbar.style.left = "0"; // Adjust the value as needed
      mobileNavbar.style.transition = "left 0.7s ease";

      overlay.style.transition = "right 0.7s ease";
      overlay.style.right = "0";
    } else {
      mobileNavbar.style.left = "0";
      overlay.style.right = "0";
    }
  }

  closeNavbarEachTopic() {
    const mobileNavbar = this.shadowRoot.querySelector(".mobile-navbar");
    const overlay = this.shadowRoot.querySelector(".overlay");
    mobileNavbar.style.transition = "left 0.7s ease-out";
    mobileNavbar.style.left = "-1000px";

    overlay.style.transition = "right 0.7s ease-out";
    overlay.style.right = "-1000px";
  }

  async fetchTopicContent(index) {
    try {
      const response = await fetch(`./assets/Topic_${index + 1}.html`);
      if (response.ok) {
        const content = await response.text();

        // Introduce a timeout of 500 milliseconds (0.5 second)
        setTimeout(() => {
          const contentTop = this.shadowRoot.getElementById("content-top");

          // Check if the element exists before setting innerHTML
          if (contentTop) {
            contentTop.innerHTML = content;
          } else {
            console.error(`Element with ID "content-top" not found.`);
          }
        }, 500);
      } else {
        console.error(
          `Error fetching Topic_${index + 1}.html: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error fetching Topic_${index + 1}.html: ${error.message}`);
    }
  }

  render() {
    if (this.jsonData && this.jsonData.data && this.jsonData.data.items) {
      const lastIndex = this.jsonData.data.items.length - 1;

      return html`

      <!-- MOBILE NAVIGATION BAR -->
      <div class="mobile-navbar">
      <div class="overlay"></div>

      <div class="mobile-timer">
          <sl-icon variant="neutral" name="clock"></sl-icon>
            <p>${this.timer} mins remaining</p>
        </div>

        <div id="topics">
            ${this.jsonData.data.items.map(
              (topic, index) => html`
                <sl-button
                  id="each-topic"
                  size="small"
                  style="color:blue"
                  class=${index === this.currentIndex ? "active" : ""}
                  variant=${index === this.currentIndex ? "default" : "default"}
                  @click=${() => {
                    this.checkIsAllowedInMobile(index);
                  }}
                >
                  <sl-icon
                    style="font-size:22px; ${index === this.currentIndex
                      ? "color:#2473E8;"
                      : "color:#80868B"}"
                    slot="prefix"
                    var
                    name=${index === 9
                      ? "1-circle-fill"
                      : index +
                        1 +
                        (index === this.currentIndex
                          ? "-circle-fill"
                          : "-circle-fill")}
                  ></sl-icon>
                  ${index === 9
                    ? html`<sl-icon
                        style="font-size:22px; ${index === this.currentIndex
                          ? "color:#2473E8;"
                          : "color:#80868B"}"
                        slot="prefix"
                        name="0-circle-fill"
                      ></sl-icon>`
                    : ""}
                  ${topic.title}
                </sl-button>
              `
            )}
          </div>
      </div>

       <!--END OF THE MOBILE NAVIGATION BAR -->


        <div class="navbar">
          
          <div class="navbar-left">
            <sl-icon-button @click=${
              this.toggleMobileNavbar
            }  id="menu-icon" variant="neutral" size="large" name="list"></sl-icon-button>
            <h3>From Web Component to Lit Element</h3>
          </div>

          <div id="timer">
            <sl-icon variant="neutral" name="clock"></sl-icon>
            <p>${this.timer} mins remaining</p></p>
          </div>
          <div id="progress-bar"></div>
        </div>

        <div class="container">
          <div id="topics">
            ${this.jsonData.data.items.map(
              (topic, index) => html`
                <sl-button
                  id="each-topic"
                  size="small"
                  style="color:blue"
                  class=${index === this.currentIndex ? "active" : ""}
                  variant=${index === this.currentIndex ? "default" : "default"}
                  @click=${() => {
                    this.checkIsAllowed(index);
                  }}
                >
                  <sl-icon
                    style="font-size:22px; ${index === this.currentIndex
                      ? "color:#2473E8;"
                      : "color:#80868B"}"
                    slot="prefix"
                    var
                    name=${index === 9
                      ? "1-circle-fill"
                      : index +
                        1 +
                        (index === this.currentIndex
                          ? "-circle-fill"
                          : "-circle-fill")}
                  ></sl-icon>
                  ${index === 9
                    ? html`<sl-icon
                        style="font-size:22px; ${index === this.currentIndex
                          ? "color:#2473E8;"
                          : "color:#80868B"}"
                        slot="prefix"
                        name="0-circle-fill"
                      ></sl-icon>`
                    : ""}
                  ${topic.title}
                </sl-button>
              `
            )}
          </div>

          
            <div id="content-scroller" @scroll=${this.handleScroll}>
              <div id="content-top">
                
              </div>
              <div id="content-bottom">
                <div id="nav-btns">
                  ${
                    this.currentIndex !== 0
                      ? html`<div>
                          <sl-button
                            id="prevButton"
                            @click=${() => this.navigate(-1)}
                            >Previous</sl-button
                          >
                        </div>`
                      : ""
                  }
                  ${
                    this.currentIndex !== lastIndex
                      ? html`<div style="margin-left: auto;">
                          <sl-button
                            variant="primary"
                            id="nextButton"
                            @click=${() => this.navigate(1)}
                            ?disabled=${!this.isAtBottom}
                            >Next</sl-button
                          >
                        </div>`
                      : ""
                  }
                </div>
              </div>
            </div>
          
        </div>
      `;
    } else {
      return html`
        <div class="spinner-div">
          <sl-spinner style="font-size: 2rem;"></sl-spinner>
        </div>
      `;
    }
  }

  navigate(direction) {
    const newIndex = this.currentIndex + direction;
    if (newIndex >= 0 && newIndex < this.topics.length) {
      this.currentIndex = newIndex;

      // Fetch the new HTML content for the selected topic
      this.fetchTopicContent(newIndex);

      const contentScroller =
        this.shadowRoot.getElementById("content-scroller");
      contentScroller.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      this.updateUrl();
    }

    const allowedNumber = parseInt(sessionStorage.getItem("allowedPages"));

    if (newIndex == 1 && !allowedNumber) {
      sessionStorage.setItem("allowedPages", newIndex);
    }

    const allowedNumberAfterUpdate = parseInt(
      sessionStorage.getItem("allowedPages")
    );

    if (direction > 0 && newIndex >= allowedNumberAfterUpdate) {
      this.updateAllowedPages();
    }
  }

  updateAllowedPages() {
    this.allowedPages = this.allowedPages + 1;
    sessionStorage.setItem("allowedPages", this.allowedPages);
  }

  checkIsAllowed(index) {
    const allowedUpTo = parseInt(sessionStorage.getItem("allowedPages"));
    const notAllowed = allowedUpTo + 1;
    if ((index > notAllowed || !this.isAtBottom) && !(index <= allowedUpTo)) {
      //alert("You are now allowed");
    } else {
      this.changeTopic(index);
      this.scrollToTop();
      this.handleActiveLink(); // Active current link
      if (!(index <= allowedUpTo)) {
        this.allowedPages = this.allowedPages + 1;
        sessionStorage.setItem("allowedPages", this.allowedPages);
      }
    }
  }


  checkIsAllowedInMobile(index) {
    const allowedUpTo = parseInt(sessionStorage.getItem("allowedPages"));
    const notAllowed = allowedUpTo + 1;
    if ((index > notAllowed || !this.isAtBottom) && !(index <= allowedUpTo)) {
     // alert("You are now allowed");
    } else {
      this.changeTopic(index);
      this.scrollToTop();
      this.closeNavbarEachTopic();
      this.handleActiveLink(); // Active current link
      if (!(index <= allowedUpTo)) {
        this.allowedPages = this.allowedPages + 1;
        sessionStorage.setItem("allowedPages", this.allowedPages);
      }
    }
  }

  changeTopic(index) {
    this.currentIndex = index;
    this.updateUrl();
    this.fetchTopicContent(index);
  }

  updateUrl() {
    const url = new URL(window.location.href);
    url.hash = `#${this.currentIndex}`;
    this.timer = 50 - 5 * this.currentIndex;
    window.history.pushState({}, "", url.href);
  }
}

customElements.define("tutorial-main", TutorialMain);

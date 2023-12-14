import { LitElement, html, css } from "lit";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import styles from "../assets/styles.css" assert { type: "css" };

class TutorialMain extends LitElement {
  static styles = [styles];
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
      const response = await fetch("../assets/listing.json"); // Adjust the path to your JSON file
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
      const response = await fetch(`../Topic_${index + 1}.html`);
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
      alert("You are now allowed");
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
      alert("You are now allowed");
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

import { Store } from "@stencil/redux";
import { Component, h, State, Prop } from '@stencil/core';
import { APISearchService } from '../../../services/api/search';


@Component({
    tag: 'page-faq',
    styleUrl: 'page.faq.scss'
  })
  export class PageFAQ {
    @Prop({ context: "store" }) store: Store;
    @State() size: string = 'phone-only';
    @State() isMobile: boolean = true;
    @State() loaded: boolean = false;
    @State() faq: any = [];
    @State() answer : any = [];
    @State() category : any = [];
    @State() general : any = [];
    @State() salesterms : any = [];
    @State() booking : any = [];
    @State() privaterooms : any = [];
    @State() stay : any = [];
    @State() question : any = [];
    @State() value: string;
    @State() matches : any = [];
    @State() accordionlist : any = [];
    @State() guest: string = 'yes';

    @State() footerOpen: boolean = false;

    textInput!: HTMLInputElement;

    hasLoaded: boolean = false;

    componentWillLoad() {

      this.store.mapStateToProps(this, state => {

        const {
          screenSize: { size, isMobile },
        } = state;

        return {
          size,
          isMobile
        };
      });

    }

    toggleMatchesVisibility(value = null, force = false) {

      const el = document.getElementById("matches");

      if (force) {
        el.style.display = "none";
        return
      }

      if (value.length < 1) {
        el.style.display = "none";
      } else {
        el.style.display = "block";
      }

    }

    handleSubmit(e) {
      e.preventDefault();
    }

    handleChange() {

      this.value = this.textInput.value

      this.toggleMatchesVisibility(this.value)

      if (this.value.length < 2) {
        return;
      }

      this.matches = this.faq.filter(o => o.question.toLowerCase().includes(this.value.toLowerCase()));

    }

    async componentDidLoad() {
      this.loaded = true;

      try {
        this.faq = await APISearchService.getNamedSearch('FAQPageInit');
        this.getQuestionsByCategory("guest");
       } catch (e) {
         // Fail silently
       }
    }

    async scrollTo(hash) {
      location.hash = "#" + hash;
    }

    async showQuestions(guest) {
      if (guest == "yes") {
        this.guest = "yes"
        this.getQuestionsByCategory("guest")
      } else if (guest == "no") {
        this.guest = "rentals"
        this.getQuestionsByCategory("rentals")
      } else if (guest == "sales") {
        this.guest = "sales"
        this.getQuestionsByCategory("sales")
      }
    }

    async showAnswer(question) {

      this.toggleMatchesVisibility(null, true)

      let obj = this.faq.find(o => o.question === question)

      if ( this.size == "phone-only" ) {
        document.getElementById(obj.id).click()
        this.scrollTo(1)
      } else {
        this.answer = obj.answer
        this.question = question
      }

    }

    async getQuestionsByCategory (role) {
      this.general = this.faq.filter(o => o.category === "General" && o.role === role)
      this.booking = this.faq.filter(o => o.category === "Booking" && o.role === role)
      this.privaterooms = this.faq.filter(o => o.category === "Private Rooms" && o.role === role)
      this.stay = this.faq.filter(o => o.category === "Your Stay" && o.role === role)
      this.salesterms = this.faq.filter(o => o.category === "Sales Terms" && o.role === role)
    }

    render() {
      return [
        <ion-content>
          <app-header />
            <div class="page-faq">

            <div class="hero">
                <div class="section">
                  <div class="cta">

                    <h1>FAQ</h1>

                    <form onSubmit={(e) => this.handleSubmit(e)}>

                    <input
                      id="faq-search"
                      type="text"
                      class="faq-search"
                      ref={(el) => this.textInput = el as HTMLInputElement}
                      placeholder= "Ask a question"
                      value={this.value} onInput={() => this.handleChange()}
                      onTouchStart={() => this.handleChange()}
                      autoComplete="off"
                    />

                    <ul id="matches" class="matches">

                    {this.matches.map(faq => {
                      const link = "#" + faq.id
                      return (
                        <li>
                          <a href={this.size == "phone-only" ? link : "#answers"} onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                        </li>
                      );
                    })}

                    </ul>

                    </form>

                  </div>
                </div>
            </div>

            <section class="section">
            <div class="nav-wrapper">
            <div class="nav">
                  <div class="button-toggles">
                    <button
                      type="button"
                      class={{ 'button-dark': true,  active: this.guest === 'yes'}}
                      onClick={() => this.showQuestions("yes")}
                    >
                      Furnished
                    </button>

                    <button
                      type="button"
                      class={{ 'button-dark': true,  active: this.guest === 'no'}}
                      onClick={() => this.showQuestions("no")}
                    >
                      Rentals
                    </button>

                    <button
                      type="button"
                      class={{ 'button-dark': true,  active: this.guest === 'sales'}}
                      onClick={() => this.showQuestions("sales")}
                    >
                      Sales
                    </button>
                  </div>
                </div>
            </div>

            <div class="faq-wrapper">

              <div class="questions-wrapper">

                  <div class={this.guest == "sales" ? "sales_terms show" : "sales_terms hide"}>

                    <h2>Sales Terms</h2>

                    {this.salesterms.map(faq => {
                        return (
                          <apt212-accordion questionID={faq.id} class={this.size == "phone-only" ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                        );
                      })}

                      {this.salesterms.map(faq => {
                        return (
                          <div class={this.size == "phone-only" ? "hide" : "show"}>
                            <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                          </div>
                        );
                      })}
                  </div>

                  <div class={this.guest == "rentals" ? "rentals show" : "rentals hide"}>

                    <h2>Coming Soon</h2>

                  </div>

                  <div class={this.guest == "yes" ? "questions show" : "questions hide"}>

                    <h2>General</h2>

                        {this.general.map(faq => {
                          return (
                            <apt212-accordion questionID={faq.id} class={this.size == "phone-only" ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                          );
                        })}

                        {this.general.map(faq => {
                          return (
                            <div class={this.size == "phone-only" ? "hide" : "show"}>
                              <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                            </div>
                          );
                        })}

                      <h2>Booking</h2>

                        {this.booking.map(faq => {
                            return (
                              <apt212-accordion questionID={faq.id} class={this.size == "phone-only" ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                            );
                          })}

                          {this.booking.map(faq => {
                            return (
                              <div class={this.size == "phone-only" ? "hide" : "show"}>
                                <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                              </div>
                            );
                          })}

                      <h2>Private Rooms</h2>

                        {this.privaterooms.map(faq => {
                          return (
                            <apt212-accordion questionID={faq.id} class={this.size == "phone-only" ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                          );
                        })}

                        {this.privaterooms.map(faq => {
                          return (
                            <div class={this.size == "phone-only" ? "hide" : "show" }>
                              <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                            </div>
                          );
                        })}

                    <h2>Your Stay</h2>

                        {this.stay.map(faq => {
                          return (
                            <apt212-accordion questionID={faq.id} class={this.size == "phone-only" ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                          );
                        })}

                        {this.stay.map(faq => {
                          return (
                            <div class={this.size == "phone-only" ? "hide" : "show"}>
                              <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                            </div>
                          );
                        })}

                </div>
              </div>

              <div class={this.size == "phone-only" ? "answers hide" : "answers show"} id="answers">
                  <h1>{this.question}</h1>
                  <p class="answer" innerHTML={this.answer}></p>
              </div>

            </div>

          </section>

          <div class={{'search-footer': true, 'footer-open': this.footerOpen, 'footer-closed': !this.footerOpen }}>
          <div class="section toggle-footer-wrapper">
            <button class="button-reset toggle-footer" aria-label="Open/Close Footer" onClick={() => this.footerOpen = !this.footerOpen }>
              <span class="closed">Open Footer</span>
              <ion-icon mode="md" name="md-arrow-dropup" class="closed"></ion-icon>

              <span class="open">Close Footer</span>
              <ion-icon mode="md" name="md-arrow-dropdown" class="open"></ion-icon>
            </button>
          </div>

          <div class={{'footer-wrapper': true, 'footer-open': this.footerOpen, 'footer-closed': !this.footerOpen }}>
            <app-footer no-margin />
          </div>
        </div>

        </div>
        </ion-content>
      ];
    }
  }

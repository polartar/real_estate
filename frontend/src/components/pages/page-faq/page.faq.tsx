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
    @State() booking : any = [];
    @State() privaterooms : any = [];
    @State() stay : any = [];
    @State() question : any = [];
    @State() value: string;
    @State() matches : any = [];
    @State() accordionlist : any = [];

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

    handleSubmit(e) {
      e.preventDefault();
    }

    handleChange() {
      this.value = this.textInput.value

      if (this.value.length < 2) {
        return;
      }

      this.matches = this.faq.filter(o => o.question.toLowerCase().includes(this.value.toLocaleLowerCase()));
    }

    async componentDidLoad() {
      this.loaded = true;

      try {
        this.faq = await APISearchService.getNamedSearch('FAQPageInit');
        this.getQuestionsByCategory();
       } catch (e) {
        // Fail silently.
       }



    }

    async scrollTo(hash) {
      location.hash = "#" + hash;
    }

    async showAnswer(question) {

      let obj = this.faq.find(o => o.question === question)

      if (this.isMobile) {
        document.getElementById(obj.id).click()
        this.scrollTo(1)
      } else {
        this.answer = obj.answer
        this.question = question
      }

    }

    async getQuestionsByCategory () {
      this.general = this.faq.filter(o => o.category === "General")
      this.booking = this.faq.filter(o => o.category === "Booking")
      this.privaterooms = this.faq.filter(o => o.category === "Private Rooms")
      this.stay = this.faq.filter(o => o.category === "Your Stay")
    }

    render() {
      return [

        <app-header />,
        <ion-content class="page-faq">

          <section class="section">

            <div class="hero">

                <div class="cta">

                  <h1>FAQ</h1>

                  <form onSubmit={(e) => this.handleSubmit(e)}>

                  <input
                    id="search"
                    type="text"
                    class="search"
                    ref={(el) => this.textInput = el as HTMLInputElement}
                    placeholder="Ask a question"
                    value={this.value} onInput={() => this.handleChange()}
                    onTouchStart={() => this.handleChange()}
                    autoComplete="off"
                  />

                  <ul class="matches">

                  {this.matches.map(faq => {
                    const link = "#" + faq.id
                    return (
                      <li>
                        <a href={this.isMobile ? link : "#answers"} onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                      </li>
                    );
                  })}

                  </ul>

                  </form>

                </div>
            </div>

            <div class="faq-wrapper">
              <div class="questions-wrapper">
                  <div class="questions">
                    <h2>General</h2>

                      {this.general.map(faq => {
                        return (
                          <apt212-accordion questionID={faq.id} class={this.isMobile ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                        );
                      })}

                      {this.general.map(faq => {
                        return (
                          <div class={this.isMobile ? "hide" : "show"}>
                            <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                          </div>
                        );
                      })}

                    <h2>Booking</h2>

                      {this.booking.map(faq => {
                          return (
                            <apt212-accordion questionID={faq.id} class={this.isMobile ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                          );
                        })}

                        {this.booking.map(faq => {
                          return (
                            <div class={this.isMobile ? "hide" : "show"}>
                              <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                            </div>
                          );
                        })}



                    <h2>Private Rooms</h2>

                        {this.privaterooms.map(faq => {
                          return (
                            <apt212-accordion questionID={faq.id} class={this.isMobile ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                          );
                        })}

                        {this.privaterooms.map(faq => {
                          return (
                            <div class={this.isMobile ? "hide" : "show" }>
                              <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                            </div>
                          );
                        })}

                    <h2>Your Stay</h2>

                        {this.stay.map(faq => {
                          return (
                            <apt212-accordion questionID={faq.id} class={this.isMobile ? "show" : "hide"} label={faq.question} description={faq.answer}></apt212-accordion>
                          );
                        })}

                        {this.stay.map(faq => {
                          return (
                            <div class={this.isMobile ? "hide" : "show"}>
                              <a href="#"  onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                            </div>
                          );
                        })}

                </div>
              </div>

              <div class={this.isMobile ? "answers hide" : "answers show"} id="answers">
                  <h1>{this.question}</h1>
                  <p class="answer">{this.answer}</p>
              </div>

            </div>

          </section>

          <app-footer />
        </ion-content>
      ];
    }
  }

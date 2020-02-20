import { Component, h, State } from '@stencil/core';
import { APISearchService } from '../../../services/api/search';

@Component({
    tag: 'page-faq',
    styleUrl: 'page.faq.scss'
  })
  export class PageFAQ {
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

    hasLoaded: boolean = false;

    handleSubmit(e) {
      e.preventDefault()
      this.matches = this.faq.filter(o => o.question.toLowerCase().includes(this.value))
    }

    handleChange(event) {
      this.value = event.target.value;
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

    async showAnswer(question) {
      let obj = this.faq.find(o => o.question === question)
      this.answer = obj.answer
      this.question = question
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
                  
                  <input type="text" class="search" placeholder="Ask a question or search by keyword" value={this.value} onInput={(event) => this.handleChange(event)} />

                  <ul class="matches">

                  {this.matches.map(faq => {
                    return (
                      <li>
                        <a href="#answers" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
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
                        <div>
                          <a href="#" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                        </div>
                      );
                    })}   

                    <h2>Booking</h2>
                    
                    {this.booking.map(faq => {
                      return (
                        <div>
                          <a href="#" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                        </div>
                      );
                    })}  

                    <h2>Private Rooms</h2>
                    
                    {this.privaterooms.map(faq => {
                      return (
                        <div>
                          <a href="#" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                        </div>
                      );
                    })}  

                    <h2>Your Stay</h2>
                    
                    {this.stay.map(faq => {
                      return (
                        <div>
                          <a href="#" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                        </div>
                      );
                    })}  
                </div>
              </div>

              <div class="answers" id="answers">
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

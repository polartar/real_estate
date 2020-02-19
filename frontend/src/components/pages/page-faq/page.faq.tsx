import { Component, h, State } from '@stencil/core';
import { APISearchService } from '../../../services/api/search';
import { Listen } from '@stencil/core';
import { Element } from '@stencil/core';

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

    @Element() search: HTMLInputElement;

    hasLoaded: boolean = false;

    @Listen('keydown')
      handleKeyDown(ev: KeyboardEvent){
        
        const searchResults: any = this.search.querySelector('.search');
        console.log(ev.key)
        console.log(searchResults)

        this.faq.filter(o => o.question === question)
       
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
      let general = this.faq.filter(o => o.category === "General")
      let booking = this.faq.filter(o => o.category === "Booking")
      let privaterooms = this.faq.filter(o => o.category === "Private Rooms")
      let stay = this.faq.filter(o => o.category === "Your Stay")
      console.log(general)
      this.general = general
      this.booking = booking
      this.privaterooms = privaterooms
      this.stay = stay
      
    }

    async activateSearch() {
      //
    }

    render() {

      return [

        <app-header />,
        <ion-content class="page-faq">

          <section class="section">

            <div class="hero">

                <div class="cta">

                  <h1>FAQ</h1>

                  <button class="search" aria-label="Search" onClick={() => { this.activateSearch() }}>
                  <svg class="feather feather-search" viewBox="0 0 25 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M24,21.1886008 L18.6803754,15.9186997 C19.949079,14.3099652 20.6588954,12.3179013 20.6588954,10.238277 C20.6588954,5.14393658 16.472729,1 11.3303363,1 C6.18621089,1 2,5.14393658 2,10.238277 C2,15.3308573 6.18616646,19.4765539 11.3303363,19.4765539 C13.3071236,19.4765539 15.2318387,18.8457674 16.8196842,17.7010588 L22.1704099,23 L24,21.1886008 Z M11.3302919,16.9140717 C7.61273046,16.9140717 4.58934605,13.9182757 4.58934605,10.238365 C4.58934605,6.55849823 7.61268603,3.56265825 11.3302919,3.56265825 C15.0461205,3.56265825 18.0694605,6.55845423 18.0694605,10.238365 C18.0694605,12.2063608 17.1982293,14.0643123 15.6796059,15.3379854 C14.4664401,16.3537734 12.9218251,16.9140717 11.3302919,16.9140717 Z" fill="#000000"></path></g></svg>
                  Ask a question or search by keyword
                  </button>
                  
               
                </div>
            </div>

            <div class="faq-wrapper">
              <div class="questions">
                  <h3>General</h3>
                
                  {this.general.map(faq => {
                    return (
                      <div>
                        <a href="#" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                      </div>
                    );
                  })}   

                  <h3>Booking</h3>
                  
                  {this.booking.map(faq => {
                    return (
                      <div>
                        <a href="#" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                      </div>
                    );
                  })}  

                  <h3>Private Rooms</h3>
                  
                  {this.privaterooms.map(faq => {
                    return (
                      <div>
                        <a href="#" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                      </div>
                    );
                  })}  

                  <h3>Your Stay</h3>
                  
                  {this.stay.map(faq => {
                    return (
                      <div>
                        <a href="#" onClick={() => this.showAnswer(faq.question)}>{faq.question}</a>
                      </div>
                    );
                  })}  
              </div>
              <div class="answers">
                  <h3>{this.question}</h3>
                  <p class="answer">{this.answer}</p>
              </div>
            </div>


          </section>

          <app-footer />
        </ion-content>
      ];
    }
  }

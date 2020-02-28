import { Component, h } from '@stencil/core';

@Component({
  tag: 'ask-question',
  styleUrl: 'ask-question.scss'
})
export class AskQuestion {

  render() {

    const people = [
      {
        name: 'Adi',
        image: 'https://picsum.photos/200/200'
      },
      {
        name: 'Margaret',
        image: 'https://picsum.photos/200/200'
      },
      {
        name: 'Milena',
        image: 'https://picsum.photos/200/200'
      },
      {
        name: 'Jeisohn',
        image: 'https://picsum.photos/200/200'
      },
      {
        name: 'Dustin',
        image: 'https://picsum.photos/200/200'
      },
      {
        name: 'Nina',
        image: 'https://picsum.photos/200/200'
      },
      {
        name: 'Rivka',
        image: 'https://picsum.photos/200/200'
      },
      {
        name: 'Dana',
        image: 'https://picsum.photos/200/200'
      }
    ];

    return (
      <div class="ask-question-component">
        <div class="content-left">
          <div class="title">Our Team</div>

          <p>
            The on-the-ground experts at APT212 are leaders in finding a well-suited property that matches guest's needs and expectations.
            Our team is comprised of licensed, multilingual, Manhattan-savvy agents that know the ins and outs of New York city real estate and have a unique understanding of the short-term rental market.
          </p>

          <p>
            The agents are available to assist every step of the way, answering any questions, visiting the unit, and finalizing your rental. The staff prides itself on exceptional customer
            service to help make moving and relocating stress-free.
          </p>

          <div class="people">
            {
              people.map(p => <div class="person">
                <img src={p.image} />

                {p.name}
              </div>)
            }
          </div>

        </div>
        <div class="content-right">
          <inquiry-form />
        </div>
      </div>
    )
  }
}

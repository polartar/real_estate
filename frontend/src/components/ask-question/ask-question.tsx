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
        <div class="content-right">
          <inquiry-form />
        </div>
      </div>
    )
  }
}

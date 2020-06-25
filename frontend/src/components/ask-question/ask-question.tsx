import { Component, h } from '@stencil/core';

@Component({
  tag: 'ask-question',
  styleUrl: 'ask-question.scss'
})
export class AskQuestion {

  render() {

    return (
      <div class="ask-question-component">
        <div class="content-right">
          <inquiry-form />
        </div>
      </div>
    )
  }
}

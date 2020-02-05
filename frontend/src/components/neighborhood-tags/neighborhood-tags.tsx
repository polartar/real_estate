import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'neighborhood-tags',
  styleUrl: 'neighborhood-tags.scss'
})

export class NeigborhoodTags {
  @Prop() items: any[] = [];

  render() {
    return [
      <div class="neighborhood-tag-list">
          <div class="tags">
            {this.items.map(tag =>
              <div class="tag">{tag}</div>
            )}
          </div>
      </div>
    ];
  }
}

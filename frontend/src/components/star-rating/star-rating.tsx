import { Component, h, State, Prop, EventEmitter, Event } from '@stencil/core';

/*
* Adapted from:
*
* Star Rating component written with Stencil.js
* by Aaron Sterling
* https://github.com/Aaron-Sterling/star-rating-web-component
*
*/


@Component({
  tag: 'star-rating',
  styleUrl: 'star-rating.scss'
})
export class StarRating {



  @Prop() rating: number = 0;
  @Prop() size: number = 25;
  @Prop() stars: number = 5;
  @Prop() color: string = 'gold';
  @Prop() readonly: boolean = false;

  //
  private _initialRatingOriginal: number;
  private _fontSizeOriginal: number;
  private _colorOriginal: string;
  private _numberOfStarsOriginal: number;
  private _readonly: boolean;


  @State() currentRating: number;

  @Event() rated: EventEmitter<number>;

  private _fontSizeExpression: string;
  private _starCounter: Array<boolean> = new Array<boolean>();

  constructor() {}

  componentWillLoad() {
    this.firstRun();
  }

  firstRun() {
    this.backupOriginalProps();
    this.initializeInternalState();
  }

  backupOriginalProps() {
    this._initialRatingOriginal = this.rating;
    this._fontSizeOriginal = this.size;
    this._numberOfStarsOriginal = this.stars;
    this._colorOriginal = this.color;
    this._readonly = this.readonly;
  }

  initializeInternalState() {
    this._fontSizeExpression = this.size.toString() + 'px';
    this.currentRating = this.rating;
    this._starCounter = new Array<boolean>(this.stars).fill(true);
  }

  propsHaveChanged(): boolean {
    return !(this.rating === this._initialRatingOriginal &&
             this.size === this._fontSizeOriginal &&
             this.color === this._colorOriginal &&
             this.stars === this._numberOfStarsOriginal &&
             this.readonly === this._readonly
            );
  }

  componentDidLoad() {
    if (this.propsHaveChanged) {
      this.firstRun();
    }
  }

  updateRating(rating: number) {
    if (this.readonly) {
      return;
    }

    this.currentRating = rating;
    this.rated.emit(rating);
  }

  iconName(starNumber: number): string {
    const threshold = this.currentRating - starNumber;
    if (threshold >= 0) { return 'star'}
    else { return 'star-outline' };
  }

  render() {
    return (
      <div class="star-rating">
        {this._starCounter.map((_, currentIndex) => <ion-icon name={this.iconName(currentIndex + 1)}
                                                              onClick={_ => this.updateRating(currentIndex + 1)}
                                                              style={{'font-size': this._fontSizeExpression, 'color': this.color}}>
                                                    </ion-icon>)}
      </div>
    );
  }
}

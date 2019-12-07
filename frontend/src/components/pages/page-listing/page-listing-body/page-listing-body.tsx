import { Component, h, Prop, Host } from '@stencil/core';
import { Store } from '@stencil/redux';
import taxonomySelectors from '../../../../store/selectors/taxonomy';
import { formatMoney, formatDate } from '../../../../helpers/utils';
import { getBedsListingText } from '../../../../helpers/filters';

@Component({
  tag: 'page-listing-body',
  styleUrl: 'page-listing-body.scss'
})
export class PageListingBody {
  @Prop({ context: "store" }) store: Store;
  @Prop() item!: any;

  bedroomTypes: any;
  buildingTypes: any;
  neighborhoods: any;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      const neighborhoods = taxonomySelectors.getNeighborhoods(state);

      return {
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
        neighborhoods: neighborhoods.filter(n => this.item.neighborhood_ids.includes(n.id))
      }
    });
  }

  getFeatures() {
    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);

    let features: any[] = [
      {
        'name': <span><lazy-image src="/assets/images/icons/bedroom.svg" class="feature-icon" alt="bedroom icon" /> Bedrooms</span>,
        'value': getBedsListingText(bedroomType, 'short')
      },
      {
        'name': <span><lazy-image src="/assets/images/icons/bathroom.svg" class="feature-icon" alt="bathroom icon" /> Bathrooms</span>,
        'value': this.item.bathrooms
      },
      {
        'name': 'Building Type',
        'value': <div class="flex-vertical-center"><star-rating stars={5} rating={buildingType.rating} size={16} readonly />&nbsp;&nbsp;&nbsp;&nbsp;{ buildingType.name }</div>
      }
    ];

    if (this.item.floor) {
      features.push({
        'name': 'Floor',
        'value': this.item.floor
      });
    }

    if (this.item.size) {
      features.push({
        'name': 'Apartment Square Footage',
        'value': `${this.item.size} sqft`
      });
    }

    features.push({
      'name': 'Neighborhood',
      'value': this.neighborhoods.reduce((acc, curr) => {
        if (acc.length) {
          acc += '/';
        }

        acc += curr.name;
        return acc;
      }, '')
    });

    if (this.item.cross_streets) {
      features.push({
        'name': 'Cross Streets',
        'value': this.item.cross_streets
      });
    }

    if (this.item.subways.length) {
      features.push({
        'name': 'Nearby Subways',
        'value': this.item.subways.map(s => <lazy-image src={s.icon} class="subway-icon" />)
      });
    }

    features.push({
      'name': 'Web ID',
      'value': `#${this.item.id}`
    });

    return features;
  }

  render() {
    console.log(this.item, this.neighborhoods);

    return (
      <Host class="page-listing-body-component">
        <section class="section no-padding">
          <page-listing-image-slider item={this.item} />
        </section>
        <section class="section listing-main">
          <div class={{'listing-right': true, 'has-slider': !!this.item.images.length}}>
            <div class="listing-price">
              <div>
                <span class="rate">{formatMoney(this.item.rate)}</span> per month
              </div>
            </div>

            <div class="checkin-form">
              <div class="available-date">
                <span class="date">{formatDate(this.item.available_date, 'm.d.y')}</span> next available date
              </div>


            </div>
          </div>

          <div class="listing-left">
            <div class="listing-description">
              <h2>{this.item.title}</h2>

              <p>{this.item.description}</p>
            </div>

            { this.item.floor_plans.length ?
              <div class="listing-section">
                <div class="title">
                  Floor Plan
                </div>

                { this.item.floor_plans.map(f => <lazy-image src={f} class="full-img" />) }
              </div>
              : null
            }

            { this.item.video_url ?
              <div class="listing-section">
                <div class="title">
                  Video
                </div>

                <maintain-ratio width={583} height={328}>
                  <youtube-video src={this.item.video_url} class="listing-video" />
                </maintain-ratio>

              </div>
              : null
            }

            <div class="listing-section">
              <div class="title">
                Features
              </div>

              {
                this.getFeatures().map((f, i) => {

                  let classObj = { feature: true };
                  classObj[`feature-${i}`] = true;

                return (
                <div class={classObj}>
                  <div class="feature-name">
                    { f.name }
                  </div>
                  <div class="feature-value">
                    { f.value }
                  </div>
                </div>
                );
                })
              }
            </div>


            {
              this.item.amenities.length ?
              <div class="listing-section">
                <div class="title">
                  Amenities
                </div>

                {
                  this.item.amenities.map(a => <div class="amenity flex-vertical-center">
                    <div class="amenity-icon">
                      <lazy-image src={a.icon} />
                    </div>

                    { a.name }
                  </div>
                  )
                }
              </div>
              : null
            }


            <div class="listing-section">
              <div class="title">
                Location
              </div>

              <listing-map item={this.item} />
            </div>

            {
              this.neighborhoods.map(n => <div class="listing-section">
                  <div class="title">
                    { n.name }
                  </div>

                  <div class="neighborhood">
                    <lazy-image src={n.image} class="neighborhood-image" />

                    <div class="description">
                      { n.description }

                      <a href="" class="button-dark">
                        Explore
                      </a>
                    </div>
                  </div>
                </div>
              )
            }

          </div>
        </section>
      </Host>
    )
  }
}

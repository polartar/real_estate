@php
    setlocale(LC_MONETARY, 'en_US.UTF-8');
@endphp
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Booking Details</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,900|Source+Sans+Pro:400,600,700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <style>
            @page { margin: 15px; }

            html, body {
                background-color: #fff;
                color: black;
                font-size: 14px;
                font-family: 'Source Sans Pro', sans-serif;
                padding: 0;
                margin: 15px;
            }

            .title {
                font-size: 18px;
                text-transform: uppercase;
                font-weight: bold;
                padding: 16px 0 10px 0;
            }

            .detail-item {
                width: 100%;
                height: 22px;
                margin: 0;
                padding: 0;
            }

            .detail-item.bg-highlight {
                background-color: rgba(5,115,101,.1);
                margin-left: -10px;
                padding-left: 10px;
            }

            .detail-item.highlight {
                color: #057365;
            }

            .detail-item .center {
                width: 40px;
                text-align: center;
                display: inline-block;
                min-height: 1px;
                vertical-align: middle;
                margin: 0;
                padding: 0;
            }

            .detail-item .description {
                width: 170px;
                white-space: nowrap;
                display: inline-block;
                vertical-align: middle;
                margin: 0;
                padding: 0;
            }

            .detail-item .value {
                width: 150px;
                white-space: nowrap;
                display: inline-block;
                text-align: right;
                vertical-align: middle;
                margin: 0;
                padding: 0;
            }

            .section {
                width: 380px;
                padding-bottom: 8px;
            }

            .section-right {
                height: 300px;
                width: 300px;
                background-color: green;
                display: inline-block;
            }

            .arrow-right {
                transform: rotate(180deg);
            }

            .section.breakdown {
                border-top: 1px dashed black;
                border-bottom: 1px dashed black;
            }

            .frame {
                width: 740px;
                height: 1000px;
                margin: 0;
            }

            .content-left {
                width: 390px;
                height: 1000px;
                float: left;
            }

            .content-right {
                width: 320px;
                height: 1000px;
                float: right;
                padding-top: 5px;
            }

            .card {
                width: 100%;
                border: 1px solid #969499;
                font-size: 12px;
            }

            .neighborhood {
                padding-bottom: 4px;
            }

            .card-title {
                font-size: 20px;
                font-weight: 900;
                padding-top: 16px;
            }

            .card-content {
                padding: 0 8px 8px 8px;
            }

            .price {
                padding-bottom: 2px;
            }

            .bed-bath img {
                width: 14px;
                margin-right: 8px;
            }

            .bed-bath .divider {
                display: inline-block;
                padding: 0 8px;
                vertical-align: middle;
            }

            .webid {
                padding-top: 2px;
            }

            .feature-image {
                width: 100%;
                height: auto;
            }

            .guarantee {
                margin-top: 16px;
                background-color: rgba(5,115,101,.1);
                padding: 16px;
                height: 150px;
            }

            .guarantee-title {
                font-weight: 700;
            }

            .guarantee-title img {
                width: 14px;
                vertical-align: middle;
            }

            .building-type {
                padding: 8px 0;
            }

            .building-type img {
                width: 10px;
                margin-right: 3px;
            }

            .building-type span {
                padding-right: 8px;
            }
        </style>
    </head>
    <body>
        <div class="frame">
            <div class="content-left">
                <div class="section">
                    <div class="title">
                        Booking Details
                    </div>

                    <div class="detail-item">
                        <div class="description">Check In {{$checkin}}</div>
                        <div class="center"><img src="{{env('APP_URL')}}/assets/images/icons/arrow.svg" class="arrow-right" ></div>
                        <div class="value">Check Out {{$checkout}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="description">Monthly Rent:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney($apartment->rate) }}</div>
                    </div>
                    <div class="detail-item">
                        <div class="description">Night Rate:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(400) }}</div>
                    </div>
                    <div class="detail-item">
                        <div class="description">Total Term:</div>
                        <div class="center"></div>
                        <div class="value">3 Months and 14 days</div>
                    </div>
                    <div class="detail-item">
                        <div class="description">Number of guests:</div>
                        <div class="center"></div>
                        <div class="value">{{$guests}}</div>
                    </div>
                </div>

                <div class="section breakdown">
                    <div class="title">
                        Total Breakdown
                    </div>
                    <div class="detail-item">
                        <div class="description">Background Checks:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(300) }}</div>
                    </div>

                    <div class="detail-item">
                        <div class="description">Rent:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(12000) }}</div>
                    </div>

                    <div class="detail-item">
                        <div class="description">Tax:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(543) }}</div>
                    </div>

                    <div class="detail-item">
                        <div class="description">Utilities:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(600) }}</div>
                    </div>

                    <div class="detail-item">
                        <div class="description">Service fee:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(2000) }}</div>
                    </div>

                    <div class="detail-item highlight">
                        <div class="description">Refundable deposit:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(3000) }}</div>
                    </div>

                    <div class="detail-item">
                        <div class="description">Total:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(19340) }}</div>
                    </div>
                </div>

                <div class="section">
                    <div class="title">
                        Payment Timeline
                    </div>
                    <div class="detail-item bg-highlight">
                        <div class="description">Due now to reserve:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(9000) }}</div>
                    </div>

                    <div class="detail-item">
                        <div class="description">Due upon lease signing:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(4000) }}</div>
                    </div>

                    <div class="detail-item">
                        <div class="description">Due by check in ({{ $checkin }}):</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(9000) }}</div>
                    </div>

                    <div class="detail-item">
                        <div class="description">Future Payments:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(-3000) }}</div>
                    </div>

                    <div class="detail-item highlight">
                        <div class="description">Deposit Refund:</div>
                        <div class="center"></div>
                        <div class="value">{{ Apt212::formatMoney(-3000) }}</div>
                    </div>
                </div>
            </div>

            <div class="content-right">
                <div class="card">
                    @if(count($apartment->images))
                        <img src="{{ $apartment->images[0]->medium }}" class="feature-image" />
                    @endif

                    <div class="card-content">
                        <div class="card-title">{{ $apartment->cross_streets }}</div>
                        <div class="neighborhood">{{ $apartment->neighborhoods[0]->name }}</div>

                        <div class="price">{{ Apt212::formatMoney($apartment->rate) }} /month</div>

                        <div class="bed-bath">
                            <img src="{{env('APP_URL')}}/assets/images/icons/bedroom.png"> {{ $apartment->bedroom_type->name }} {{ is_numeric($apartment->bedroom_type->name) ? 'Bedroom' : '' }}
                            <div class="divider">|</div>
                            <img src="{{env('APP_URL')}}/assets/images/icons/bathroom.png"> {{ $apartment->bathrooms }} Bathroom
                        </div>
                        <div class="building-type">
                            <span>{{ $apartment->building_type->name}}</span>

                            @for($i = 0; $i < $apartment->building_type->rating; $i++)
                                <img src="{{env('APP_URL')}}/assets/images/icons/star-gold.png">
                            @endfor

                            @for ($i = 0; $i < 5 - $apartment->building_type->rating; $i++)
                                <img src="{{env('APP_URL')}}/assets/images/icons/star-grey.png">
                            @endfor
                        </div>

                        <div class="webid">
                            Web Id #{{ $apartment->id }}
                        </div>
                    </div>
                </div>

                <div class="guarantee">
                    <div class="guarantee-title">
                        <img src="{{env('APP_URL')}}/assets/images/icons/shield_guarantee.png"> APT212 Tenant Guarantee
                    </div>

                    <p>
                        APT212 vets each hold and property and guarantees each listing is accurate as described.  No Hidden Fees.
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>

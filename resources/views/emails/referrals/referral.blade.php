@extends('emails.layout')

@section('content')
    <div class="salutation">
        Hi, {{ $referral->referral_name }}
    </div>

    <div class="message">
        <p>
            We received your email from {{ $referral->referrer_name }} who let us know you are searching for a furnished apartment.
        </p>
        <p>
            With a wide-range of beautiful properties and an easy online booking process, APT212 is the #1 source for furnished short-term rentals in New York City.
            We'd love to help you find your perfect home and a booking agent will be contacting you shortly to learn more about your requirements.
        </p>
        <p>
            We look forward to working with you!
        </p>
    </div>

    <div class="signature">
        <p>
            Best,<br>
            The APT212 Team
        </p>
    </div>
@endsection

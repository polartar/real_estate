@extends('emails.layout')

@section('content')
    <div class="salutation">
        Hi, {{ $referral->referrer_name }}
    </div>

    <div class="message">
        <p>
            Thank you for referring {{ $referral->referral_name }} to APT212.
        </p>
        <p>
            As an agency, one of the highest compliments we can receive is a referral.
        </p>
        <p>
            So you can rest assured that they will receive the very best service.
        </p>
        <p>
            We will make sure that their requirements are being met and to help them find their next apartment.
        </p>
        <p>
            We'll notify you as soon as we find the perfect property to ask for your mailing address so you can receive your $200 gift card.  Thank you and have a great day!
        </p>
    </div>

    <div class="signature">
        <p>
            Best,<br>
            The APT212 Team
        </p>
    </div>
@endsection

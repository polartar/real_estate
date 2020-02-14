@extends('emails.layout')

@section('content')
    <div class="salutation">
        Dear {{ $data->firstname }} {{ $data->lastname }}
    </div>

    <div class="message">
        <p>
            Thank you for your payment of {{ Apt212::formatMoney($data->amount)}} for listing {{ $data->webid }}
        <p>
    </div>

    <div class="signature">
        <p>
            Best,<br>
            The APT212 Team
        </p>
    </div>
@endsection

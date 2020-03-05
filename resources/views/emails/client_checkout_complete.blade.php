@extends('emails.layout')

@section('content')
    <div class="salutation">
        Dear {{ $data->firstname }} {{ $data->lastname }}
    </div>

    <div class="message">
        <p>
            First Name: {{ $data->firstname }}<br>
            Last Name:  {{ $data->lastname }}<br>
            Email: {{ $data->email }}<br>
            Phone: {{ $data->phone }}<br><br>

            Agent: {{ $data->using_agent }}<br>
            @if($data->using_agent === 'yes')
                Agent: {{ $data->agent }}<br>
            @endif

            WebId: {{ $data->webid }}<br><br>
            Amount Paid: {{ Apt212::formatMoney($data->amount) }}<br><br>
        <p>
    </div>

    <div class="signature">
        <p>
            Best,<br>
            The APT212 Team
        </p>
    </div>
@endsection

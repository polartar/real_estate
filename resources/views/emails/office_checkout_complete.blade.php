@extends('emails.layout')

@section('content')
    <div class="message">
        <p>
            Payment as been received for a booking:<br><br>

            Transaction ID: {{ $data->transaction_id}}<br><br>

            Name: {{ $data->firstname }} {{ $data->lastname }}<br>
            Email: {{ $data->email }}<br>
            Phone: {{ $data->phone }}<br><br>

            WebId: {{ $data->webid }}<br><br>
            Amount: {{ Apt212::formatMoney($data->amount) }}

            @if($data->using_agent === 'yes')
                Agent: {{ $data->agent}}
            @endif
        <p>
    </div>

    <div class="signature">
        <p>
            Best,<br>
            The APT212 Team
        </p>
    </div>
@endsection

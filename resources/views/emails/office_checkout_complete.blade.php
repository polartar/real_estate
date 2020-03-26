@extends('emails.layout')

@section('content')
    <div class="message">
        <p>
            Payment as been received for a booking:<br><br>

            First Name: {{ $data->firstname }}<br>
            Last Name:  {{ $data->lastname }}<br>
            Email: {{ $data->email }}<br>
            Phone: {{ $data->phone }}<br><br>

            Agent: {{ $data->using_agent }}<br>
            @if($data->using_agent === 'yes')
                Agent: {{ $data->agent }}<br>
            @endif

            WebId: {{ $data->webid }}<br><br>
            Amount Paid: {{ Apt212::formatMoney($data->amount, 2) }}<br><br>

            Transaction ID: {{ $data->transaction_id }}

        <p>
    </div>

    <div class="signature">
        <p>
            Best,<br>
            The APT212 Team
        </p>
    </div>
@endsection

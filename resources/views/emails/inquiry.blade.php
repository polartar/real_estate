@extends('emails.layout')

@section('content')
    <div class="salutation">
        Hi there
    </div>

    <div class="message">
        <p>
            A new inquiry was made through the website:
        </p>

        @if (isset($data['name']) && $data['name'])
        <p>
            Name: {{ $data['name'] }}
        </p>
        @endif

        @if (isset($data['email']) && $data['email'])
        <p>
            Email: {{ $data['email'] }}
        </p>
        @endif

        @if (isset($data['phone']) && $data['phone'])
        <p>
            Phone: {{ $data['phone'] }}
        </p>
        @endif

        @if (isset($data['size']) && $data['size'])
        <p>
            Apt Size: {{ $data['size'] }}
        </p>
        @endif

        @if (isset($data['arrival']) && $data['arrival'])
        <p>
            Arrival: {{ $data['arrival'] }}
        </p>
        @endif

        @if (isset($data['departure']) && $data['departure'])
        <p>
            Departure: {{ $data['departure'] }}
        </p>
        @endif

        @if (isset($data['budget']) && $data['budget'] && $data['budget'] != 'Budget')
        <p>
            Budget: {{ $data['budget'] }}
        </p>
        @endif

        @if (isset($data['message']) && $data['message'])
        <p>
            Message: <br> {{ $data['message'] }}
        </p>
        @endif
    </div>

    <div class="signature">
        <p>
            Best,<br>
            The APT212 Team
        </p>
    </div>
@endsection

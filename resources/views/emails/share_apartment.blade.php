@extends('emails.layout')

@section('content')
    <div class="salutation">
        Hi there
    </div>

    <div class="message">
        <p>
            Someone you know found this listing and decided to share it with you!
        </p>

        @if (isset($data['message']) && $data['message'])
        <p>
            {{ $data['message'] }}
        </p>
        @endif

        @foreach ($data['urls'] as $url)
            <p>
                <a href="{{ $url }}">{{ $url }}</a>
            </p>
        @endforeach
    </div>

    <div class="signature">
        <p>
            Best,<br>
            The APT212 Team
        </p>
    </div>
@endsection

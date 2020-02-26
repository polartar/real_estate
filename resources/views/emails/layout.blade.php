<html lang="en-US">
<head>
    <meta charset="uft-8">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,900|Source+Sans+Pro:400,600,700&display=swap" rel="stylesheet">
    <style>
        body {
            font-size: 12px;
            font-family: 'Source Sans Pro', sans-serif;
        }

        .logo {
            width: 126px;
        }

        .header {
            padding: 15px 0 30px 0;
        }

        .wrapper {
            max-width: 600px;
            margin: 0 auto;
        }

        .message {
            padding-top: 30px;
        }

        .signature {
            padding-top: 30px;
        }

        .footer {
            background-color: black;
            color: white;
            padding: 26px;
            text-align: center;
            margin-top: 55px;
            font-size: 11px;
        }

        .footer a {
            color: white;
            text-transform: uppercase;
            font-weight: bold;
            text-decoration: none;
        }

        .social-media {
            padding-top: 26px;
        }

        .social-media a {
            padding: 0 10px 0 10px;
        }

        .social-media a img {
            height: 15px;
        }

        .app-links {
            padding-top: 25px;
        }

        .app-links img {
            display: inline-block;
            height: 40px;
        }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <img src="{{ asset('assets/images/logo.svg')}}" class="logo">
    </div>

    @yield('content')

    <div class="footer">
        <div style="margin-bottom: 16px">
            <img src="{{ asset('assets/images/logo-icon-white.svg') }}" style="max-width: 30px">
        </div>

        <div style="margin-bottom: 21px;">
            <strong>#1 SOURCE</strong> FOR NEW YORK FURNISHED APARTMENTS</strong>
        </div>

        <div>
            <a href="{{ url('search') }}">SEARCH APARTMENTS &nbsp;<img src="{{ asset('assets/images/icons/search-icon-white.svg') }}" style="display: inline-block; margin-top: -2px; height: 11px; vertical-align: middle;"></a>

            &nbsp;&nbsp;&bull;&nbsp;&nbsp;

            <a href="{{ url('refer') }}">REFER US</a>

            &nbsp;&nbsp;&bull;&nbsp;&nbsp;

            <a href="{{ url('about') }}">WHAT IS APT212</a>
        </div>

        <div class="social-media">
            <a href="https://www.facebook.com/Apt212/" target="_blank" rel="noopener">
              <img src="{{ asset('assets/images/icons/social-media/facebook-square.svg') }}" alt="Facebook" />
            </a>

            <a href="https://twitter.com/apt212" target="_blank" rel="noopener">
              <img src="{{ asset('assets/images/icons/social-media/twitter.svg') }}" alt="Twitter" />
            </a>

            <a href="https://google.com/+APT212NewYork" target="_blank" rel="noopener">
              <img src="{{ asset('assets/images/icons/social-media/instagram.svg') }}" alt="Instagram" />
            </a>

            <a href="https://youtube.com/c/APT212NewYork" target="_blank" rel="noopener">
              <img src="{{ asset('assets/images/icons/social-media/youtube.svg') }}" alt="Youtube" />
            </a>
        </div>

        {{-- <div class="app-links">
            <a href="https://apt212.com">
                <img src="{{ asset('assets/images/google_play.png') }}">
            </a>

            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;

            <a href="https://apt212.com">
                <img src="{{ asset('assets/images/app_store.svg') }}">
            </a>
        </div> --}}
    </div>
</div>
<body>
</html>

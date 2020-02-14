<html lang="en-US">
<head>
    <meta charset="uft-8">
    <style>
        div {
            color: red;
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

        .footer {
            background-color: black;
            color: white;
            padding: 26px;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <img src="{{ asset('assets/images/logo.svg')}}" class="logo">
    </div>

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

    <div class="footer">
        <img src="{{ asset('assets/images/logo-icon-white.svg') }}" style="max-width: 100px">
    </div>
</div>
<body>
</html>

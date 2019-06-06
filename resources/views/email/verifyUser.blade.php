<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" >
    <title >New user's verification</title>
</head>
<body>
<h1 class="mail">Thank you for registration, {{$user->name}}!</h1>

<p class="mail">
    Please click <a href='{{ url("register/confirm/{$user->token}") }}'> on link </a> for verification!
</p>
</body>
</html>
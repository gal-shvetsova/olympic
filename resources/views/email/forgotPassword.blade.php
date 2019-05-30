<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset password</title>
</head>
<body>
<h1>Your link to reset password</h1>

<p>
    Перейдите <a href='{{ url("password/reset/{$user->token}") }}'>по ссылке </a>чтобы завершить регистрацию!
</p>
</body>
</html>
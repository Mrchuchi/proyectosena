<!DOCTYPE html>
<html>
<head>
    <title>Recuperación de Contraseña</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2d3748; margin-bottom: 20px;">Recuperación de Contraseña</h2>
        
        <p>Has solicitado restablecer tu contraseña. Utiliza el siguiente código para continuar con el proceso:</p>
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="color: #4a5568; letter-spacing: 5px; font-size: 32px;">{{ $code }}</h1>
        </div>
        
        <p>Este código expirará en 15 minutos por razones de seguridad.</p>
        
        <p style="color: #718096; font-size: 14px; margin-top: 30px;">
            Si no solicitaste este cambio, puedes ignorar este mensaje.
        </p>
    </div>
</body>
</html>

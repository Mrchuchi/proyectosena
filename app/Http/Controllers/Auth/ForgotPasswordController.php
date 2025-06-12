<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users'],
        ]);

        // Generar código de 6 dígitos
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Guardar el código en cache por 30 minutos
        Cache::put('password_reset_' . $request->email, $code, Carbon::now()->addMinutes(30));

        // Enviar el código por correo
        Mail::send('emails.reset-password', ['code' => $code], function($message) use ($request) {
            $message->to($request->email)
                    ->subject('Código de Recuperación de Contraseña');
        });

        return Inertia::render('Auth/VerifyCode', [
            'email' => $request->email,
            'status' => 'Hemos enviado un código de verificación a tu correo electrónico.'
        ]);
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
            'email' => ['required', 'email'],
        ]);

        $cachedCode = Cache::get('password_reset_' . $request->email);

        if (!$cachedCode || $cachedCode !== $request->code) {
            return back()->withErrors(['code' => 'El código ingresado no es válido o ha expirado.']);
        }

        // Usar el mismo código como token
        $token = $cachedCode;

        return redirect()->route('password.reset', ['token' => $token, 'email' => $request->email]);
    }
}

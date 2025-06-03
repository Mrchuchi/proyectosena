<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        if (!$request->user() || !$request->user()->hasPermission($permission)) {
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json([
                    'error' => 'No tienes permiso para realizar esta acción',
                    'required_permission' => $permission
                ], 403);
            }
            
            return redirect()->route('dashboard')->with('error', 'No tienes permiso para realizar esta acción');
        }

        return $next($request);
    }
}
<?php

return [
    'required' => 'El campo :attribute es obligatorio.',
    'email' => 'El campo :attribute debe ser una dirección de correo válida.',
    'exists' => 'El :attribute seleccionado no existe.',
    'min' => [
        'string' => 'El campo :attribute debe tener al menos :min caracteres.',
    ],
    'confirmed' => 'La confirmación de :attribute no coincide.',
    'string' => 'El campo :attribute debe ser una cadena de texto.',

    'attributes' => [
        'email' => 'correo electrónico',
        'password' => 'contraseña',
        'code' => 'código',
    ],

    'custom' => [
        'email' => [
            'exists' => 'No encontramos ninguna cuenta con este correo electrónico.',
        ],
        'password' => [
            'min' => 'La contraseña debe tener al menos :min caracteres.',
        ],
    ],
];

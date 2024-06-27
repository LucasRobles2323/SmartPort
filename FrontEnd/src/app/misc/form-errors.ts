const mensajesErr =  {
    required: 'Campo requerido',
    requiredTrue: 'Campo requerido',
    email: 'Formato de email inválido',
    minlength: 'Mínimo de caracteres no alcanzado',
    maxlength: 'Máximo de caracteres excedido',
    pattern: 'Formato inválido',
    rutDv: 'Dígito verificador inválido',
    rutFormat: 'Formato de RUT inválido (sin puntos, con guión)',
    password: 'Contraseña inválida',
    passwordConfirm: 'Las contraseñas no coinciden',
}

type FormError = keyof typeof mensajesErr;

export {mensajesErr};
export type {FormError};
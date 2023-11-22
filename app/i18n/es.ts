const es = {
    common: {
      ok: "¡Si!",
      cancel: "Cancelar",
      back: "Atras",
      logOut: "Cerrar Sesión",
    },
    welcomeScreen: {
      postscript:
        "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
      readyForLaunch: "Your app, almost ready for launch!",
      exciting: "(ohh, this is exciting!)",
      letsGo: "Let's go!",
    },
    errorScreen: {
      title: "¡Ocurrio un error!",
      friendlySubtitle:
        "Ocurrio en error. Pongase en contacto con los desarrolladores de esta aplicación",
      reset: "Reiniciar",
      traceTitle: "Error en %{name} de la pila",
    },
    emptyStateComponent: {
      generic: {
        heading: "Nada que mostrar...",
        content: "No se encontrar datos. Intente refrescar manualmente",
        button: "Refrescar",
      },
    },
  
    errors: {
      invalidEmail: "El correo es incorrecto",
    },
    loginScreen: {
      signIn: "Inicio",
      enterDetails:
        "Introduzca los datos necesarios para iniciar su sesión. Si no tienes una cuenta porque no intenta registrarse",
      emailFieldLabel: "Correo",
      passwordFieldLabel: "Contraseña",
      emailFieldPlaceholder: "Introduzca su dirección de correo",
      passwordFieldPlaceholder: "Contraseña",
      tapToSignIn: "Entrar",
      hint: "Ayuda: debe utilizar una dirección de correo válida y una contraseña :)",
    },
    fieldsValidation:{
         blank: "No puede estar vacío",
         min: "Debe tener como mínimo {{min}} caracteres",
         email: "Debe ser una dirección de correo"
    }
  }
  
  export default es
  export type Translations = typeof es
  
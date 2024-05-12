const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },

  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    signIn: "Sign In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Tap to sign in!",
    hint: "Hint: you can use any email address and your favorite password :)",
    details:"",
    register:"Don't have account. Touch to register"
  },
  registerScreen:{
    nameFieldLabel: "Name",
    lastnameFieldLabel: "Last name",
    passwordFieldLabel: "Repeat Password",
    label:"Register",
    confirm:"Register"
  },
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
        
    },
  },
  fieldsValidation:{
    blank: "Can't be blank",
    min: "Must be at least {{min}} characters",
    email: "Must be a email address",
    notEqual: "Password are not equal"
},
  orderScreen:{
    title: "Mis ordernes",
    complete: 'Mostrar solo las completadas',
    empty: 'Usted no tiene ninguna orden',
    message: "Intente refrescar. Quizas obtenga algún resultado"
  },
  productScreen:{
    title: "Productos disponibles",
    empty: 'No existen productos disponibles',
    message: "Intente refrescar los productos. Quizas obtenga algún resultado"
  },
  cartScreen:{
    title: "Productos en el carrito",
    error: "Ocurrio un error al obtener el carrito",
    delete: "¿ Desea eliminar el producto {{product}} ?",
    deletebutton: "Delete",
    empty: "El carrito esta vacío",
    message: "Agregue algunos productos a su carrito para que se vea tan repleto como este",
    order: "No. Orden: ",
    delivery: "Costo de envío: ",
    total: "Total: ",
    date: "Fecha:  ",
    pay: "Pagar pedido",
    gopay: "Sera redireccionado a la web para realizar el pago de su pedido. Cuando termine el pago presione el botón atrás (<-) de la app"
  },
  errorApi:{
    timeout: "Timeout", 
    cannotConnect: "Cannot connect", 
    server: "Server error",
    unauthorized: "Unauthorized", 
    forbidden: "Forbidden", 
    notFound: "Not found", 
    rejected: "Rejected", 
    unknown: "Unknown",
    badData: "Bad data",
    "400": "Not Found"
  },
  addressScreen:{
    empty: "Sin direcciones registradas",
    message: "Aquí se mostraran las direcciones para la entrega de productos",
    delete: "¿ Desea eliminar esta dirección ?",
    nameFieldLabel: "Nombre",
    streetFieldLabel: "Calle y numero",
    street2FieldLabel: "Calle 2",
    zip:"Codigo Postal",
    city:"Reparto",
    state: "Estado/Provincia",
    label: "Registrar dirección",
    phone: "Móvil",
    update: "Update",
    save: "Save"
  },
  MessagesScreen:{
    label:"Confirmation",
    login:"Go to login",
    email: "Go to email apk",
    confirm: "La cuenta de usuario ha sido creada, por favor revisa tu correo y accede al enlace que le hemos enviado para activar su cuenta"
    
  },
}

export default en
export type Translations = typeof en

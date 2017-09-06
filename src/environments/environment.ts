// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC14gNPSWgeA3XdwoAjo63HHYNqJGBxrbU",
    authDomain: "etsimed.firebaseapp.com",
    databaseURL: "https://etsimed.firebaseio.com",
    projectId: "etsimed",
    storageBucket: "",
    messagingSenderId: "76136990116"
  },
  translation: {
    url: "assets/languages/"
  },
  apiURL: "http://13.81.201.245:5001",
  
};


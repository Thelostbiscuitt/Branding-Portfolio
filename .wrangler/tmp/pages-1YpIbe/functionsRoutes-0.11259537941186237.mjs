import { onRequestPost as __api_contact_js_onRequestPost } from "/home/thelostbiscuit/Desktop/Creations/Branding-Portfolio-master/functions/api/contact.js"
import { onRequest as __Music__file__js_onRequest } from "/home/thelostbiscuit/Desktop/Creations/Branding-Portfolio-master/functions/Music/[file].js"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  {
      routePath: "/Music/:file",
      mountPath: "/Music",
      method: "",
      middlewares: [],
      modules: [__Music__file__js_onRequest],
    },
  ]
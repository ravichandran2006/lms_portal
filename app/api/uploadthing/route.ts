import { createRouteHandler } from "uploadthing/server";

import { ourFileRouter } from "./core";


const handlers = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
export { handlers as GET, handlers as POST };

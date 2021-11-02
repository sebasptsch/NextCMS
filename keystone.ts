/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/
import redis from "redis";
import { config } from "@keystone-next/keystone";
import { redisSessionStore } from "@keystone-next/session-store-redis";
// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import lists from "./schema";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";
import { storedSessions } from "@keystone-next/keystone/session";
import express from "express";
export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: "sqlite",
      url: "file:./config/keystone.db",
      useMigrations: true,
    },
    experimental: {
      enableNextJsGraphqlApiEndpoint: true,
      generateNodeAPI: true,
      generateNextGraphqlAPI: true,
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      getAdditionalFiles: [
        () => [
          {
            mode: "write",
            outputPath: "next.config.js",
            src: `module.exports = { ...require('@keystone-next/keystone/static/next.config.js'), images: { domains: ["pbs.twimg.com"], disableStaticImages: true } }`,
          },
        ],
      ],
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => {
        console.log(context);
        return !!context.session?.data;
      },
    },
    graphql: {
      apolloConfig: {
        introspection: process.env.NODE_ENV !== "production",
      },
    },
    server: {
      extendExpressApp: (app) => {
        app.use("/images", express.static("public/images"));
      },
      port: 3002,
    },
    session,
    lists,
    images: {
      upload: "local",
      local: {
        storagePath: "config/images",
        baseUrl: "/images",
      },
    },
  })
);

import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LineProvider from 'next-auth/providers/line';

import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption
    secret: 'your-secret-here',
    providers: [
      // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: process.env.GOOGLE_ID_AUTH,
            clientSecret: process.env.GOOGLE_SECRET_AUTH
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        FacebookProvider.default({
            clientId: process.env.FACEBOOK_ID_AUTH,
            clientSecret: process.env.FACEBOOK_SECRET_AUTH
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        LineProvider.default({
            clientId: process.env.LINE_ID_AUTH,
            clientSecret: process.env.LINE_SECRET_AUTH
        })
    ]
})
  
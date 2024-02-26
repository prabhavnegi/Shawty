import { NextResponse, NextRequest } from "next/server";
import getLink from "./lib/getlink";
import { getParam } from "./lib/utility";
export const config = {
    matcher: [
      /*
       * Match all paths except for:
       * 1. /api routes
       * 2. /_next (Next.js internals)
       * 3. /_static (inside /public)
       * 4. all root files inside /public (e.g. /favicon.ico)
       */
      "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
  };

export default async function middleware(req: NextRequest) {

  const domain = process.env.domain
  const host  = process.env.host
  const {hostname, url, path} = getParam(req)
    if( hostname === host) {
      if(path === "/") 
        return NextResponse.redirect(new URL("/home",req.url))
      if(path !== "/generate" && path !== "/home")
        return getLink(req,path)
    }
    // else {
    //     let url = new URL("/home", domain)
    //     url.href = domain+"/home"
    //     console.log(NextResponse.redirect(new URL("/home", domain)))
    //     return NextResponse.redirect(url)
    //   }
}    
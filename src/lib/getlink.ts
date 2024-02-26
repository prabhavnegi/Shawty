import { NextRequest, NextResponse } from "next/server";
import { checkEnvironment } from "./utility";


export default async function getLink(req: NextRequest, path : string) {

    try {
        const data = new FormData()
        data.append('target', path.substring(1));
        const x = await (await fetch(checkEnvironment().concat("/api/getFullLink/").concat(path.substring(1)))).json()
        return NextResponse.redirect(new URL(x))

    }
    catch(error) {
        console.log("error in get link"+error)
        return NextResponse.redirect(new URL("/home",req.url))
    }
}
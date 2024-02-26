import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest } from "next/server";

export async function checkRequest(req: NextRequest) {

    console.log("Check request working")
    const data = await req.formData()
    const target = data.get("target")
    if(target)
        return target.toString()
    else {
        throw new Error("Invalid formdata")
    }
}

export function getParam(req: NextRequest ) {
    
    const hostname = req.headers.get("host")?.split(".")[0]
    const url = req.nextUrl.clone();
    const path = url.pathname
    return {hostname, url, path}
}
export function checkEnvironment() {
    let base_url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://example.com"; // https://v2ds.netlify.app
    return base_url;
};
import { NextRequest } from "next/server"
import {prisma} from "@/lib/prismaClient"
import { createClient } from 'redis';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {

    const slug = params.slug

    const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    const value = await client.get(slug);
    const expiry = await client.get(slug+"exp")

    if(value && expiry) {
        if(Number(expiry) > (+ new Date())) {
            console.log("Cache hit")
            return Response.json(value)
        }
        console.log("cache hit but expired. Deleting..")
        await client.del(slug)
        await client.del(slug+"exp")
        await prisma.links.deleteMany({
            where:{
                pokemon:slug
            }
        })
        return Response.json("No match",{status:404})
    }
    const data = await prisma.links.findFirst({
        where : {
            pokemon:slug
        }
    })
    if(data) {
        console.log("Cache miss. Called database")
        if(Number(data) > (+ new Date())) {
            await client.set(data.pokemon, data.url,{"EX":600});
            await client.set(data.pokemon+"exp",data.expiry)
            return Response.json(data.url)
        }
        console.log("Expired. Deleting..")
        await prisma.links.deleteMany({
            where:{
                pokemon:slug
            }
        })
    }
    return Response.json("No match",{status:404})
}


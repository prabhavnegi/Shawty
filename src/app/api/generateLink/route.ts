import getPokemon from "@/lib/getPokemon";
import {checkRequest} from "@/lib/utility";
import { NextRequest, NextResponse} from "next/server";
import { prisma } from "@/lib/prismaClient";
import { createClient } from 'redis';
import { url } from "inspector";


export async function POST(req:NextRequest) {
    try {
        var target = await checkRequest(req)
        var check
        var i = 1
        do {
            var data : any = await getPokemon()
            check = await prisma.links.findUnique({
                where : {
                    id: Number(data?.id)
                }
            })
            i += 1
        } while(check || i == 100)

        if(i == 100) new Error("1")

        const client = await createClient({url:process.env.NODE_ENV === "production"? process.env.REDIS_URL :"" })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

        const expiry = String((+ new Date()) + 1800000)
        await client.set(data.name+"exp", expiry,{"EX": 600});
        await client.set(data.name, target,{"EX": 600});
        await client.disconnect();
        await prisma.links.create({
            data:{
                "id": Number(data.id),
                "pokemon" : data.name,
                "url" : target,
                "expiry": expiry

            },
        })
        data["exp"] = expiry
        return NextResponse.json(data)
        
    }
    catch(error) {
        console.log(error)
        if (error === "1") return NextResponse.json({},{status:503})
        return NextResponse.json(error,{status:400})
    }
}
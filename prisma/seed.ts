
import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";

import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
    const memberPromises = membersData.map(async member => {
        return prisma.user.create({
            data: {
                email: member.email,
                emailVerified: new Date(),
                name: member.name,
                passwordHash: await hash('password2024A~@', 10),
                image:member.image,
                member:{
                    create:{
                        dateOfBirth: new Date(member.dateOfBirth),
                        gender:member.gender,
                        name:member.name,
                        created: new Date(member.created),
                        updated: new Date(member.lastActive),
                        description:member.description,
                        city:member.country,
                        country:member.country,
                        image:member.image,
                        photos:{
                            create:{
                                url:member.image
                            }
                        }
                    }
                }
            },
        });
    });
}



async function main() {
    await seedMembers();
}

main().catch(e=>{
    console.log(e);
    process.exit(1);
 }).finally(async ()=>{
    await prisma.$disconnect();
 })
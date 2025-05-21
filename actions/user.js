"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    console.log("user",user);
    if (!user) throw new Error("User not found");

    try {
        const result = db.$transaction(
            async (tx) => {
                // First check if industry exists
                let subIndustryInsight = await tx.subIndustryInsight.findUnique({
                    where: {
                        SubIndustry: data.SubIndustry
                    }
                });
    console.log("subII1",subIndustryInsight);
                // If industry doesn't exist, create it with default values
                if (!subIndustryInsight) {
                    const insights = await generateAIInsights(data.SubIndustry);
                    subIndustryInsight = await tx.subIndustryInsight.create({
                        data: {
                            SubIndustry: data.SubIndustry,
                            salaryRanges:[],
                            growthRate:0,
                            demandLevel:"Medium",
                            topSkills:[],
                            marketOutlook:"Neutral",
                            keyTrends:[],
                            recommendedSkills:[],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        },
                    });
    console.log("subII2",subIndustryInsight);
                }
                // Now update the user
                const updatedUser = await tx.user.update({
                    where:{
                        id:user.id
                    },
                    data:{
                        subIndustry:data.subIndustry,
                        experience:data.experience,
                        bio:data.bio,
                        skills:data.skills,
                    }
                })
                console.log("updatedUSE",updateUser)
                return {updatedUser,subIndustryInsight}
            }, {
            timeout: 10000
        })
        return result.user;
    } catch (error) {
        console.log("Error in updating user while onboarding", error.message);
        throw new Error("Failed to update User Profile");
    }
}





export async function userOnboardingStatus() {
     const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not found");
    try {
        const user  = await db.user.findUnique({
            where:{
                clerkUserId:userId
            },
            select:{
                SubIndustry:true
            }
        });
        return{
            isOnboarded : !!user?.SubIndustry
        }
    } catch (error) {
        console.log("Error in checkingOnboarding Status", error.message);
        throw new Error("Failed to check User Onboarding");
    }
}
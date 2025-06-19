"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { generateAiInsights } from "./dashboard";

export async function UserSubIndustry() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not found");
    return user.subIndustry;
}

export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not found");

    try {
        const result = db.$transaction(
            async (tx) => {
                // First check if industry exists
                let subIndustryInsight = await tx.SubIndustryInsight.findUnique({
                    where: {
                        subIndustry: data.subIndustry
                    }
                });
                // If industry doesn't exist, create it with default values
                if (!subIndustryInsight) {
                    const insights = await generateAiInsights(data.subIndustry);

                    subIndustryInsight = await db.SubIndustryInsight.create({
                        data: {
                            subIndustry: data.subIndustry,
                            ...insights,
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        },
                    });
                }
                // Now update the user
                const updatedUser = await tx.User.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        subIndustry: data.subIndustry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    }
                });
                return { updatedUser, subIndustryInsight };
            }, {
            timeout: 10000
        })
        return { success: true, ...result }
    } catch (error) {
        console.log("Error in updating user while onboarding", error.message);
        throw new Error("Failed to update User Profile");
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function userOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.User.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    if (!user) {
        throw new Error("User not found after retry");
    }

    try {
        const userSend = await db.User.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                subIndustry: true
            }
        });
        return {
            isOnboarded: !!userSend?.subIndustry
        }
    } catch (error) {
        console.log("Error in checkingOnboarding Status", error.message);
        throw new Error("Failed to check User Onboarding");
    }
}
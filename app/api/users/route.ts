import User from "@/lib/models/User";

import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    console.log("starting try");
    const { userId } = auth();
    console.log("implimenting current userId");
    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    console.log(`checked ${userId} and starting connenting db`);

    await connectToDB();

    console.log("db connection succeeded");

    let user = await User.findOne({ clerkId: userId });

    console.log(`${user} is searched from existed users`)
    // When the user sign-in for first time, immediately we create a new user
    if (!user) {
      user = await User.create({ clerkId: userId});
      await user.save();
    }
    console.log("user created if it was not existed")

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[user_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

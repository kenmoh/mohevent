"use client";
import { IEvent } from "@/lib/mongodb/db/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();

  const userId = user?.publicMetadata.userId as string;
  const eventEnded = new Date(event.endDateTime) < new Date();
  return (
    <div className="items-center gap-3">
      {/* Cannot purchase past events */}
      {eventEnded ? (
        <p className="text-xl text-red-400">
          Sorry, tickests are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="rounded-full bg-blue-500" size={"lg"}>
              <Link href={"/sign-in"}>Get Ticket</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;

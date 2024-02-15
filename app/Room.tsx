"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";

export function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider id="my-room" 
    initialPresence={{cursor:null}}
    initialStorage={{
      code: new LiveObject({value:"//write something"}),
    }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
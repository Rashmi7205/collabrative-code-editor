"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";
import { useParams } from "next/navigation";


export function Room({ children }: { children: ReactNode}) {

  const {id} = useParams();

  return (
    <RoomProvider id={id}
    initialPresence={{cursor:null}}
    initialStorage={{
      code: new LiveObject({
        content:null,
        language:"javascript",
        name:"script.js",
        stdin:null,
        output:null
      }),
    }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { use } from "react";




export default function Home() {
  const createFile = useMutation(api.files.createTask);
  const files = useQuery(api.files.getFiles);
  console.log(files);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton> 
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((file: any) => {
        return <div key={file._id}>{file.text}</div>
    
      })};

      <Button onClick={() => {
      createFile({ text: "My new file"})
      }}>Create</Button>
    
    </main>
  );
}

// components/ProfileHeader.jsx
"use client";

import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileHeader({ profile, onEdit }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background ">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="font-bold text-xl text-primary">Profile</h1>
        <div className="flex items-center gap-4">
          {profile.isVerified ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-1" />
              Verified
            </div>
          ) : (
            <div className="flex items-center text-yellow-600">
              <AlertCircle className="w-5 h-5 mr-1" />
              Unverified
            </div>
          )}
          <Button variant="outline" onClick={onEdit}>
            Edit Profile
          </Button>
        </div>
      </div>
    </header>
  );
}

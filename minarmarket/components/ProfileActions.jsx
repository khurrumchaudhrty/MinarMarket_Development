// components/ProfileActions.jsx
"use client";

import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

export function ProfileActions({ profile, onVerifyRequest, onDeactivateRequest }) {
  return (
    <div className="flex flex-col space-y-4">
      {!profile.isVerified && (
        <Button onClick={onVerifyRequest} variant="outline" className="flex items-center gap-2">
          <UserCheck className="w-4 h-4" />
          Request Verification
        </Button>
      )}
      <Button onClick={onDeactivateRequest} variant="destructive" className="w-full">
        Request Account Deactivation
      </Button>
    </div>
  );
}

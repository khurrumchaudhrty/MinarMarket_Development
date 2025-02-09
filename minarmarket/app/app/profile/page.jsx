"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { ProfileActions } from "@/components/ProfileActions";
import { getProfile } from "@/lib/api/profile";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile data...");
        const data = await getProfile();
        console.log("Profile data fetched:", data);

        if (!data || !data.name) {
          console.error("Profile data is empty or invalid:", data);
          throw new Error("Invalid profile data");
        }

        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile. Please try again later.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHeader profile={profile} onEdit={() => setIsEditing(true)} />
      <div className="container mx-auto py-8 px-4 flex-1">
        <Card className="max-w-2xl mx-auto">
          <CardContent>
            <ProfileForm
              profile={profile}
              setProfile={setProfile}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onSubmit={() => {}}
            />
          </CardContent>
          <Separator className="my-4" />
          <CardFooter>
            <ProfileActions profile={profile} onVerifyRequest={() => {}} onDeactivateRequest={() => {}} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

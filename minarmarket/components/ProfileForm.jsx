// components/ProfileForm.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileForm({ profile, setProfile, isEditing, setIsEditing, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={profile.name}
            disabled={!isEditing}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            minLength={4}
            maxLength={30}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            disabled={!isEditing}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Member Since</Label>
          <p className="text-sm text-muted-foreground">
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {isEditing && (
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      )}
    </form>
  );
}

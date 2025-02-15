"use client";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getIndividualComplaint, updateComplaintStatus } from "@/lib/api/admin";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { useRouter } from "next/navigation"; // Import useRouter
import { useState } from "react";


export default function IndividualReportsSection() {
  const { id } = useParams();
  const [adminNotes, setAdminNotes] = useState("");
  const router = useRouter(); // Initialize router


  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["individual-complaint", id],
    queryFn: () => getIndividualComplaint(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: ({ status, notes }) => updateComplaintStatus(id, status, notes),
    onSuccess: () => {
      alert("Complaint has been updated successfully.");
      refetch(); // Refresh data
      router.push("/app/admin/reports");
    },
    onError: (err) => {
      alert(`Error: ${err.message}`);
    },
  });
  const handleStatusUpdate = (status) => {
    if (!adminNotes.trim()) {
      alert("Admin notes are required.");
      return;
    }
    mutation.mutate({ status, notes: adminNotes });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const { complaint } = data || {};
  return (
    <div className="flex min-h-screen flex-col px-4">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
        <AdminSidebar />
        <main className="flex w-full flex-col gap-8 p-4 border rounded-lg shadow-sm">
          <h1 className="text-xl font-bold">Complaint Details</h1>
          <div className="space-y-2">
            <p><strong>Complaint Type:</strong> {complaint.complaintType}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>Reporter:</strong> {complaint.reporterId.name} ({complaint.reporterId.email})</p>
            <p><strong>Reported User:</strong> {complaint.reportedUserId.name} ({complaint.reportedUserId.email})</p>
            <p><strong>Status:</strong> {complaint.status}</p>
            <p><strong>Created At:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>

            {/* Only display admin notes if it's not null or empty */}
            {complaint.adminNotes && (
              <p><strong>Admin Notes:</strong> {complaint.adminNotes}</p>
            )}

            {complaint.resolvedAt && (
              <p><strong>Resolved At:</strong> {new Date(complaint.resolvedAt).toLocaleString()}</p>
            )}

          </div>

          <div>
            <label className="block font-semibold">Admin Notes (Required)</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Enter admin notes here..."
            />
          </div>

          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => handleStatusUpdate("Resolved")}
            >
              Mark as Resolved
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => handleStatusUpdate("Rejected")}
            >
              Reject Complaint
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

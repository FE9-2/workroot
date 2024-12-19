"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { userRoles } from "@/constants/userRoles";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

export default function MyAlbaForm() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else {
        if (user.role === userRoles.OWNER) {
          router.push("/my-workform/owner");
        } else {
          router.push("/my-workform/applicant");
        }
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return null;
}

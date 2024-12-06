import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserResponse } from "@/types/response/user";
import toast from "react-hot-toast";

interface UpdateProfileData {
  name?: string;
  nickname?: string;
  phoneNumber?: string;
  imageUrl?: string;
  storeName?: string;
  storePhoneNumber?: string;
  location?: string;
}

export const useUser = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery<{ user: UserResponse | null }>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/users/me", {
          withCredentials: true,
        });

        const userData = {
          user: response.data,
        };

        return userData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return { user: null };
          } else {
            toast.error("사용자 정보를 불러오는 데 실패했습니다." + error.response?.data.message);
          }
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await axios.patch("/api/users/me", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("프로필이 성공적으로 수정되었습니다.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "프로필 수정에 실패했습니다.";
        console.error("Profile update error:", {
          status: error.response?.status,
          data: error.response?.data,
        });
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("프로필 수정 중 오류가 발생했습니다.");
      }
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/images/upload", formData, {
        withCredentials: true,
      });
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "이미지 업로드에 실패했습니다.";
        toast.error(errorMessage);
      } else {
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
      }
    },
  });

  const updateProfile = async (data: UpdateProfileData, imageFile?: File | null) => {
    try {
      let imageUrl = data.imageUrl;

      if (imageFile) {
        const uploadResponse = await uploadImageMutation.mutateAsync(imageFile);
        if (uploadResponse?.url) {
          imageUrl = uploadResponse.url;
        }
      }

      await updateProfileMutation.mutateAsync({
        ...data,
        imageUrl,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    user: userQuery.data?.user || null,
    refetch: userQuery.refetch,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    isPending: userQuery.isPending,
    updateProfile,
    isUpdating: updateProfileMutation.isPending || uploadImageMutation.isPending,
  };
};

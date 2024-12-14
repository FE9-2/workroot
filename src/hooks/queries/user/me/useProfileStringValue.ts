import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";

const VALID_USER_INFO_KEY = "isUserInfoValid";

export const useProfileStringValue = () => {
  const queryClient = useQueryClient();

  const { data: isUserInfoValid = false } = useQuery({
    queryKey: [VALID_USER_INFO_KEY],
    queryFn: async () => {
      const userData = queryClient.getQueryData<{ user: any }>(["user"]);
      const user = userData?.user;

      if (!user) return false;
      const isProfileComplete = Object.values(user).some(
        (value) => value !== null && value !== undefined && value === "string"
      );

      if (isProfileComplete) {
        toast.error("내 정보를 수정하세요", {
          duration: 3000,
          position: "top-center",
          id: "profile-string-toast",
        });
      }

      return isProfileComplete;
    },
    enabled: !!queryClient.getQueryData(["user"]),
    staleTime: 0,
    refetchOnMount: true,
  });

  // user 쿼리 변경 감지
  useQuery<unknown, Error, unknown, QueryKey>({
    queryKey: ["user"],
    queryFn: () => null,
    enabled: false,
    onSettled: () => {
      // user 데이터가 변경되면 profileStringValue 쿼리 재실행
      queryClient.invalidateQueries({ queryKey: [VALID_USER_INFO_KEY] });
    },
  } as UseQueryOptions);

  const { mutate: setIsUserInfoValid } = useMutation({
    mutationFn: (newValue: boolean) => Promise.resolve(newValue),
    onSuccess: (newValue) => {
      queryClient.setQueryData([VALID_USER_INFO_KEY], newValue);
    },
  });

  return { isUserInfoValid, setIsUserInfoValid };
};

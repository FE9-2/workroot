import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";

const PROFILE_STRING_KEY = "profileStringValue";

export const useProfileStringValue = () => {
  const queryClient = useQueryClient();

  const { data: hasStringValue = false } = useQuery({
    queryKey: [PROFILE_STRING_KEY],
    queryFn: async () => {
      const userData = queryClient.getQueryData<{ user: any }>(["user"]);
      const user = userData?.user;

      if (!user) return false;

      const hasString = Object.values(user).some(
        (value) => value !== null && value !== undefined && value === "string"
      );

      if (hasString) {
        toast.error("내 정보를 수정하세요", {
          duration: 3000,
          position: "top-center",
          id: "profile-string-toast",
        });
      }

      return hasString;
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
      queryClient.invalidateQueries({ queryKey: [PROFILE_STRING_KEY] });
    },
  } as UseQueryOptions);

  const { mutate: setHasStringValue } = useMutation({
    mutationFn: (newValue: boolean) => Promise.resolve(newValue),
    onSuccess: (newValue) => {
      queryClient.setQueryData([PROFILE_STRING_KEY], newValue);
    },
  });

  return { hasStringValue, setHasStringValue };
};

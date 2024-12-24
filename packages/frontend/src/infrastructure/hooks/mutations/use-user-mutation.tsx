import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { apiInstance } from "../../../lib/api"

interface IUserMutation {
  useDeleteUserMutation: () => UseMutationResult<{
    status: true;
}, Error, void, unknown>
}

export const useUserMutation = (): IUserMutation => {
  const useDeleteUserMutation = () => useMutation({
    mutationFn: apiInstance.deleteUser,
  });

  return {
    useDeleteUserMutation,
  }
}

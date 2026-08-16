import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { executionsService } from "@/services";
import type { Agent, AIProviderId } from "@/types";

export const useExecutions = () =>
  useQuery({
    queryKey: ["executions"],
    queryFn: () => executionsService.list(),
  });

export const useCreateExecution = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      agent: Agent;
      inputs: Record<string, string>;
      providerId?: AIProviderId;
      model?: string;
    }) => executionsService.create(params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["executions"] });
    },
  });
};

export const useClearExecutions = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => executionsService.clear(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["executions"] });
    },
  });
};

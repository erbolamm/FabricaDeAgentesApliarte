import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsService } from "@/services";
import type { Agent, AgentCategory, AgentDraft } from "@/types";

export const useAgents = (filters?: { category?: AgentCategory | null; search?: string }) =>
  useQuery({
    queryKey: ["agents", filters?.category ?? null, filters?.search ?? ""],
    queryFn: () => agentsService.list(filters),
  });

export const useAgentBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: ["agent", "slug", slug],
    queryFn: () => (slug ? agentsService.getBySlug(slug) : Promise.resolve(null)),
    enabled: !!slug,
  });

export const useAgentById = (id: string | undefined) =>
  useQuery({
    queryKey: ["agent", "id", id],
    queryFn: () => (id ? agentsService.getById(id) : Promise.resolve(null)),
    enabled: !!id,
  });

export const useCreateAgent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (draft: AgentDraft) => agentsService.create(draft),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["agents"] });
    },
  });
};

export const useDeleteAgent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => agentsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["agents"] });
    },
  });
};

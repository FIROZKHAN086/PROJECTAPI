import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiError } from "@/src/lib/api";
import type {
  Project,
  ProjectsResponse,
  ProjectResponse,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/src/types/project";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "http://localhost:5000";

export function useProjects() {
  return useQuery<ProjectsResponse, ApiError>({
    queryKey: ["projects"],
    queryFn: () =>
      apiFetch<ProjectsResponse>("/api/project/get", {
        method: "GET",
      }),
  });
}

export function useProject(id: string) {
  return useQuery<ProjectResponse, ApiError>({
    queryKey: ["project", id],
    queryFn: () =>
      apiFetch<ProjectResponse>(`/api/project/getproject/${id}`, {
        method: "GET",
      }),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; data: Project }, ApiError, CreateProjectPayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("tech", payload.tech);
      formData.append("liveDemo", payload.liveDemo);
      formData.append("github", payload.github);
      formData.append("category", payload.category);
      if (payload.image) formData.append("image", payload.image);
      if (payload.featured) formData.append("featured", payload.featured);
      if (payload.customFields) formData.append("customFields", payload.customFields);

      const res = await fetch(`${API_BASE}/api/project/creat`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new ApiError(res.status, data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation<
    { success: boolean; data: Project },
    ApiError,
    { id: string } & UpdateProjectPayload
  >({
    mutationFn: async ({ id, ...payload }) => {
      const formData = new FormData();
      if (payload.title) formData.append("title", payload.title);
      if (payload.description) formData.append("description", payload.description);
      if (payload.tech) formData.append("tech", payload.tech);
      if (payload.liveDemo) formData.append("liveDemo", payload.liveDemo);
      if (payload.github) formData.append("github", payload.github);
      if (payload.category) formData.append("category", payload.category);
      if (payload.featured !== undefined) formData.append("featured", payload.featured);
      if (payload.image) formData.append("image", payload.image);
      if (payload.customFields) formData.append("customFields", payload.customFields);

      const res = await fetch(`${API_BASE}/api/project/update/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new ApiError(res.status, data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; message: string }, ApiError, string>({
    mutationFn: (id) =>
      apiFetch<{ success: boolean; message: string }>(`/api/project/delete/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

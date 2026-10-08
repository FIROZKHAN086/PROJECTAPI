import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FolderOpen, ChevronsUpDown, Star, Code, Badge } from "lucide-react";
import {Label} from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const ProjectSelector = ({ 
  projects,
  selectedProjectId,
  setSelectedProjectId,
  isLoading,
  isPending,
}: {
  projects: Array<{
    ProjectID: string;
    title: string;
    category?: string;
    featured: boolean;
    tech?: string[];
  }>;
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  isLoading: boolean;
  isPending: boolean;
}) => {
  const selectedProject = projects.find(
    (p) => p.ProjectID === selectedProjectId
  );

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
        <FolderOpen className="size-4 text-[#60A5FA]" />
        Select Project
      </Label>

      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={isLoading || isPending}
          className="flex h-auto min-h-12 w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[#FAFAFA] transition-colors hover:border-white/25 disabled:pointer-events-none disabled:opacity-50"
        >
          {selectedProject ? (
            <div className="flex flex-1 items-center gap-3 text-left">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#4ADE80]/10">
                <FolderOpen
                 className="size-4 text-[#4ADE80]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{selectedProject.title}</p>
                <p className="text-xs text-[#6B6B6B]">
                  {selectedProject.category || "Uncategorized"}
                </p>
              </div>
              {selectedProject.featured && (
                <Badge className="border border-[#FACC15]/20 bg-[#FACC15]/10 text-[9px] text-[#FACC15]">
                  <Star className="mr-1 size-2.5" />
                  Featured
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-sm text-[#6B6B6B]">
              Choose a project to edit...
            </span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={6}
          className="max-h-[24rem] w-[--radix-dropdown-menu-trigger-width] overflow-y-auto border border-white/10 bg-[#0C0C12] p-1 text-[#FAFAFA] shadow-2xl"
        >
          <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-[#A3A3A3]">
            Your Projects
          </div>
          <DropdownMenuSeparator className="bg-white/10" />

          {projects.length === 0 ? (
            <div className="px-4 py-6 text-center text-[#6B6B6B]">
              <FolderOpen className="mx-auto mb-2 size-10 opacity-20" />
              <p className="text-sm">No projects found</p>
              <p className="text-xs">Create a new project to get started</p>
            </div>
          ) : (
            <DropdownMenuRadioGroup
              value={selectedProjectId}
              onValueChange={setSelectedProjectId}
            >
              {projects.map((project) => {
                const isSelected = selectedProjectId === project.ProjectID;
                return (
                  <DropdownMenuRadioItem
                    key={project.ProjectID}
                    value={project.ProjectID}
                    className="cursor-pointer text-[#D8CFBC] focus:bg-white/[0.06] focus:text-[#FAFAFA]"
                  >
                    <div className="flex w-full items-center gap-3">
                      <div
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          isSelected ? "bg-[#4ADE80]/20" : "bg-white/5"
                        )}
                      >
                        <FolderOpen
                          className={cn(
                            "size-4",
                            isSelected ? "text-[#4ADE80]" : "text-[#6B6B6B]"
                          )}
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium text-[#FAFAFA]">
                          {project.title}
                        </p>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2">
                          <span className="text-xs text-[#6B6B6B]">
                            {project.category || "Uncategorized"}
                          </span>
                          {project.featured && (
                            <Badge className="border border-[#FACC15]/20 bg-[#FACC15]/10 text-[9px] text-[#FACC15]">
                              <Star className="mr-1 size-2.5" />
                              Featured
                            </Badge>
                          )}
                          {project.tech && project.tech.length > 0 && (
                            <Badge className="border border-[#C084FC]/20 bg-[#C084FC]/10 text-[9px] text-[#C084FC]">
                              <Code className="mr-1 size-2.5" />
                              {project.tech.length} tech
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
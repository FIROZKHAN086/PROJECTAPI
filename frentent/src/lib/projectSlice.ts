import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "@/src/types/project";

interface ProjectState {
  selectedProject: Project | null;
  filter: "all" | "active" | "archived";
  searchQuery: string;
}

const initialState: ProjectState = {
  selectedProject: null,
  filter: "all",
  searchQuery: "",
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProject(state, action: PayloadAction<Project | null>) {
      state.selectedProject = action.payload;
    },
    setFilter(state, action: PayloadAction<"all" | "active" | "archived">) {
      state.filter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSelectedProject, setFilter, setSearchQuery } = projectSlice.actions;
export default projectSlice.reducer;

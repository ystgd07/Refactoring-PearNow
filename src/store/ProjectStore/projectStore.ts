import { create } from 'zustand';

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
  team?: string;
}

export interface ProjectData {
  no: number;
  title: string;
  detail: string;
  start_date: string | null;
  end_date: string | null;
  members: ProjectMember[];
}

export interface SearchUser {
  id: string;
  name: string;
  team?: string | null;
  mail?: string | null;
}

interface ProjectState {
  // 프로젝트 생성 관련 상태
  projectData: ProjectData;
  page: number;
  isValidStep1: boolean;
  isValidStep2: boolean;
  searchKeyword: string;
  selectedMembers: ProjectMember[];
  isSearchResultOpen: boolean;
  projects: ProjectData[];
  isLoading: boolean;
  error: Error | null;
  isModalOpen: boolean;
  isHover: boolean;
  selectedProject: ProjectData | null;
  searchResults: SearchUser[];
  isSearching: boolean;

  // 액션
  updateTitle: (title: string) => void;
  updateDetail: (detail: string) => void;
  updateDates: (dates: {
    start_date: string | null;
    end_date: string | null;
  }) => void;
  setSearchKeyword: (keyword: string) => void;
  addMember: (member: ProjectMember) => void;
  removeMember: (memberId: string) => void;
  updateMemberRole: (memberId: string, role: string) => void;
  toggleSearchResult: () => void;
  nextPage: () => void;
  prevPage: () => void;
  resetProjectData: () => void;
  validateStep1: () => void;
  validateStep2: () => void;
  updateSelectedMembers: (members: ProjectMember[]) => void;
  updatePeerName: (name: string) => void;
  setProjects: (projects: ProjectData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  openProjectModal: () => void;
  setIsHover: () => void;
  setIsHoverFalse: () => void;
  setSelectedProject: (project: ProjectData) => void;
  setSearchResults: (results: SearchUser[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  closeProjectModal: () => void;
}

const initialProjectData: ProjectData = {
  no: 0,
  title: '',
  detail: '',
  start_date: null,
  end_date: null,
  members: [],
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  // 상태
  projectData: initialProjectData,
  page: 1,
  isValidStep1: false,
  isValidStep2: false,
  searchKeyword: '',
  selectedMembers: [],
  isSearchResultOpen: false,
  projects: [],
  isLoading: false,
  error: null,
  isModalOpen: false,
  isHover: false,
  selectedProject: null,
  searchResults: [],
  isSearching: false,

  // 액션
  updateTitle: (title) => {
    set((state) => ({
      projectData: { ...state.projectData, title },
    }));
    get().validateStep1();
  },

  updateDetail: (detail) => {
    set((state) => ({
      projectData: { ...state.projectData, detail },
    }));
    get().validateStep1();
  },

  updateDates: (dates) => {
    set((state) => ({
      projectData: {
        ...state.projectData,
        start_date: dates.start_date,
        end_date: dates.end_date,
      },
    }));
    get().validateStep1();
  },

  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),

  addMember: (member) => {
    set((state) => ({
      selectedMembers: [...state.selectedMembers, member],
    }));
    get().validateStep2();
  },

  removeMember: (memberId) => {
    set((state) => ({
      selectedMembers: state.selectedMembers.filter((m) => m.id !== memberId),
    }));
    get().validateStep2();
  },

  updateMemberRole: (memberId, role) => {
    set((state) => ({
      selectedMembers: state.selectedMembers.map((member) =>
        member.id === memberId ? { ...member, role } : member,
      ),
    }));
  },

  toggleSearchResult: () =>
    set((state) => ({
      isSearchResultOpen: !state.isSearchResultOpen,
    })),

  nextPage: () => set((state) => ({ page: state.page + 1 })),

  prevPage: () => set((state) => ({ page: state.page - 1 })),

  resetProjectData: () =>
    set({
      projectData: initialProjectData,
      page: 1,
      isValidStep1: false,
      isValidStep2: false,
      searchKeyword: '',
      selectedMembers: [],
      isSearchResultOpen: false,
    }),

  validateStep1: () =>
    set((state) => ({
      isValidStep1: Boolean(
        state.projectData.title &&
          state.projectData.detail &&
          state.projectData.start_date &&
          state.projectData.end_date &&
          new Date(state.projectData.start_date) <
            new Date(state.projectData.end_date),
      ),
    })),

  validateStep2: () =>
    set((state) => ({
      isValidStep2: state.selectedMembers.length > 0,
    })),

  updateSelectedMembers: (members) => {
    set({ selectedMembers: members });
    get().validateStep2();
  },

  updatePeerName: (name) => set({ searchKeyword: name }),

  setProjects: (projects) => set({ projects }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  openProjectModal: () => set({ isModalOpen: true }),

  setIsHover: () => set({ isHover: true }),

  setIsHoverFalse: () => set({ isHover: false }),

  setSelectedProject: (project) => set({ selectedProject: project }),

  setSearchResults: (results) => set({ searchResults: results }),

  setIsSearching: (isSearching) => set({ isSearching }),

  closeProjectModal: () =>
    set({
      isModalOpen: false,
      page: 1,
      projectData: initialProjectData,
      selectedMembers: [],
      searchKeyword: '',
      isSearchResultOpen: false,
    }),
}));

const initialState = {
    projects: [
      {
        id: 25,
        name: "Info-Apps",
        start_date: "Feb-26-2025",
        end_date: "Feb-28-2025",
        status: "In-Progress",
        stage: "Planning",
        expanded: false,
        tabs: {
          active_tab: "user_stories",
          user_stories: [
            { id: 101, name: "User Story 1", status: "To-Do" },
            { id: 102, name: "User Story 2", status: "In Progress" },
          ],
          releases: [
            { id: 201, name: "Release 1", date: "Mar-10-2025" },
            { id: 202, name: "Release 2", date: "Mar-20-2025" },
          ],
        },
      },
    ],
  };
  
  export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_PROJECT":
        return {
            ...state,
            projects: [
              ...state.projects,
              {
                ...action.payload, 
                expanded: false, 
                tabs: {
                  active_tab: "user_stories", 
                  user_stories: [], 
                  releases: [],
                },
              },
            ],
          };
          case "TOGGLE_PROJECT_EXPANDED":
            return {
              ...state,
              projects: state.projects.map((project) =>
                project.id === action.payload
                  ? { ...project, expanded: !project.expanded } // Toggle expanded
                  : project
              ),
            };

            case "CHANGE_TAB":
                return {
                    ...state,
                    projects: state.projects.map((project) =>
                        project.id === action.payload.id
                            ? { 
                                ...project, 
                                tabs: { 
                                    ...project.tabs, 
                                    active_tab: action.payload.tab 
                                } 
                              }
                            : project
                    ),
                };
  
      default:
        return state;
    }
  };
  
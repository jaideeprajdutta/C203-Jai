import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Mock data for institutions and roles
const mockInstitutions = [
  { id: 'inst_1', name: 'University of Technology', type: 'University' },
  { id: 'inst_2', name: 'City Medical College', type: 'Medical College' },
  { id: 'inst_3', name: 'Regional Engineering Institute', type: 'Engineering College' },
  { id: 'inst_4', name: 'State Business School', type: 'Business School' },
  { id: 'inst_5', name: 'Government Arts College', type: 'Arts College' },
];

const mockRoles = [
  { id: 'role_1', name: 'Student', description: 'Student of the institution' },
  { id: 'role_2', name: 'Faculty', description: 'Teaching staff member' },
  { id: 'role_3', name: 'Admin', description: 'Administrative staff' },
  { id: 'role_4', name: 'Grievance Officer', description: 'Handles grievance processing' },
];

const mockCategories = [
  'Academic Issues',
  'Hostel/Accommodation',
  'Harassment/Discrimination',
  'Fee/Financial Issues',
  'Infrastructure Problems',
  'Administrative Issues',
  'Other'
];

// Initial state
const initialState = {
  user: {
    selectedInstitution: null,
    selectedRole: null,
    isAuthenticated: false,
  },
  institutions: mockInstitutions,
  roles: mockRoles,
  categories: mockCategories,
  grievances: [],
  notifications: [],
  chatbotOpen: false,
};

// Action types
const actionTypes = {
  SELECT_INSTITUTION: 'SELECT_INSTITUTION',
  SELECT_ROLE: 'SELECT_ROLE',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  SUBMIT_GRIEVANCE: 'SUBMIT_GRIEVANCE',
  UPDATE_GRIEVANCE_STATUS: 'UPDATE_GRIEVANCE_STATUS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  TOGGLE_CHATBOT: 'TOGGLE_CHATBOT',
  LOAD_MOCK_GRIEVANCES: 'LOAD_MOCK_GRIEVANCES',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SELECT_INSTITUTION:
      return {
        ...state,
        user: {
          ...state.user,
          selectedInstitution: action.payload,
        },
      };

    case actionTypes.SELECT_ROLE:
      return {
        ...state,
        user: {
          ...state.user,
          selectedRole: action.payload,
        },
      };

    case actionTypes.LOGIN_USER:
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: true,
        },
      };

    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: {
          selectedInstitution: null,
          selectedRole: null,
          isAuthenticated: false,
        },
      };

    case actionTypes.SUBMIT_GRIEVANCE:
      const newGrievance = {
        id: uuidv4(),
        referenceId: `GRV${Date.now().toString().slice(-6)}`,
        ...action.payload,
        status: 'Submitted',
        submittedAt: new Date(),
        lastUpdated: new Date(),
        updates: [
          {
            id: uuidv4(),
            status: 'Submitted',
            message: 'Your grievance has been submitted successfully.',
            timestamp: new Date(),
            updatedBy: 'System',
          },
        ],
      };

      return {
        ...state,
        grievances: [...state.grievances, newGrievance],
      };

    case actionTypes.UPDATE_GRIEVANCE_STATUS:
      return {
        ...state,
        grievances: state.grievances.map((grievance) =>
          grievance.id === action.payload.grievanceId
            ? {
                ...grievance,
                status: action.payload.status,
                lastUpdated: new Date(),
                updates: [
                  ...grievance.updates,
                  {
                    id: uuidv4(),
                    status: action.payload.status,
                    message: action.payload.message,
                    timestamp: new Date(),
                    updatedBy: action.payload.updatedBy,
                  },
                ],
              }
            : grievance
        ),
      };

    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: uuidv4(),
            ...action.payload,
            timestamp: new Date(),
          },
        ],
      };

    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    case actionTypes.TOGGLE_CHATBOT:
      return {
        ...state,
        chatbotOpen: !state.chatbotOpen,
      };

    case actionTypes.LOAD_MOCK_GRIEVANCES:
      return {
        ...state,
        grievances: action.payload,
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const selectInstitution = (institution) => {
    dispatch({ type: actionTypes.SELECT_INSTITUTION, payload: institution });
  };

  const selectRole = (role) => {
    dispatch({ type: actionTypes.SELECT_ROLE, payload: role });
    dispatch({ type: actionTypes.LOGIN_USER }); // Automatically authenticate user after role selection
    
    // Load mock grievances for demonstration
    setTimeout(() => {
      loadMockGrievances(state.user.selectedInstitution?.id);
    }, 500);
  };

  const loginUser = () => {
    dispatch({ type: actionTypes.LOGIN_USER });
  };

  const logoutUser = () => {
    dispatch({ type: actionTypes.LOGOUT_USER });
  };

  const submitGrievance = (grievanceData) => {
    dispatch({ type: actionTypes.SUBMIT_GRIEVANCE, payload: grievanceData });
    
    // Add success notification
    addNotification({
      type: 'success',
      title: 'Grievance Submitted',
      message: `Your grievance has been submitted successfully. Reference ID: ${grievanceData.referenceId}`,
    });
  };

  const updateGrievanceStatus = (grievanceId, status, message, updatedBy) => {
    dispatch({
      type: actionTypes.UPDATE_GRIEVANCE_STATUS,
      payload: { grievanceId, status, message, updatedBy },
    });
    
    // Add notification for status update
    addNotification({
      type: 'info',
      title: 'Status Updated',
      message: `Grievance status updated to: ${status}`,
    });
  };

  const addNotification = (notification) => {
    dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notification });
  };

  const removeNotification = (notificationId) => {
    dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: notificationId });
  };

  const toggleChatbot = () => {
    dispatch({ type: actionTypes.TOGGLE_CHATBOT });
  };

  const loadMockGrievances = (institutionId = null) => {
    const targetInstitutionId = institutionId || state.user.selectedInstitution?.id;
    
    const mockGrievances = [
      {
        id: uuidv4(),
        referenceId: 'GRV001234',
        category: 'Academic Issues',
        description: 'Issues with course registration system not working properly',
        status: 'In Progress',
        priority: 'High',
        submittedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        updatedAt: new Date(Date.now() - 86400000), // 1 day ago
        isAnonymous: true,
        institutionId: targetInstitutionId,
        updates: [
          {
            id: uuidv4(),
            status: 'Submitted',
            message: 'Your grievance has been submitted successfully.',
            timestamp: new Date(Date.now() - 86400000 * 2),
            updatedBy: 'System',
          },
          {
            id: uuidv4(),
            status: 'Under Review',
            message: 'Your grievance is being reviewed by the academic department.',
            timestamp: new Date(Date.now() - 86400000 * 1.5),
            updatedBy: 'Academic Officer',
          },
          {
            id: uuidv4(),
            status: 'In Progress',
            message: 'We are working on resolving the technical issues with the registration system.',
            timestamp: new Date(Date.now() - 86400000),
            updatedBy: 'IT Department',
          },
        ],
      },
      {
        id: uuidv4(),
        referenceId: 'GRV001235',
        category: 'Infrastructure Problems',
        description: 'Library air conditioning not working properly, making it difficult to study',
        status: 'Resolved',
        priority: 'Medium',
        submittedAt: new Date(Date.now() - 86400000 * 5),
        updatedAt: new Date(Date.now() - 86400000 * 0.5),
        isAnonymous: false,
        institutionId: targetInstitutionId,
        updates: [
          {
            id: uuidv4(),
            status: 'Submitted',
            message: 'Your grievance has been submitted successfully.',
            timestamp: new Date(Date.now() - 86400000 * 5),
            updatedBy: 'System',
          },
          {
            id: uuidv4(),
            status: 'Assigned',
            message: 'Your grievance has been assigned to the Facilities Management team.',
            timestamp: new Date(Date.now() - 86400000 * 4),
            updatedBy: 'Grievance Officer',
          },
          {
            id: uuidv4(),
            status: 'In Progress',
            message: 'Maintenance team has been scheduled to repair the AC system.',
            timestamp: new Date(Date.now() - 86400000 * 2),
            updatedBy: 'Facilities Manager',
          },
          {
            id: uuidv4(),
            status: 'Resolved',
            message: 'AC system has been repaired and is now working properly.',
            timestamp: new Date(Date.now() - 86400000 * 0.5),
            updatedBy: 'Facilities Manager',
          },
        ],
      },
      {
        id: uuidv4(),
        referenceId: 'GRV001236',
        category: 'Administrative Issues',
        description: 'Difficulty getting transcript copies from the registrar office',
        status: 'Submitted',
        priority: 'Low',
        submittedAt: new Date(Date.now() - 86400000 * 1),
        updatedAt: new Date(Date.now() - 86400000 * 1),
        isAnonymous: false,
        institutionId: targetInstitutionId,
        updates: [
          {
            id: uuidv4(),
            status: 'Submitted',
            message: 'Your grievance has been submitted successfully.',
            timestamp: new Date(Date.now() - 86400000 * 1),
            updatedBy: 'System',
          },
        ],
      },
    ];

    dispatch({ type: actionTypes.LOAD_MOCK_GRIEVANCES, payload: mockGrievances });
  };

  const value = {
    state,
    selectInstitution,
    selectRole,
    loginUser,
    logoutUser,
    submitGrievance,
    updateGrievanceStatus,
    addNotification,
    removeNotification,
    toggleChatbot,
    loadMockGrievances,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export default AppContext;
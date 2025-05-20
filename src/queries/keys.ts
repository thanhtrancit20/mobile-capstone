// Import environment variables
import { VITE_API_BASE_URL_CHAT, VITE_API_BASE_URL_COURSE, VITE_API_BASE_URL_IDENTITY, VITE_API_BASE_URL_PROFILE, VITE_NOTIFICATION_API_BASE_URL, VITE_API_BASE_URL_BLOG } from "@env";

const BASE_URLS = {
  DEFAULT: VITE_API_BASE_URL_IDENTITY,
  PROFILE: VITE_API_BASE_URL_PROFILE,
  NOTIFICATION: VITE_NOTIFICATION_API_BASE_URL,
  COURSE: VITE_API_BASE_URL_COURSE,
  BLOG: VITE_API_BASE_URL_BLOG,
  CHAT: VITE_API_BASE_URL_CHAT,
};

// Enum for endpoints
export enum API_ENDPOINTS {
  IDENTITY = '/identity',
  PROFILE = '/profile',
  NOTIFICATION = '/notifications',
  COURSE = '/course-svc',
  BLOG = '/post-svc',
  CHAT = '/chat-svc',
}


// Map endpoints to their base URLs
const ENDPOINT_BASE_URL_MAP: Record<API_ENDPOINTS, string> = {
  [API_ENDPOINTS.IDENTITY]: BASE_URLS.DEFAULT,
  [API_ENDPOINTS.PROFILE]: BASE_URLS.PROFILE,
  [API_ENDPOINTS.NOTIFICATION]: BASE_URLS.NOTIFICATION,
  [API_ENDPOINTS.COURSE]: BASE_URLS.COURSE,
  [API_ENDPOINTS.BLOG]: BASE_URLS.BLOG,
  [API_ENDPOINTS.CHAT]: BASE_URLS.CHAT,
};

// Function to construct URLs dynamically
const getApiUrl = (endpoint: API_ENDPOINTS): string => {
  const baseUrl = ENDPOINT_BASE_URL_MAP[endpoint] || BASE_URLS.DEFAULT;
  return `${baseUrl}${endpoint}`;
};

// Export URLs for easy access
export const API_URLS = {
  IDENTITY: getApiUrl(API_ENDPOINTS.IDENTITY),
  PROFILE: getApiUrl(API_ENDPOINTS.PROFILE),
  NOTIFICATION: getApiUrl(API_ENDPOINTS.NOTIFICATION),
  COURSE: getApiUrl(API_ENDPOINTS.COURSE),
  BLOG: getApiUrl(API_ENDPOINTS.BLOG),
  CHAT: getApiUrl(API_ENDPOINTS.CHAT),
} as const;

export enum API_QUERIES {
  TAGS_LIST = '/tag-list',
  POSTS_LIST = '/post-list',
  POST_DETAIL = '/post-detail',
  IDENTITY = '/identity',
  FACE_VERIFIED = '/face-verifed'
}
import { BaseCourse } from "@/containers/Admin/Education/CourseManagement/helpers";

export interface CourseActionPayload {
  departmentId: string;
  courseId: string;
  studentIds?: string[];
  teacherIds?: string[];
  semesterIds?: string[];
}

export interface FileUploadPayload {
  departmentId: string;
  courseId: string;
  file: File[];
}

export interface ImageUploadPayload {
  departmentId: string;
  courseId: string;
  file: File;
}

export interface BaseCourseResponse {
  id: string;
  code: string;
  name: string;
  imageUri: string;
  description: string;
  credit: number;
  status: string;
  requiredBaseCourses: BaseCourse[];
}

export type CourseDetailResponse = {
  id: string;
  name: string;
  imageUri: string;
  code: string;
  credit: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  remain: number;
  teacher: CourseTeacher;
  studentIds: any;
  departments: any;
  courseInformation?: string;
  assessmentPlan?: string;
  learningMaterialsAndOutcomes?: string;
};

export type CourseTeacher = {
  id: string;
  teacherId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatarPath: string;
  workingInformation: string;
  contactLink: string;
  officeLocation: string;
  officeHours: string;
  otherInformation: string;
};
import { StackParamList } from "@/src/navigator";

export const iconFunctions: { id: number; title: string; screenName: keyof StackParamList; iconProps: { name: string; type: string; color: string } }[] = [
    { id: 1, title: "Grades", screenName: "CourseRegistration", iconProps: { name: "text-increase", type: "material-icons", color: "blue" } },
    { id: 2, title: "Tuition", screenName: "CourseRegistration", iconProps: { name: "credit-card", type: "font-awesome", color: "green" } },
    { id: 3, title: "Course Registration", screenName: "CourseRegistration", iconProps: { name: "form", type: "antdesign", color: "purple" } },
    { id: 4, title: "Attendance", screenName: "CourseRegistration", iconProps: { name: "check-square", type: "feather", color: "orange" } },
    { id: 5, title: "Schedule", screenName: "CourseRegistration", iconProps: { name: "calendar", type: "antdesign", color: "red" } },
    { id: 6, title: "Evaluation", screenName: "CourseRegistration", iconProps: { name: "star", type: "font-awesome", color: "#FFD32C" } },
    { id: 7, title: "Register Certificate", screenName: "CourseRegistration", iconProps: { name: "file-text", type: "feather", color: "teal" } },
    { id: 8, title: "Library", screenName: "CourseRegistration", iconProps: { name: "book", type: "font-awesome", color: "brown" } },
    { id: 9, title: "Student Support", screenName: "CourseRegistration", iconProps: { name: "help-center", type: "material-icons", color: "blue" } },
    { id: 10, title: "Exam Results", screenName: "CourseRegistration", iconProps: { name: "article", type: "material-icons", color: "green" } },
    { id: 11, title: "Internship", screenName: "CourseRegistration", iconProps: { name: "briefcase", type: "font-awesome", color: "black" } },
];

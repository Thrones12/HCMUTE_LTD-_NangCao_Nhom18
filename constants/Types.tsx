export type RootStackParamList = {
    Login: undefined;
    ForgetPassword: undefined;
    Register: undefined;
    Verify: { email: string; type: string };
    CourseList: undefined;
    SubjectList: { courseId: String };
    LessonList: { subjectId: String };
    LessonTab: { lessonId: String };
    Exercise: { lessonId: String };
    ExamList: undefined;
    Exam: { examId: String };
    Search: undefined;
    Notification: undefined;
    Profile: undefined;
    Storage: undefined;
    History: undefined;
};

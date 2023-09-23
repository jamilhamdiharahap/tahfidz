import GenerationView from "../views/coach&spirituality/generation/index.vue";
import StudentView from "../views/coach&spirituality/student/index.vue";
import UserView from "../views/coach&spirituality/user/index.vue";
import SurahView from "../views/coach&spirituality/surah/index.vue";
import GradeView from "../views/coach&spirituality/grade/index.vue";
import ScheduleView from "../views/coach&spirituality/schedule/index.vue";
import GradingView from "../views/coach&spirituality/grading/index.vue";

const routes = [
    {
        path: '',
        name: 'GenerationCoach',
        component: GenerationView,
        meta: { title: "Generation" }
    },
    {
        path: '/student',
        name: 'StudentCoach',
        component: StudentView,
        meta: { title: "Student" }
    },
    {
        path: '/user',
        name: 'UserCoach',
        component: UserView,
        meta: { title: "User" }
    },
    {
        path: '/surah',
        name: 'SurahCoach',
        component: SurahView,
        meta: { title: "Surah" }
    },
    {
        path: '/grade',
        name: 'GradeCoach',
        component: GradeView,
        meta: { title: "Grade" }
    },
    {
        path: '/schedule',
        name: 'ScheduleCoach',
        component: ScheduleView,
        meta: { title: "Schedule" }
    },
    {
        path: '/gradings',
        name: 'GradingCoach',
        component: GradingView,
        meta: { title: "Grading" }
    },
]

export default routes;
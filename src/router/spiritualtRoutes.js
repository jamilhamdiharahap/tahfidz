import GenerationView from "../views/coach&spirituality/generation/index.vue";
import StudentView from "../views/coach&spirituality/student/index.vue";
import SurahView from "../views/coach&spirituality/surah/index.vue";
import ScheduleView from "../views/coach&spirituality/schedule/index.vue";
import GradingView from "../views/coach&spirituality/grading/index.vue";

const routes = [
    {
        path: '',
        name: 'GenerationSpiritual',
        component: GenerationView,
        meta: { title: "Generation" }
    },
    {
        path: '/student',
        name: 'StudentSpiritual',
        component: StudentView,
        meta: { title: "Student" }
    },
    {
        path: '/surah',
        name: 'SurahSpiritual',
        component: SurahView,
        meta: { title: "Surah" }
    },
    {
        path: '/schedule',
        name: 'ScheduleSpiritual',
        component: ScheduleView,
        meta: { title: "Schedule" }
    },
    {
        path: '/grading',
        name: 'GradingSpiritual',
        component: GradingView,
        meta: { title: "Grading" }
    },
]

export default routes;
import StudentGradingView from '../views/students/grading/index.vue';
import StudentScheduleView from '../views/students/schedule/index.vue';

const routes = [
    {
        path: '',
        name: 'ScheduleStudent',
        component: StudentScheduleView,
        meta: { title: "Schedule" }
    },
    {
        path: '/grading',
        name: 'GradingStudent',
        component: StudentGradingView,
        meta: { title: "Grading" }
    },
]

export default routes;
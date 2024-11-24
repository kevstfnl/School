import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

export default {
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistToTargets(browserslist('>= 0.25%'))
        }
    },
    build: {
        cssMinify: 'lightningcss',
        rollupOptions: {
            input: {
                main: './index.html',
                promo: './pages/promo.html',
                student: './pages/student.html',
            },
        },
    }
};
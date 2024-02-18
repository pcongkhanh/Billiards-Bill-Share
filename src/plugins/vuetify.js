import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'

import {createVuetify} from 'vuetify';

const myCustomTheme = {
    dark: true,
    colors: {
        primary: '#5DA273',
        secondary: '#A9E3B0',
        accent: '#ff4081',
        error: '#FF4274',
        warning: '#F9D509',
        info: '#2D73FF',
        success: '#38D85B',
        background: '#15202b',
        "on-background": "#E6FAE5"
    }
}
export default createVuetify({
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
            myCustomTheme,
        },
        options: {
            customProperties: true,
        },
    },
    defaults: {
        VTextField: {
            density: "compact",
            variant: "outlined",
            hideDetails : "auto",
            baseColor: "secondary",
            color: "primary",
        },
        VCheckbox: {
            hideDetails : "auto",
            baseColor: "secondary",
            color: "primary",
            density: "compact",
        }
    },
})

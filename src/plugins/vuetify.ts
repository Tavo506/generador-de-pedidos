import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa4'
import 'font-awesome/css/font-awesome.min.css'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

export default createVuetify({
    components: {
        VNumberInput,
        ...components
    },
    directives,
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
        },
    },
})

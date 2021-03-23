import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/global.css'

import {
  Button,
  CellGroup,
  Cell,
  Icon,
  Image as VanImage,
  Col,
  Row,
  Toast,
  Divider,
  Lazyload,
  NavBar,
  Grid,
  GridItem,
  Dialog,
} from 'vant'

Vue.use(Button)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Col)
Vue.use(Row)
Vue.use(Toast)
Vue.use(Divider)
Vue.use(Lazyload)
Vue.use(NavBar)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Dialog)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

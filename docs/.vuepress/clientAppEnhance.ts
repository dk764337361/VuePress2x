import { defineClientAppEnhance } from '@vuepress/client'
import NpmBadge from './components/NpmBadge.vue'
import toc from './components/vuepress-toc.vue'

// 以下是页面案例
//CSS
import css3SelectorcChild from './components/css3/selector/child.vue'
import css3Selectorbrother1 from './components/css3/selector/brother1.vue'
import css3Selectorcbrother2 from './components/css3/selector/brother2.vue'
import pseudoelement1 from './components/css3/selector/pseudoelement1.vue'
import attributes from './components/css3/selector/attributes.vue'
import BoxTransition from './components/css3/box/BoxTransition.vue'
import BoxRotate from './components/css3/box/BoxRotate.vue'
import BoxSkew from './components/css3/box/BoxSkew.vue'
import BoxOrigin from './components/css3/box/BoxOrigin.vue'
import BoxCardPackage from './components/css3/box/BoxCardPackage.vue'
import perspective1 from './components/css3/box/perspective1.vue'
import perspective2 from './components/css3/box/perspective2.vue'
import perspective3 from './components/css3/box/perspective3.vue'
import BoxCase from './components/css3/box/BoxCase.vue'
import animation from './components/css3/box/animation.vue'
import lunbo1 from './components/css3/application/lunbo1.vue'
import lunbo2 from './components/css3/application/lunbo2.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('NpmBadge', NpmBadge)
  app.component('toc', toc)

  // 以下是页面案例
  app.component('css3SelectorcChild', css3SelectorcChild)
  app.component('css3Selectorbrother1', css3Selectorbrother1)
  app.component('css3Selectorcbrother2', css3Selectorcbrother2)
  app.component('pseudoelement1', pseudoelement1)
  app.component('attributes', attributes)
  app.component('BoxTransition', BoxTransition)
  app.component('BoxRotate', BoxRotate)
  app.component('BoxSkew', BoxSkew)
  app.component('BoxOrigin', BoxOrigin)
  app.component('BoxCardPackage', BoxCardPackage)
  app.component('perspective1', perspective1)
  app.component('perspective2', perspective2)
  app.component('perspective3', perspective3)
  app.component('BoxCase', BoxCase)
  app.component('animation', animation)
  app.component('lunbo1', lunbo1)
  app.component('lunbo2', lunbo2)
})
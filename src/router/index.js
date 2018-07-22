import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/admin/admin'
import Category from '@/components/pages/admin/category'
import suppliers from  '@/components/pages/admin/supplier'
import product from '@/components/pages/admin/product'
import shop from '@/components/pages/shop/shop'
import productshow from '@/components/pages/shop/productshow'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: {path:"login"}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: {path:"/admin/category"},

      children:[
        {
          path: 'category',
          name:'admin.category',
          component: Category
        },

        {
          path: 'supplier',
          name:'admin.supplier',
          component: suppliers
        },

        {
          path: 'product',
          name:'admin.product',
          component: product
        },
      ],
    },

    {
      path: '/shop',
      name: 'shop',
      component: shop,
      redirect: {path:"/shop/products"},

      children:[
        {
          path: 'products',
          name:'shop.productshow',

          component: productshow
        },
      ],
    },




  ]
})

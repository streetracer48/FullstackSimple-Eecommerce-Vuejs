<template>
  <div class="admin">
<div id="header">
<a class="fright" href="" @click="logOut()">Logout</a>


</div>
<div id="sidebar">
<ul class="nav">
<li>
<router-link to="/admin/category">Category</router-link>
</li>
<li>
<router-link to="/admin/supplier">Supplier</router-link>
</li>
<li>
<router-link to="/admin/product">Product</router-link>
</li>
<li>
<router-link to="/shop">Shop</router-link>
</li>
</ul>
</div>
<div id="main">
<router-view />
</div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {

    }
  },


  methods:{
    logOut()
    {
this.$router.push({name:"login"});

    }

}

}

</script>



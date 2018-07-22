<template>
  <div class="admin">
<div id="header">

<a class="fright" href="" @click="logOut()">Logout</a>
<a class="fleft" href="" @click="logOut()">Simple Ecommmerce</a>


</div>
<div id="shop">
<div id="shopContainer">
</div>
  <router-view />
</div>
<div id="cart">
<div id="cartContainer">
 <h2>Your Cart</h2>
 <hr>
 <table class="cart">
   <tr>
      <th>Product name</th>
      <th>Quantity</th>
      <th>Price</th>
   </tr>


 </table>
</div>
</div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
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



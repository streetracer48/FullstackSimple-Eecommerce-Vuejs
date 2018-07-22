<template>
  <div>
    <h1>All product</h1>
<div class="product" v-for="product in allProducts">
  <router-link :to="'product/'+ product.id">
  <div class="productContainer">
  <img :src="'http://localhost/www/vue-phpcrud/'+ product.image" alt="image">
<br> <br>
<strong>{{product.name}}</strong>
<br>
<p>&#2547;{{product.price}}</p>
 </div>
 </router-link>

</div>
  </div>
</template>

<script>
export default {
  name: 'Productshow',
  data () {
    return {

allProducts:[]

 }



},
mounted: function(){

		this.init();
	},


  methods:{
init() {
this.$eventBus.$emit("loadingStatus",true);

		this.$axios.get("http://localhost/www/vue-phpcrud/api.php?action=productRead")
  .then(res=>
  {
  this.$eventBus.$emit("loadingStatus",false);
	if(res.data.error)
	{
console.log('error')
	}
	 else
	{
   this.allProducts = res.data.product;

	}
});
}


}

}

</script>




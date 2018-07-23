<template>
  <div>
<h1 class="fleft">Nokia</h1>
<router-link to="/shop" class="fright">all products</router-link>
<div class="clear"></div>
<hr>

 <div class="product-left">
   <img src=""
 </div>
  <div class="product-right">
      <div class="product-description">
<p>
<strong>Product Name</strong>:cc <br><br>
<strong>product details</strong>:cc <br><br>
<strong>Product price</strong>:cc <br><br>
<strong>Qunatity</strong>
<input type="number" class="input-number">
<button class="addBtn">add to cart</button>
</p>
      </div>

  </div>




  </div>
</template>

<script>
export default {
  name: 'Productshow',
  data () {
    return {
productId:0,
product:{},
quantity:1,
 }



},
mounted: function(){

  this.productId=this.$route.params.pid;
console.log(this.productId)
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




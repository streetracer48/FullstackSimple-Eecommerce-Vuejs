<template>

  <div>
  <modal modalHeading="ADD NEW PRODUCT" :cond="showModal" @modalClose="showModal = false">

     <table>
       <tr>
         <td>
           Product Name
         </td>
         <td>
<input type="text" id="newCatName"  placeholder="new category name" v-model="newProduct.name"></td>
       </tr>
       <tr>
       <tr>
         <td>
           select category Name
         </td>
         <td>
         <select v-model="newProduct.category">
          <option value="">
           --select one--
          </option>
          <option v-for="category in allCategory" :value="category.id">
            {{category.categoryname}}
          </option>
         </select>
         </td>
       </tr>
       <tr>
       <tr>
         <td>
          select supplier Name
         </td>
         <td>
         <select v-model="newProduct.supplier">
          <option value="">
           --select one--
          </option v-model="newProduct.supplier">
            <option v-for="supplier in allSupplier" :value="supplier.id">
             {{supplier.name}}
            </option>
         </select>
         </td>
       </tr>

        <tr>
         <td>
           Price
         </td>
         <td>
<input type="text" v-model="newProduct.price" placeholder="new category name">
 <labe<input type="checkbox" v-model="newProduct.negotiable">
</td>

       </tr>


       <tr>
         <td>
           Image
         </td>
         <td>
<input type="file" id="image" @change="onFileChange" name="fileToUpload">
</td>

       </tr>

        <tr>
         <td>

         </td>
         <td>

<progress :value="percent" max="100"> </progress> % {{percent}} <br> <br>
<img :src="'http://localhost/www/vue-phpcrud/'+ newProduct.image" alt="something cought" class="thumbnile">
</td>

       </tr>
       <tr>
         <td>
           Product Description
         </td>
         <td>
<textarea type="text"  placeholder=""  id="description" v-model="newProduct.description"></textarea></td>
       </tr>
<tr>
         <td>
           <button class="btnSave" @click="addNewProduct()">Save</button>
         </td>
       </tr>

     </table>

  </modal>

<!-- // MODAL EDIT START -->


 <modal modalHeading="EDIT YOUR PRODUCT" :cond="showEditModal" @modalClose="showEditModal = false">

     <table>
       <tr>
         <td>
           Product Name
         </td>
         <td>
<input type="text" id="newCatName"  placeholder="new category name" v-model="clickUp.name"></td>
       </tr>
       <tr>
       <tr>
         <td>
           select category Name
         </td>
         <td>
         <select v-model="clickUp.category">
          <option value="">
           --select one--
          </option>
          <option v-for="category in allCategory" :value="category.id">
            {{category.categoryname}}
          </option>
         </select>
         </td>
       </tr>
       <tr>
       <tr>
         <td>
          select supplier Name
         </td>
         <td>
         <select v-model="clickUp.supplier">
          <option value="">
           --select one--
          </option v-model="newProduct.supplier">
            <option v-for="supplier in allSupplier" :value="supplier.id">
             {{supplier.name}}
            </option>
         </select>
         </td>
       </tr>

        <tr>
         <td>
           Price
         </td>
         <td>
<input type="text" v-model="clickUp.price" placeholder="new category name">
 <labe<input type="checkbox" v-model="newProduct.negotiable">
</td>
       </tr>
        <tr>
         <td>

         </td>
         <td>
<img :src="'http://localhost/www/vue-phpcrud/'+ clickUp.image" alt="something cought" class="thumbnile">
</td>

       </tr>
       <tr>
         <td>
           Product Description
         </td>
         <td>
<textarea type="text"  placeholder=""  id="description" v-model="clickUp.description"></textarea></td>
       </tr>
<tr>
         <td>
           <button class="btnSave" @click="updateProduct()">Update</button>
         </td>
       </tr>

     </table>

  </modal>

  <!-- MODAL EDIT END -->

<modal modalHeading="UPDATE DATA" :cond="showDeleteModal" @modalClose="showDeleteModal = false">

<h2>Are you going to the category {{clickdel.name}} Delete?</h2>
     <table>
<tr>
         <td><button class="btnSave"@click="deleteProduct()" >Yes</button></td>
         <td>
           <button class="btnClose" @click="showDeleteModal =false" >NO</button>
         </td>
       </tr>

     </table>

  </modal>



  <h1 class="fleft">Product Details</h1>
  <button class="addBtn fright" @click="showModal=true">add New</button>
<div class="clear"></div>
<hr>
<table class="nice-table">
  <tr>
<th>ID</th>
<th>Image</th>
<th>Name</th>
<th>Category</th>
<th>Supplier</th>
<th>Price</th>
<th>Details</th>
<th>Edit</th>
<th>Delete</th>
  </tr>
<tr v-for="product in productinfo">
  <td>{{product.id}}</td>
  <td><img :src="'http://localhost/www/vue-phpcrud/'+ product.image" alt="something cought" class="icon"></td>
  <td>{{product.name}}</td>
  <td>{{product["categoryinfo.name"]}}</td>
  <td>{{product.supplier}}</td>
    <td>{{product.price}}</td>
  <td>{{product.description}}</td>
  <td><button class="edit" @click="showEditModal = true; clickUp= product">Edit</button></td>
  <td><button class="delete" @click="showDeleteModal= true; clickdel= product">Delete</button></td>
</tr>
</table>
  </div>
</template>

<script>
export default {
  name: 'suppliers',
  data () {
    return {
showModal:false,
showEditModal:false,
showDeleteModal:false,

newProduct: {
name:"",
category:"",
supplier:"",
price:0,
negotiable: true,
image: "img/default.jpg",
description:""
},
//clickCategory:{},
clickdel:{},
 productinfo:[],
allCategory:[],
 allSupplier:[],
 clickUp:{},
 percent:0
  }



},
mounted: function(){


		this.init();

	},


  methods:{

     //DATAread part
    init()
		{
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
   this.productinfo = res.data.product;
   console.log(this.productinfo);
	}
});

this.$eventBus.$emit("loadingStatus",true);
		this.$axios.get("http://localhost/www/vue-phpcrud/api.php?action=supplierRead")
  .then(res=>
{
  this.$eventBus.$emit("loadingStatus",false);
	if(res.data.error)
	{
console.log('error')
	}
	 else
	{
   this.allSupplier = res.data.suppliers;
	}
});


 this.$eventBus.$emit("loadingStatus",true);
		this.$axios.get("http://localhost/www/vue-phpcrud/api.php?action=catRead")
  .then(res=>
{
  this.$eventBus.$emit("loadingStatus",false);
	if(res.data.error)
	{
console.log('error')
	}
	 else
	{
   this.allCategory = res.data.categoryinfo;
	}
});

},
//delete product
deleteProduct(){
  this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=productDelete",this.clickdel)
.then(res=>{

this.showDeleteModal = false;
this.$eventBus.$emit("loadingStatus",false);

 this.init();

			if(res.data.error){

                        this.$iziToast.error({
                            title: 'Error',
                            message: res.data.message,
                        });
  }

 else{

                 this.$iziToast.success({
                            title: 'DELETE',
                            message: res.data.message,
                        });

   this.clickCategory();


			}
		});

},

//LIVE FILE UPLOAD PART
onFileChange(e) {
  const _this = this;
  const  files = e.target.files || e.dataTransfers.files
   console.log(files)
   const file = files[0];

  const fd = new FormData();
  fd.append("fileToUpload", file, file.name);
  this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=fileupload",fd, {

  onUploadProgress: function(uploadEvent){

								_this.percent = Math.round((uploadEvent.loaded / uploadEvent.total)*100);
							}

  })
  .then(res=>
{

  _this.newProduct.image = res.data.uploadedUrl;
  //console.log(_this.newProduct.image);

});


},

// PRODUCT UPDATE PART

updateProduct()
{
  this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=productUpdate",this.clickUp)
.then(res=>{

this.clickUp ={};
//this.clickCategory = {name:"", description:""};
this.showEditModal = false;
this.$eventBus.$emit("loadingStatus",false);


  if(res.data.error){
this.$iziToast.error({
  title: 'Error',
  message: res.data.message,
          });
  }
 else{
        this.$iziToast.success({
                            title: 'Updated',
                            message: res.data.message,
                        });


			}
		});


},




//ADD PART

    addNewProduct()
    {
console.log(this.newProduct);

this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=addNewProduct",this.newProduct)
.then(res=>{
this.newProduct = {name:"",
category:"",
supplier:"",
price:0,
negotiable: true,
image: "img/default.jpg",
description:""};
this.percent = 0;
this.showModal = false;
this.$eventBus.$emit("loadingStatus",false);
this.init();

			if(res.data.error){
        console.log('its nothing');

                        this.$iziToast.error({
                            title: 'Error',
                            message: res.data.message,
                        });
  }

 else{

                 this.$iziToast.success({
                            title: 'added',
                            message: res.data.message,
                        });
			 }
		});

   }

}

}

</script>



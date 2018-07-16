<template>

  <div>
  <modal modalHeading="ADD NEW PRODUCT" :cond="showModal" @modalClose="showModal = false">

     <table>
       <tr>
         <td>
           Product Name
         </td>
         <td>
<input type="text" id="newCatName"  placeholder="new category name"></td>
       </tr>
       <tr>
       <tr>
         <td>
           select category Name
         </td>
         <td>
         <select>
          <option value="">
           --select one--
          </option>
          <option v-for="category in allCategory" value="">
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
         <select>
          <option value="">
           --select one--
          </option v-model="newProduct.supplier">
            <option v-for="supplier in allSupplier" value="supplier.id">
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
           Category Description
         </td>
         <td>
<textarea type="text"  placeholder="category"  id="description"></textarea></td>
       </tr>
<tr>
         <td>
           <button class="btnSave" @click="addNewSupplier()">Save</button>
         </td>
       </tr>

     </table>

  </modal>
  <h1 class="fleft">supplier Details</h1>
  <button class="addBtn fright" @click="showModal=true">add New</button>
<div class="clear"></div>
<hr>
<table class="nice-table">
  <tr>
<th>ID</th>
<th>Name</th>
<th>Description</th>
<th>Edit</th>
<th>Delete</th>
  </tr>
<tr v-for="supplier in suppliers">
  <td>{{ supplier.id}}</td>
  <td> {{ supplier.name}}</td>
  <td>{{ supplier.description}}</td>
  <td><button class="edit" @click="showEditModal = true; clickSupplier = supplier">Edit</button></td>
  <td><button class="delete" @click="showDeleteModal= true; clickSupplier = supplier">Delete</button></td>
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
image: "img/default.jpg"
},
//clickCategory:{},
 allCategory:[],
 allSupplier:[],
 percent:0
  }



},
mounted: function(){


		this.init();
        this.sup();
	},


  methods:{
    init()
		{
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

 sup()
		{
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

},


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

  console.log(_this.newProduct.image);
 
});


},

    addNewSupplier()
    {

this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=crsupplier",this.newSupplier)
.then(res=>{

this.newSupplier = {name:"", description:""};
this.showModal = false;
this.$eventBus.$emit("loadingStatus",false);

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



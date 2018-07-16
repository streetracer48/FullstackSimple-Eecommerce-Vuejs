<template>

  <div>
  <modal modalHeading="ADD NEW ITEM" :cond="showModal" @modalClose="showModal = false">

     <table>
       <tr>
         <td>
           category Name
         </td>
         <td>
<input type="text" id="newCatName" v-model="newSupplier.name" placeholder="new category name"></td>
       </tr>
       <tr>
         <td>
           Category Description
         </td>
         <td>
<textarea type="text" v-model="newSupplier.description" placeholder="category"  id="description"></textarea></td>
       </tr>
<tr>
         <td>
           <button class="btnSave" @click="addNewSupplier()">Save</button>
         </td>
       </tr>

     </table>

  </modal>


 <modal modalHeading="UPDATE DATA" :cond="showEditModal" @modalClose="showEditModal = false">

     <table>
       <tr>
         <td>
           edit suplier Name
         </td>
         <td>
<input type="text" id="newCatName" v-model="clickSupplier.name" placeholder="new category name"></td>
       </tr>
       <tr>
         <td>
           edit suplier Description
         </td>
         <td>
<textarea type="text" v-model="clickSupplier.description" placeholder="category"></textarea></td>
       </tr>
<tr>
         <td>
           <button class="btnSave" @click="updateSuplier()">update</button>
         </td>
       </tr>

     </table>

  </modal>


  <modal modalHeading="UPDATE DATA" :cond="showDeleteModal" @modalClose="showDeleteModal = false">

<h2>Are you going to the category</h2>
     <table>
<tr>
         <td><button class="btnSave" @click="deleteSupplier()">Yes</button></td>
         <td>
           <button class="btnClose" @click="showDeleteModal =false" >NO</button>
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

newSupplier:{
name:"",
description:"",
},

//clickCategory:{},
clickSupplier:{},
suppliers:[]
  }



},
mounted: function(){

		this.init();
	},


  methods:{
    init()
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
   this.suppliers = res.data.suppliers;
  //  console.log(this.categoryinfo);

	}
});

},


deleteSupplier(){
  this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=supplierDelete",this.clickSupplier)
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
updateSuplier()
{
  this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=suplierUpdate",this.clickSupplier)
.then(res=>{

this.clickCategory ={};
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
                            title: 'added',
                            message: res.data.message,
                        });


			}
		});


},
    addNewSupplier()
    {

this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=crsupplier",this.newSupplier)
.then(res=>{
console.log(this.newSupplier)
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



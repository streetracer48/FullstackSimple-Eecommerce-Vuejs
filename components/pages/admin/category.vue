<template>

  <div>
  <modal modalHeading="ADD NEW ITEM" :cond="showModal" @modalClose="showModal = false">

     <table>
       <tr>
         <td>
           category Name
         </td>
         <td>
<input type="text" id="newCatName" v-model="newCategory.name" placeholder="new category name"></td>
       </tr>
       <tr>
         <td>
           Category Description
         </td>
         <td>
<textarea type="text" v-model="newCategory.description" placeholder="category"></textarea></td>
       </tr>
<tr>
         <td>
           <button class="btnSave" @click="addNewCategory()">Save</button>
         </td>
       </tr>

     </table>

  </modal>


 <modal modalHeading="UPDATE DATA" :cond="showEditModal" @modalClose="showEditModal = false">

     <table>
       <tr>
         <td>
           edit category Name
         </td>
         <td>
<input type="text" id="newCatName" v-model="clickCategory.categoryname" placeholder="new category name"></td>
       </tr>
       <tr>
         <td>
           edit Category Description
         </td>
         <td>
<textarea type="text" v-model="clickCategory.description" placeholder="category"></textarea></td>
       </tr>
<tr>
         <td>
           <button class="btnSave" @click="updateCategory()">update</button>
         </td>
       </tr>

     </table>

  </modal>


  <modal modalHeading="UPDATE DATA" :cond="showDeleteModal" @modalClose="showDeleteModal = false">

<h2>Are you going to the category {{clickCategory.categoryname}}</h2>
     <table>
<tr>
         <td><button class="btnSave"@click="deleteCategory()" >Yes</button></td>
         <td>
           <button class="btnClose" @click="showDeleteModal =false" >NO</button>
         </td>
       </tr>

     </table>

  </modal>

  <h1 class="fleft">category</h1>
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
<tr v-for="category in categoryinfo">
  <td>{{ category.id}}</td>
  <td> {{ category.categoryname}}</td>
  <td>{{ category.description}}</td>
  <td><button class="edit" @click="showEditModal = true; clickCategory = category">Edit</button></td>
  <td><button class="delete" @click="showDeleteModal= true; clickCategory = category">Delete</button></td>
</tr>
</table>
  </div>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
showModal:false,
showEditModal:false,
showDeleteModal:false,

newCategory:{
name:"",
description:"",
},

clickCategory:{},
categoryinfo:[]
  }



},
mounted: function(){

		this.init();
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
   this.categoryinfo = res.data.categoryinfo;
  //  console.log(this.categoryinfo);

	}
});

},


deleteCategory(){
  this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=catDelete",this.clickCategory)
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
updateCategory()
{
  this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=catUpdate",this.clickCategory)
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
    addNewCategory()
    {
this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=category",this.newCategory)
.then(res=>{

this.newCategory = {name:"", description:""};
this.showModal = false;
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

   }

}

}

</script>



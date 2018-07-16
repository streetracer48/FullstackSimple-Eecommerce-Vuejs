<template>
  <div class="login">
  <div class="loginHeader">
  User Login
  </div>
<div class="loginContainer">
<table>
<tr>
<td>User name</td>
<td>:</td>
<td><input type="text" placeholder="username" v-model="user.username"></td>
</tr>
<tr>
<td>password</td>
<td>:</td>
<td><input type="password" placeholder="password" v-model="user.password"></td>
</tr>

  <tr>
  <td></td>
  <td></td>
  <td><button class="addBtn" @click="loginNow()">Login</button></td>
  </tr>


</table>

</div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user:{
 username:"",
 password:""

      }


    }
  },


  methods:{

loginNow() {

this.$eventBus.$emit("loadingStatus", true);

this.$axios.post("http://localhost/www/vue-phpcrud/api.php?action=login",this.user)
.then(res=>{
console.log(this.user);
console.log(res)
this.$eventBus.$emit("loadingStatus",false);

			if(res.data.error){

                        this.$iziToast.error({
                            title: 'Error',
                            message: res.data.message,
                        });
  }

 else{

                 this.$iziToast.success({
                            title: 'welcome',
                            message: res.data.message,
                        });

this.$router.push({name:"admin"});


			}
		});
  }
}
}

</script>



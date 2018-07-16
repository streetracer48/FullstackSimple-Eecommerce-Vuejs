
<template>
<transition name="scale">
  <div class="modal" v-if="showModal">

  <div class="modalContainer">
    <div class="modalHeader">
       {{ modalHeading }}
<p class="fright modalClose" @click="$emit('modalClose')">
X
</p>
    </div>
  <div class="modalContent">
<slot></slot>

  </div>
  <div class="modalFooter">
<button class="fright btnClose" @click="$emit('modalClose')" >Close</button>
<div class="clear"></div>
</div>

</div>
</div>

</transition>

</template>

<script type="text/javascript">
export default {
 name:"modal",
 computed:
 {
      showModal() {
     return this.cond;
      }
 },
props:["cond", "modalHeading"]

}
</script>


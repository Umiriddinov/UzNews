<script setup lang="ts">

  import Header from "../components/common/Header.vue";
  import { RouterView } from "vue-router";
  import FlowbiteSetup from "../FlowbiteSetup.vue";
  import Footer from "../components/common/Footer.vue"
  // import News from "../News.vue";
</script>
 
 <template>     
 <FlowbiteSetup></FlowbiteSetup>
     <div class="">
      <Header style="width: 1465px;"></Header>
     <div class="p-4" style="width: 100%;height: 100vh;">
       <div class="p-4">
         <RouterView></RouterView>
         <Footer style="width: 1465px;"></Footer>
       </div>
     </div>
     </div>
 </template>

  
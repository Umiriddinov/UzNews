<script lang="ts">
import IconCreate from '../components/icons/interface/IconCreate.vue'
import IconUpdate from '../components/icons/interface/IconUpdate.vue'
import FlowbiteSetup from '@/FlowbiteSetup.vue';
import { defineComponent } from 'vue'
import { uzNewsViewModel } from '../ViewModel/uzNewsViewModel'
import axios from '../plugins/axios'
import UzNewsViewComponent from '@/components/UzNewsViewComponent.vue';
import { NewsCreateDto } from '../Dto/NewCreateDto'
import NewsCompanent from '../components/NewsCompanent.vue'
export default defineComponent({

components: {
  IconCreate,
  IconUpdate,
  FlowbiteSetup,
  UzNewsViewComponent,
  NewsCompanent
},
methods: {
  async getDataAsync() {
    this.isLoaded = false
    debugger;
    try {
      var response = await axios.get<uzNewsViewModel[]>('/api/news')
      this.uzNewsList = response.data
      console.log(this.uzNewsList);
    }
    catch (error) {
      console.log('An error occured: ', error);
    } finally {
      this.isLoaded = true
    }
  },
  handleImageChange(event: any) {
      this.formData.image = event.target.files[0];
    },
  async createModal(){
    debugger;
      try {
        const formData = new FormData();
        for (const key in this.formData) {
          if (key === 'image') {
            formData.append(key, this.formData[key], this.formData[key].name);
          } else {
            formData.append(key, this.formData[key]);
          }
        }
        const response = await axios.post('/api/news', formData);
        alert('Item created successfully!');
        // location.reload();
        // Handle the response or redirect as needed
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Item do not created !');
      }
  },
  async handleSearchSubmit() {
      if (this.IsSearch.trim() === '') {
        await this.getDataAsync();
        return;
      }

      this.isLoaded = false;
      try {
        const response = await axios.get<uzNewsViewModel[]>("/api/news/search", {
          params: {
            search: this.IsSearch,
            page: 1, // Assuming you want to search on page 1
          },
        });
        this.uzNewsList = response.data;
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        this.isLoaded = true;
      }
    },
},
data() {
  return {
    uzNewsList: [] as uzNewsViewModel[],
    isLoaded: false as Boolean,
    IsSearch: '',
    formData: new NewsCreateDto(),
  }
},
async mounted() {
  await this.getDataAsync()
}
})

</script>  
  
  
  
  <template>
    <FlowbiteSetup></FlowbiteSetup>
    <div class="flex justify-between mb-5 mt-10">
      <button type="button" data-modal-target="defaultModal" data-modal-toggle="defaultModal"
        class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
        Create
      </button>
      <!-- Main modal -->
      <div id="defaultModal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Create News</h3>
              <button type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <form>
              <div class="relative z-0 w-full mb-6 group">
                <input v-model="formData.title"  type="texnpm run dt" name="floating_text" id="floating_text"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " required />
                <label for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
              </div>
              <div  class="relative z-0 w-full mb-6 group">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New
                  Content</label>
                <input v-model="formData.content"   type="text" id="message" rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Comment .." />
              </div>
              <div class="relative z-0 w-full mb-6 group">
                <input v-model="formData.tagIds"  type="text" name="floating_text" id="floating_text"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " required />
                <label for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tag</label>
              </div>
              <div class="relative z-0 w-full mb-6 group">
                <input v-model="formData.newTags"  type="text" name="floating_text" id="floating_text"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " required />
                <label for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tag</label>
              </div>
  
              <div class="flex items-center justify-center w-full mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Create
                  file</label>
                <input @change="handleImageChange"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input" type="file" />
              </div>
  
              <button @click="createModal"  type="submit" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Create
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <form  @submit.prevent="handleSearchSubmit">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input v-model="IsSearch" type="search" id="default-search" style="width: 450px"
            class="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search .." />
          <button type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             Search
          </button>
        </div>
      </form>
    </div>
  
    <ul v-show="isLoaded === true" style="display: flex; flex-wrap: wrap">
      <template v-for="element in uzNewsList">
         <NewsCompanent
          :id="element.id" 
          :title="element.title" 
          :content="element.content"
          :imagePath="element.imagePath" 
          :tags="element.tags" 
          :createdAt="element.createdAt" 
          :updatedAt="element.updatedAt"
          class="mt-2 mb-3">
         </NewsCompanent> 
      </template>
    </ul>
   
  </template>
  
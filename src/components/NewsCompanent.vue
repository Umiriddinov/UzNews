<script  lang="ts">
import { defineComponent } from 'vue';
import axios from '../plugins/axios'
import IconCreate from '../components/icons/interface/IconCreate.vue'
import IconUpdate from '../components/icons/interface/IconUpdate.vue'
import { formatDate } from '../helpers/DateHelper'
import FlowbiteSetup from '../FlowbiteSetup.vue'
import { NewsUpdateDto } from '../Dto/NewUpdateDto'

export default defineComponent({
    components: {
        IconCreate, IconUpdate, FlowbiteSetup
    },
    props: {
        id: Number,
        title: String,
        imagePath: String,
        content: String,
        tags: Array,
        createdAt: Date,
        updatedAt: Date
    },
    data() {
        return {
            baseURL: "" as String,
            imageFullPath: "" as String,
            createdAtString: "" as String,
            updatedAtString: "" as String,
            formData: new NewsUpdateDto(),
        }
    },
    methods: {

        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.imageFullPath = this.baseURL + "/" + this.imagePath;
            this.createdAtString = formatDate(this.createdAt!);
            this.updatedAtString = formatDate(this.updatedAt!);
        },
        handleImageChange(event: any) {
      this.formData.image = event.target.files[0];
    },
    async updateModal(){
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
        console.log(this.id)
        const response = await axios.put(`/api/news?newsId=${this.id}`, formData);
        alert('Item update successfully!');
        // location.reload();
        // Handle the response or redirect as needed
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Item do not created !');
      }
  },

        deleteDate() {
            axios.delete(`${this.baseURL}/api/news/${this.id}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log('Deletion was successful.');
                        location.reload();
                    } else {
                        console.log(`Deletion failed with status code: ${response.status}`);
                    }
                })
                .catch((error) => {
                    console.error(`An error occurred: ${error.message}`);
                });
        },


    },
    mounted() {
        this.load();
    }
});
</script>

<template>
    <FlowbiteSetup></FlowbiteSetup>
    <div class="m-3 w-84 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg" v-bind:src="imageFullPath" alt="" style="width: 100%;height: 180px;" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 font-bold text-gray-900 dark:text-white">{{ title }}</h5>
            </a>
            <span class="flex items-center font-normal text-gray-700 dark:text-gray-400">
                <IconCreate></IconCreate>
                <p style="font-weight: 500;margin-left: 7px;">{{ createdAtString }}</p>
            </span>
            <span class="flex  items-center mb-3 font-normal text-gray-700 dark:text-gray-400">
                <IconUpdate></IconUpdate>
                <p style="font-weight: 500;margin-left: 7px;">{{ updatedAtString }}</p>
            </span>
        </div>
  
      <!-- "Read More" button with unique data-modal-target -->
    <button
      :data-modal-target="'staticModal_' + id"
      :data-modal-toggle="'staticModal_' + id"
      class="inline-flex w-full px-14 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Read more
      <svg
        class="w-3.5 h-3.5 ml-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  </div>

  <!-- Unique modal for each component -->
  <div :id="'staticModal_' + id" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content with unique data -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            :data-modal-hide="'staticModal_' + id"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body with unique data -->
        <div class="p-6 space-y-6">
          <div style="width: 200px; height: 100px; display: flex; justify-self: center;">
            <img alt="Content image" :src="imageFullPath" />
          </div>
          <h2 class="text-base leading-relaxed text-gray-500 dark:text-gray-400" style="font-weight: 700; color: blue;">
            {{ title }}
          </h2>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {{ content }}
          </p>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button data-modal-target="UpdateModal" data-modal-toggle="UpdateModal"
            :data-modal-hide="'staticModal_' + id"
            type="button"
            class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Edit
          </button>

          <!-- Edit modal with unique ID -->
          <div :id="'extralarge-modal_' + id" tabindex="-1"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-7xl max-h-full">
              <!-- Modal content with unique data -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-medium text-gray-900 dark:text-white">Edit</h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    :data-modal-hide="'extralarge-modal_' + id"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <!-- Modal body with unique data -->
                <div class="p-6 space-y-6">
                  <form action="get">
                    <div>
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Upload file
                      </label>
                      <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                      />
                    </div>
                    <div>
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Change title
                      </label>
                      <input
                        v-model="title"
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Change content
                      </label>
                      <textarea
                        v-model="content"
                        id="message"
                        rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                      >
                      </textarea>
                    </div>
                  </form>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    :data-modal-hide="'extralarge-modal_' + id"
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    I accept
                  </button>
                  <button
                    :data-modal-hide="'extralarge-modal_' + id"
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="deleteDate"
            :data-modal-hide="'staticModal_' + id"
            type="button"
            class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <div id="UpdateModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Update New</h3>
          <button type="button" data-modal-hide='UpdateModal'
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form>
            <!-- Title input -->
            <div class="relative z-0 w-full mb-6 group">
              <input v-model="formData.title" type="text" name="title" id="title"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Title" required />
              <label for="title"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
            </div>
            <!-- Content input -->
            <div class="relative z-0 w-full mb-6 group">
              <label for="content"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Content</label>
              <textarea v-model="formData.content" id="content" rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Comment .."></textarea>
            </div>
            <!-- File input -->
            <div class="flex items-center justify-center w-full mb-5">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload File</label>
              <input @change="handleImageChange"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input" type="file" />
            </div>

            <!-- Update button -->
            <button @click="updateModal" type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  </template>
  
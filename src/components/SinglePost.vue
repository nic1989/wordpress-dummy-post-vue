<template>
  <div id="single-post">
    <div class="container">
      <div id="main-image">
        <img :src="postData.featured_image+'?w=960&h=260&crop=1'">
      </div>
      <div id="content">
        <header class="post-title">
          <h1>{{ postData.title }}</h1>
          <a class="post-permalink">
            <p class="post-date">
              <strong>{{ getDate(postData.date) }}</strong>
              <span>{{ getMonth(postData.date) }}</span>
            </p>
          </a>
        </header>
        <div class="description" v-html="postData.content"></div>
        <div class="tags" v-if="Object.keys(postData).length > 0">
          <span 
            v-for="(tag, tagindex) in Object.keys(postData.tags)"
            :key="tagindex">
            {{ tag }}
          </span>
        </div>
        <div class="text-right">
          <RouterLink to="/">Back to Posts</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { getSinglePost } from '../services/apiservices'
import moment from 'moment';

export default {
  name: 'SinglePost',
  setup() {
    const instance = getCurrentInstance()
    const { $route } = instance.proxy
    const postData = ref({});

    const fetchSinglePosts = async () => {
      postData.value = await getSinglePost($route.params.slug);
    }

    const getDate = (date) => {
      return moment(date).format('Do')
    }

    const getWeek = (date) => {
      return moment(date).format('dddd')
    }

    const getMonth = (date) => {
      return moment(date).format('MMMM YYYY')
    }

    fetchSinglePosts();
    return {
      postData,
      getDate,
      getWeek,
      getMonth
    }
  }
}
</script>

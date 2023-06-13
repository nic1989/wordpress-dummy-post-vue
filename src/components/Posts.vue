<template>
  <div class="welcome-posts container mt-5">
    <div class="grid-container">
      <LoadingBar v-if="posts.length === 0" />
      <div
        v-else
        class="grid-item"
        v-for="(post, index) in posts"
        :key="index">
          <div class="image">
            <img :src="post.featured_image">
            <span @click="redirectToUrl(post.URL)" class="blog-post">Blog Post</span>
          </div>
          <p class="info"><span class="date">{{ getPostDate(post.date) }}</span> | <span class="read_time"> 5 min read</span></p>
          <RouterLink :to="`/post/${post.slug}`">
            <h5 :title="post.title">{{ getTitle(post.title) }}</h5>
          </RouterLink>
          <p v-html="getDesc(post.content)" class="description"></p>
          <div class="tags">
            <span 
              v-for="(tag, tagindex) in Object.keys(post.tags)"
              :key="tagindex">
              {{ tag }}
            </span>
          </div>
      </div>
      <div class="vertical-center load-more" @click="loadPostData" v-if="posts.length > 0 && showLoadMore">
        Load More
      </div>
    </div>
</div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import { getAllPosts } from '../services/apiservices'
  import moment from 'moment';
  import LoadingBar from "./LoadingBar.vue";

export default {
  name: 'Posts',
  components: {
    LoadingBar
  },
  setup () {
    const page = ref(1);
    const total = ref(0);
    const posts = ref([]);
    const showLoadMore = ref(true);

    const fetchPosts = async (number) => {
      const response = await getAllPosts(number);
      total.value = response.found;
      Array.prototype.push.apply(posts.value, response.posts)
      if (posts.value.length === total.value) {
        showLoadMore.value = false;
      }
    }

    const getPostDate = (date) => {
      return moment(date).format('lll');
    }

    const getTitle = (title) => {
      return title.length > 30 ? title.substr(0, 30) +'...' : title;
    }
    
    const getDesc = (desc) => {
      return desc.length > 100 ? desc.substr(0, 100) +'...' : desc;
    }

    const loadPostData = () => {
      page.value += 1;
      fetchPosts(page.value);
    }

    const redirectToUrl = (url) => {
      window.open(url, '_blank');
    }

    onMounted(() => {
      fetchPosts(page.value);
    });
    return {
      posts,
      getPostDate,
      getTitle,
      getDesc,
      loadPostData,
      showLoadMore,
      redirectToUrl
    }
  }
}
</script>
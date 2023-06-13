import axios from 'axios';
import { PUBLIC_API_URL, WP_URL, POST_COUNT } from '../utils/utils';

export const getAllPosts = async (page_number) => {
    const response = await axios.get(`${PUBLIC_API_URL}${WP_URL}/posts/?number=${POST_COUNT}&page=${page_number}`)
        .catch((err) => {
            console.log('Error', err)
        });
        return response.data;
}

export const getSinglePost = async (slug) => {
    const response = await axios.get(`${PUBLIC_API_URL}${WP_URL}/posts/slug:${slug}`)
        .catch((err) => {
            console.log('Error', err)
        });
        return response.data;
}
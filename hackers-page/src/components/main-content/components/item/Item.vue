<template>
  <div id="item-container">
    <div :class="['item', {'centered': !item.text}]">
      <div :class="['item-content', {'centered': !item.text}]">
        <a v-if="item.url" target="_blank" :href="item.url" class="preview-container">
          <div>
            <iframe :src="item.url" scrolling="no" sandbox="" class="site-preview"/>
          </div>
        </a>
        <div class="item-info-container">
          <p class="title text">
            <span @click="item.objectID && navigateToItem(item.objectID)" class="title-link" v-if="item.title"
                  v-html="highlightText(item.title)"></span>
            <a :href="item.url" class="redirect-link-text text" v-if="item.url" target="_blank"
               v-html="highlightText(item.url)"></a>
          </p>
          <p v-if="item.text || item.comment_text" class="text comment-text"
             v-html="highlightText(item.text || item.comment_text)"></p>
          <div class="item-stats-container">
            <div class="item-stat" v-if="item.points">
              <img :src="HeartIcon" alt="favorite" class="icon">
              <span>{{ item.points }} points</span>
            </div>
            <div class="item-stat">
              <img :src="PersonIcon" alt="author" class="icon">
              <span>{{ item.author }}</span>
            </div>
            <div v-if="item.created_at_i" class="item-stat">
              <img :src="TimeIcon" alt="time-ago" class="icon">
              <span>{{ moment.unix(item.created_at_i).fromNow() }}</span>
            </div>
            <div v-if="item.story_title || (item.story_id !== item.id)" @click="navigateToItem(item.story_id)"
                 class="parent-story-name">
              <span class="text">{{ item.story_title ? 'on: ' + item.story_title : 'context' }}</span>
            </div>
            <div v-if="item.parent_id" @click="navigateToItem(item.parent_id)" class="parent-story-name">
              <span class="text">parent</span>
            </div>
          </div>
        </div>
      </div>
      <div class="icons-container">
        <div class="comments-icon-container" @click="navigateToStory(item.story_id)">
          <span class="num-comments text">{{ item.num_comments }}</span>
          <img :src="CommentIcon" alt="comments" class="big-icon"/>
        </div>
        <img :src="ShareIcon" alt="share" class="big-icon"/>
        <img :src="StarIcon" alt="favorite" class="big-icon"/>
      </div>
    </div>
    <div v-if="item.children && typeof item.children[0] === 'object'" v-for="(child) in item.children"
         :key="child.objectID" class="child">
      <Item :item="child" :query="query"/>
    </div>
  </div>
</template>


<script>
import HeartIcon from "../../../../assets/icons/heart-icon.svg"
import TimeIcon from "../../../../assets/icons/time-icon.svg"
import PersonIcon from "../../../../assets/icons/person-icon.svg"
import StarIcon from "../../../../assets/icons/star-icon.svg"
import ShareIcon from "../../../../assets/icons/share-icon.svg"
import CommentIcon from "../../../../assets/icons/comment-icon-filled.svg"
import moment from 'moment';
import {useRouter} from "vue-router";

export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const {item} = props;

    const navigateToItem = (objectID) => {
      router.push(`/${objectID}`);
    }

    const navigateToURL = (url) => {
      router.replace(url)
    }

    const highlightText = (text) => {
      let queryTMP = props.query;
      if (!queryTMP)
        return text;
      const words = queryTMP.split(' ').map(word => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
      return text.replace(regex, '<span class="highlight">$1</span>');
    };


    return {
      HeartIcon,
      TimeIcon,
      StarIcon,
      PersonIcon,
      ShareIcon,
      CommentIcon,
      item,
      moment,
      navigateToItem,
      navigateToURL,
      highlightText
    };
  }
}
</script>

<style>
#item-container {
  .item {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem;
  }

  .centered {
    align-items: center;
  }

  .item-content {
    display: flex;
    gap: 1rem;
  }

  .preview-container {
    cursor: pointer;
  }

  .site-preview {
    pointer-events: none;
    height: 5rem;
    width: 5rem;
  }

  .item-info-container {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 1.5rem;
    margin: 0 0 0.25rem 0;
    cursor: pointer;
    color: grey;
  }

  .item-stats-container {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .item-stat {
    display: flex;
    gap: 0.25rem;
    cursor: pointer;
  }

  .icon {
    height: 1rem;
    width: 1rem;
  }

  .big-icon {
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }

  .icons-container {
    display: flex;
    gap: 1rem;
  }

  .comments-icon-container {
    position: relative;
    cursor: pointer;
  }

  .num-comments {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 0.75rem;
  }

  .redirect-link-text {
    text-decoration: none;
    font-style: italic;
    font-size: 1.5vh;
    color: inherit;
    max-width: 20vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    margin-left: 0.5rem;
  }

  .title-link {
    text-decoration: none;
    color: inherit;
  }

  .text {
    font-family: Alef, sans-serif;
  }

  .child {
    margin-left: 2rem;
    border-left: 1px solid lightgrey;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  .parent-story-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .comment-text {
    margin: 0;
  }

  .highlight {
    background-color: orange;
    color: black;
  }
}
</style>

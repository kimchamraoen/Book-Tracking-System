<template>
  <div class="info-container">
    <span class="title" :style="{ backgroundColor: blockColor }">{{ title }}</span>
    <div class="trending-info">
      <span class="count">{{ count }}</span>
      <div class="description-div">
        <span class="description"> {{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookInfoBlock',
  props: {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    blockColor: {
      type: String,
      default: '#f0f0f0', // Default color if not provided
    },
    description: {
      type: String,
      default: 'Description not provided', // Default description if not provided
    },
  },
}
</script>

<style scoped>
  .trending-info{
    display: grid;
    align-items: center;
    justify-items: center;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .info-container {
    width: 300px;
    /* height: 10rem; */
    /* border: 1px solid #ddd; */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    display: grid;
    align-items: center;
    justify-items: center;
  }
  .title {
    display: block;
    /* width: auto; */
    /* padding: 12px 0; */
    font-size: 16px;
    font-weight: bold;
    color: #fcfbfb;
    text-align: center;
    /* border-top-left-radius: 8px;
    border-top-right-radius: 8px; */
  }

  .count {
    font-size: 32px;
    font-weight: bold;
    margin-right: 10px;
  }

  .description {
    font-size: 12px;
    color: #666666;
    margin-bottom: 1rem;
  }


</style>
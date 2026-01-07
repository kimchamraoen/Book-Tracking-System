<template>
  <div class="info-block">
    <span class="title" :style="{ backgroundColor: blockColor }">{{ title }}</span>
    <div class="trending-info">
      <span class="count">{{ count }}</span>
      <div class="description-div">
        <!-- <span class="description"> {{ description }}</span> -->
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
    /* grid-template-columns: auto auto; */
    margin-top: 10px;
  }
  .info-block {
    width: fit-content;
    height: 10rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  }
  .title {
    display: block;
    width: 100%;
    /* padding: 12px 0; */
    font-size: 16px;
    font-weight: bold;
    color: #060606;
    text-align: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .count {
    font-size: 32px;
    font-weight: bold;
    margin-right: 10px;
  }

  .description {
    font-size: 16px;
    color: #666666;
  }

</style>
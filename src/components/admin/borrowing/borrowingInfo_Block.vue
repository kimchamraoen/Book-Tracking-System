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
  name: 'BorrowingInfoBlock',
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
      default: '#09408f', // Default color if not provided
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
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    display: grid;
    align-items: center;
    justify-items: center;
  }

  .title {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #fdfafa;
    text-align: center;
  }
  .count {
    font-size: 32px;
    font-weight: bold;
    margin-right: 10px;
  }
  .descriptio {
    font-size: 10px;
    color: #000000;
    margin-bottom: 1rem;
  }


</style>

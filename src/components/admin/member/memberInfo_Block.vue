<template>
  <div class="info-block">
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
.info-block {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}
.title {
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  border-radius: 10px 10px 0 0;
}
.trending-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  padding: 0 20px 20px 20px;
}
.count {
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
}
.description-div {
  margin-top: 10px;
  text-align: center;
}
</style>

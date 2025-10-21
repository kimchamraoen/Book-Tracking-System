<template>
  <div class="info-block">
    <span class="title" :style="{ backgroundColor: blockColor }">{{ title }}</span>
    <div class="info">
      <img :src="image" :alt="title" />
      <div class="trending-info">
        <span class="count">{{ count }}</span>
        <div class="description-div">
          <span class="description"> {{ description1 }}</span>
          <span class="description"> {{ description2 }}</span>
          <span class="description"> {{ description3 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardInfoBlock',
  props: {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    blockColor: {
      type: String,
      default: '#f0f0f0', // Default color if not provided
    },
    description1: {
      type: String,
      default: 'Description not provided', // Default description if not provided
    },
    description2: {
      type: String,
      default: 'Description not provided', // Default description if not provided
    },
    description3: {
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
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  /* background-color: aqua; */
}
.info-block:active {
  transform: translateY(2px);
}
.info-block img {
  width: 100px;
}
.info {
  height: 200px;
  /* height: 100%; */
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px 10px 0;
  background-color: aliceblue;
}
.title {
  border-radius: 10px 10px 0px 0;
  text-align: center;
  padding: 20px;
  font-weight: 400;
  font-size: 1.3rem;
  width: 100%;
}
.count {
  text-align: center;
  width: 100%;
  font-weight: 700;
  font-size: 2rem;
}
.description {
  text-align: left;
  width: 100%;
  font-weight: 400;
  font-size: 0.9rem;
  color: #666;
}
.trending-info {
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* background-color: yellow; */
}
.description-div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 15px;
  /* background-color: tomato; */
}
</style>

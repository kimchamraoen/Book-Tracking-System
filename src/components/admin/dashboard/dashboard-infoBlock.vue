<template>
  <div class="info-block">
    <span class="title" :style="{ backgroundColor: blockColor }">{{ title }}</span>
    <div class="info">
      <div class="trending-info">
        <img :src="image" :alt="title" />
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
      default: '#0d3b66', // Default color if not provided
    },
    description1: {
      type: String,
      default: '', // Default description if not provided
    },
    description2: {
      type: String,
      default: '', // Default description if not provided
    },
    description3: {
      type: String,
      default: '', // Default description if not provided
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
}

.info-block:active {
  transform: translateY(2px);
}

.info-block img {
  width: 100px;
}

.info {
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  box-sizing: border-box;
}

.title {
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fdfafa;
  text-align: center;
  border-radius: 10px 10px 0 0;
}

.trending-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 0px 20px;
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

.description {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin: 2px 0;
}
</style>

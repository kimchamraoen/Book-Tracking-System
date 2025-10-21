<template>
  <div class="info-book">
    <img src="/src/assets/images/atomic-habit.jpg" alt="" />
    <h3>{{ title }}</h3>
    <button>View</button>
  </div>
</template>

<script>
export default {
  name: 'BookCardDetail',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.info-book {
  /* width: 180px; */
  /* width: 100%; */
  /* height: 250px; */
  border-radius: 8px;
  box-shadow: 0 2px 8px hsla(0, 0%, 0%, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin: 10px;
}
.info-book img {
  /* width: 100%; */
  height: 120px;
  object-fit: cover;
}
.info-book h3 {
  font-size: 1.1rem;
  margin: 10px 0;
  text-align: center;
  padding: 0 10px;
  flex-grow: 1;
}
.info-book button {
  background-color: #c8efff;
  border: 1px solid #c1c1c1;
  padding: 8px 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.info-book button:hover {
  background-color: deepskyblue;
}
</style>

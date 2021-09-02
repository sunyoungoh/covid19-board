<template>
  <div class="spinner-container">
    <div class="spinner" />
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.spinner {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 4.5px solid #e0e0e0;
  border-bottom: 4.5px solid #ff6384;
  animation: spin 1s linear infinite;
  position: relative;
}
@media screen and (max-width: 786px) {
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e0e0e0;
    border-bottom: 4px solid #ff6384;
    animation: spin 1s linear infinite;
    position: relative;
  }

  .spinner-container {
    margin: 50% 0;
  }
}
@media screen and (max-width: 425px) {
  .spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #e0e0e0;
    border-bottom: 3px solid #ff6384;
    animation: spin 1s linear infinite;
    position: relative;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

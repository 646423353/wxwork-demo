<script setup lang="ts">
import { ref } from 'vue';
import { selectImage } from '../utils/wx-sdk';

const images = ref<string[]>([]);
const errorMsg = ref('');

const handleSelectImage = async () => {
  try {
    errorMsg.value = '';
    const res = await selectImage();
    // In a real app, mediaId needs to be uploaded or converted. 
    // For demo, we just show the count or IDs, as we can't easily display local mediaIds in browser without getLocalImgData
    // 实际应用中需要将 localIds 上传或转换。
    // Android 可直接作为 img src，iOS 需要调用 getLocalImgData
    const ids = res.localIds || res.mediaIds || res.fileIds || [];
    console.log('Selected images:', ids);
    images.value = ids;
    alert(`已选择 ${ids.length} 张图片: ${JSON.stringify(ids)}`);
  } catch (err: any) {
    console.error('Select image failed', err);
    
    // Check for specific permission error
    const msg = err.err_msg || err.errMsg || JSON.stringify(err);
    if (msg.includes('no permission') || msg.includes('auth denied')) {
       errorMsg.value = '无权限，请检查 agentConfig 配置或签名是否正确。 (Error: ' + msg + ')';
    } else {
       errorMsg.value = '选择图片失败: ' + msg;
    }
  }
};
</script>

<template>
  <div class="image-selector">
    <h3>企微图片选择器</h3>
    <button @click="handleSelectImage" class="btn">选择图片</button>
    
    <div v-if="errorMsg" class="error">
      {{ errorMsg }}
    </div>

    <div v-if="images.length" class="result">
      <p>已选图片 Media ID:</p>
      <ul>
        <li v-for="id in images" :key="id">{{ id }}</li>
      </ul>
      <p class="hint">注：Media ID 可用于服务器端获取图片。如需本地显示，请使用 <code>getLocalImgData</code>。</p>
    </div>
  </div>
</template>

<style scoped>
.image-selector {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn {
  background-color: #0068ff; /* WeCom blue */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056cc;
}

.error {
  color: red;
  margin-top: 10px;
}

.result {
  margin-top: 20px;
  text-align: left;
}

.hint {
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

ul {
  padding-left: 20px;
  word-break: break-all;
}
</style>

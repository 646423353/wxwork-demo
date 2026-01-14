<script setup lang="ts">
import { onMounted } from 'vue';
import ImageSelector from './components/ImageSelector.vue';
import { initSdk, getRealSignature } from './utils/wx-sdk';

onMounted(async () => {
  try {
    // 尝试初始化 SDK
    await initSdk({
      corpId: 'ww696c79f785901369',
      agentId: '1000002',
      // 只保留必要的 API
      jsApiList: [
        'checkJsApi',
        'chooseImage',
        'getLocalImgData',
        'previewImage',
      ],
      // 使用真实签名获取逻辑
      // Corp Config 签名
      getConfigSignature: (url) => getRealSignature(url, 'corp'),
      // Agent Config 签名 (API key is 'app')
      getAgentConfigSignature: (url) => getRealSignature(url, 'app'),
    });
    console.log('SDK init success');
  } catch (error) {
    console.warn('SDK init failed:', error);
  }
});
</script>

<template>
  <div class="container">
    <h1>企业微信侧边栏 Demo</h1>
    <p class="description">
      本 Demo 展示如何集成企业微信 JS-SDK 实现图片选取功能。
    </p>
    
    <ImageSelector />
    
    <footer>
      <p>注：请在企业微信客户端中运行以测试实际功能。</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #333;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

.description {
  color: #666;
  margin-bottom: 30px;
}

footer {
  margin-top: 40px;
  font-size: 12px;
  color: #999;
}
</style>

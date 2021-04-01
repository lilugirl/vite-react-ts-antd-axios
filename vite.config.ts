import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path';
import fs from 'fs';
import lessToJS from 'less-vars-to-js';
import config from './config';

const themeVariables=lessToJS(
  fs.readFileSync(path.resolve(__dirname,'./config/variables.less'),'utf-8')
)
// @ts-ignore
const env =process.argv[process.argv.length-1];
const base =config[env];

// https://vitejs.dev/config/
export default defineConfig({
  base:base.cdn,
  server:{
    port:3001, //开发环境启动的端口
    proxy:{
      '/api':{
        // 当遇到 /api 路径时，将其转换成 target的值，这里我们为了测试，写了新蜂商城的请求地址
        target:'http://47.99.134.126:28019/api/v1',
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/,'')  //将 /api重写为空
    
      }
    }
  },
  resolve:{
    alias:{
      '~':path.resolve(__dirname,'./'), // 根路径
      '@':path.resolve(__dirname,'src') // src路径
    }
  },
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList:[
        {
          libName:'antd',
          style:(name)=>`antd/lib/${name}/style/index.less`
        }
      ]
    })
  ],
  css:{
    preprocessorOptions:{
      less:{
        // 支持内联Javascript
        javascriptEnabled:true,
        // 重写less变量，定制样式
        modifyVars:themeVariables
      }
    }
  }
})

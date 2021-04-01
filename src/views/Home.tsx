import React, { useEffect } from 'react';
import {Button} from 'antd';
import {get} from '../utils'
// @ts-ignore
import config from '~/config';
const Home=()=>{
    useEffect(()=>{
      console.log('config',config);
      // @ts-ignore
      get('/index-infos').then(()=>{

      })
    },[])
    return <div>
        <h2>Home Page</h2>
        <Button type="primary">首页</Button>
    </div>
}

export default Home;
<template>
  <div id="list">
    <div class="header">
      <div class="title">
        <h2>{{ title[0] }}</h2>
        <h2 @click="change">{{ title[1] }}</h2>
      </div>
      <div class="search">
        <a-input-search
          v-model:value="value"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
      </div>
    </div>
    <div class="main">
      <a-table :columns="columns1"
               :data-source="data"
               :customRow='customRow'
                v-if="index">
      </a-table>
      <a-table :columns="columns2"
               :data-source="data"
               :customRow='customRow'
               v-if="!index">
      </a-table>
    </div>
  </div>
  <div id="play">
    <h2>视频审核</h2>
    <div class="message">
      <span>视频预览：{{ currentRow.title }}</span>
      <span v-if="!index">审核时间：{{ currentRow.title }}</span>
      <span v-if="!index">审核结果：{{ currentRow.title }}</span>
    </div>
    <div class="content">
      <Player :url="url"/>
    </div>
    <div class="footer">
      <div class="url">
        <span>地址：</span>
        <span>{{ currentRow.videoUrl }}</span>
      </div>
      <div class="btn">
        <a-button type="primary" danger @click="check(0)">不通过</a-button>
        <a-button type="primary" @click="check(1)">通过</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Player from '@/components/Player.vue'
import { getAuditList } from '@/api/index'
const columns1 = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '视频时长',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: '地址',
    dataIndex: 'videoUrl',
    key: 'videoUrl',
    width: 300,
    ellipsis: true,
  },
];
const columns2 = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '视频时长',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: '审核时间',
    dataIndex: 'videoUrl',
    key: 'videoUrl',
  },
  {
    title: '结果',
    dataIndex: 'videoUrl',
    key: 'videoUrl',
  },
];
export default defineComponent({
  components: {
    Player
  },
  setup() {
    const value = ref<string>('');
    const onSearch = (searchValue: string) => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
    };
    return {
      value,
      onSearch,
      columns1,
      columns2,
    };
  },
  data(){
    return {
      url: '',
      title: ['审核列表','审核记录'],
      data : [
        {
          key: '1',
          title: 'John Brown',
          duration: 32,
          createTime: 'New York No. 1 Lake Park',
          videoUrl: 'sss',
        },
        {
          key: '2',
          title: 'John Brown',
          duration: 32,
          createTime: 'New York No. 1 Lake Park',
          videoUrl: 'sss',
        },
        {
          key: '3',
          title: 'John Brown',
          duration: 32,
          createTime: 'New York No. 1 Lake Park',
          videoUrl: 'sss',
        },
      ],
      index: true,
      currentRow: {},
      columns: [],
    }
  },
  methods: {
    change() {
      this.index = !this.index,
      [this.title[0], this.title[1]] = [this.title[1], this.title[0]]
      // const data = {
      //   subToken: 1,
      //   frameId: 2,
      // }
      // getAuditList(data).then( res => {
      //   this.data = res.data
      //   this.data.forEach((item:any,index) => {
      //     item.key= index
      //   })
      //   console.log(this.data);
      // })
    },
    customRow(record,index){
      return {
        onClick: (e) => {
          this.currentRow = record
          this.url = record.videoUrl
        }
      }
    },
    check(data){
      console.log(data)
    }
  },
})
</script>
<style lang="less" scoped>
#list {
  width: 50%;
  height: 90%;
  border: 1px solid skyblue;
  margin: 50px 10px 50px 50px;

  .header {
    display: flex;
    justify-content: space-between;
    margin: 40px 0;

    .title {
      display: flex;

      :nth-child(1) {
        padding: 0 10px 10px 10px;
        border-bottom: 5px solid #1890ff;
        font-weight: 600;
        font-size: 30px;
        line-height: 30px;
        }

      h2 {
        margin-left: 50px;
        font-weight: 500;
        font-size: 26px;
        line-height: 26px;
        cursor: pointer;
      }
    }

    .search {
      margin-right: 50px;

      .ant-input-search {
        border-radius: 20px;
        line-height: 40px;
      }

    }
  }
  .main {
    width: 100%;
    height: 70%;
    padding: 0 20px;

  }
}
#play {
  width: 50%;
  height: 90%;
  border: 1px solid skyblue;
  margin: 50px 50px 50px 10px;
  text-align: left;
  font-size: 18px;
  padding: 0 20px;

  h2 {
    margin: 40px 0 20px;
    font-weight: 600;
    font-size: 30px;

  }

  .message {
    display: flex;
    margin: 10px 50px 10px 0;
    justify-content: space-between;
  }

  .content {
    width: 100%;
    height: 60%;
  }

  .footer {
    width: 100%;

    .url {
      display: flex;
      margin: 20px 0;

      :nth-child(2) {
        flex:1;
        border: 1px solid rgb(165, 164, 164);
        border-radius: 5px;
      }
    }
    .btn {
      display: flex;
      justify-content: end;

      .ant-btn {
        margin-right: 20px;
      }
    }


  }
}
</style>

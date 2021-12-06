<template>
  <div id="list">
    <div class="header">
      <div class="title">
        <h2>{{ title[0] }}</h2>
        <h2 @click="change(2)">{{ title[1] }}</h2>
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
      <span v-if="!index">审核时间：{{ currentRow.auditTime }}</span>
      <span v-if="!index">审核结果：{{ currentRow.auditStatue }}</span>
    </div>
    <div class="content">
      <Player :url="url"/>
    </div>
    <div class="footer">
      <div class="url">
        <span>地址：</span>
        <span>{{ currentRow.videoUrl }}</span>
      </div>
      <div class="btn" v-show="index">
        <a-button type="primary" danger @click="check(2)">不通过</a-button>
        <a-button type="primary" @click="check(1)">通过</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import Player from '@/components/Player.vue'
import { getAuditList, changAuditStatue } from '@/api'
import { formatDate } from '@/utils/index'
import { message } from 'ant-design-vue';
const columns1 = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    ellipsis: true,
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 200,
    ellipsis: true,
  },
  {
    title: '视频时长',
    dataIndex: 'duration',
    key: 'duration',
    width: 200,
    ellipsis: true,
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
    dataIndex: 'auditTime',
    key: 'auditTime',
  },
  {
    title: '结果',
    dataIndex: 'auditStatue',
    key: 'auditStatue',
  },
];
export default defineComponent({
  name:'Home',
  components: {
    Player
  },
  setup() {
    const success = () => {
      message.success('This is a success message');
    };
    const error = () => {
      message.error('This is an error message');
    };
    const warning = () => {
      message.warning('This is a warning message');
    };

    const title = reactive<string[]>(['审核列表','审核记录']);

    const value = ref<string>('');
    const onSearch = () => {
      value.value.trim()
      change(1)
      value.value = ''
    };

    let index = ref<boolean>(true) // 判断列表
    let data = ref([])
    function change(e) {
      if(e === 2) {
      index.value = !index.value,
      [title[0], title[1]] = [title[1], title[0]]
      }
      const parmas = {
        subToken: window.EL.subToken,
        frameId: window.EL.id,
        type: index.value ? 0 : 1,
        title: value.value || ''
      }
      getAuditList(parmas).then( (res:any) => {
        if(res.flag === 100) {
          data.value = res.data
          data.value.forEach((item:any,index) => {
          item.key= index
          item.createTime = formatDate(item.createTime)
          item.auditTime = formatDate(item.auditTime)
          item.auditStatue = item.auditStatue === 1 ? '通过' : '未通过'
        })
        }
        else { message.warning(res.flagString) }
      })
    }
    onMounted(() => change(0))

    let url = ref<string>('');
    let currentRow = ref({
      id: ''
    });
    // 选中列表
    function customRow(record){
      return {
        onClick: () => {   
          currentRow.value = record
          url.value = record.videoUrl       
        }
      }
    }

    function check(index) {
      const data = {
        subToken: window.EL.subToken,
        id: currentRow.value.id,
        status: index,
      }
      changAuditStatue(data).then( (res: any) => {
        if(res.flag === 100) { message.success('success') }
        else { message.warning(res.flagString) }
      }).catch(() => {
        message.error('error');
      })
    }
    return {
      value,
      onSearch,
      columns1,
      columns2,
      url,
      success,
      error,
      warning,
      title,
      currentRow,
      index,
      data,
      change,
      customRow,
      check
    };
  }
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
    overflow: hidden;
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
        padding-left: 5px;
        border: 1px solid rgb(165, 164, 164);
        border-radius: 5px;
        word-break:normal; 
        width:auto; 
        display:block; 
        white-space:nowrap;
        word-wrap : break-word ;
        overflow: hidden ;
      }
    }
    .btn {
      display: flex;
      justify-content: flex-end;

      .ant-btn {
        margin-right: 20px;
      }
    }
  }
}
</style>

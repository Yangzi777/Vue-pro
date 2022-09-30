<template>
  <div class="bannerlist-container">
    <div class="header">
      <el-button
        @click="addBannerBtn"
        type="primary"
      >
        添加轮播图
        <el-icon class="el-icon--right">
          <Plus />
        </el-icon>
      </el-button>
    </div>
    <el-table
      :header-cell-style="headerCellStyle"
      :cell-style="{ textAlign: 'center' }"
      :data="computedTableData"
      style="width: 100%"
      max-height="440"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
      />
      <el-table-column
        prop="img"
        label="图片"
      >
        <template #default="scope">
          <el-image :src="scope.row.img"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="link"
        label="链接"
      />
      <el-table-column
        prop="alt"
        label="提示"
      />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.bannerid)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--此处是分页器-->
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="tableData.length"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
    />
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'
import { getBannerList, deleteBannerById } from '@/api/banner'
export default defineComponent({
  components: {
    Plus
  },
  data () {
    return {
      pageSize: 6,
      currentPage: 1,
      tableData: [],
      headerCellStyle: {
        color: 'rgba(0,0,0,0.85)',
        fontWeight: '700',
        fontSize: '14px',
        textAlign: 'center',
        background: '#f8f8f8',
        height: '60px',
        borderRight: '1px solid #f0f0f0',
        transition: 'background .3s ease'
      }
    }
  },
  computed: {
    computedTableData () {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      )
    }
  },
  methods: {
    getBannerListData () {
      getBannerList().then((res) => {
        this.tableData = res.data
      })
    },
    addBannerBtn () {
      this.$router.push('/banner/banneradd')
    },
    handleDelete (bannerid) {
      deleteBannerById({ bannerid }).then(() => {
        this.getBannerListData()
      })
    }
  },
  created () {
    this.getBannerListData()
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.bannerlist-container {
  height: 100%;
  padding: 24px;
  background-color: #fff;
}
</style>

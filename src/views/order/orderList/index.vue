<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 17:36:34
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-23 16:39:14
 * @Desc: 订单列表 - page
-->
<template>
  <div class="order-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="ID" min-width="100"></el-table-column>
            <el-table-column prop="userName" label="用户名称" min-width="140"></el-table-column>
            <el-table-column prop="agentName" label="代理" min-width="120"></el-table-column>
            <el-table-column prop="productName" label="商品名称" min-width="140"></el-table-column>
            <el-table-column prop="totalPrice" label="订单总价" min-width="90"></el-table-column>
            <el-table-column prop="price" label="商品单价" min-width="90"></el-table-column>
            <el-table-column prop="count" label="购买数量" min-width="80"></el-table-column>
            <el-table-column prop="orderNo" label="主订单编号" min-width="140"></el-table-column>
            <el-table-column prop="orderItemNo" label="子订单编号" min-width="140"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="180"></el-table-column>
            <el-table-column prop="statusName" label="订单状态" min-width="80"> </el-table-column>

            <el-table-column label="操作" min-width="80">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="onConfirm(scope.row, scope.$index)"
                  v-if="scope.row.status == 1"
                  >确认付款</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="onEdit(scope.row, scope.$index)"
                  v-if="scope.row.status == 2 || scope.row.status == 3"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination
          :currentPage.sync="pagination.currentPage"
          :pageSize.sync="pagination.pageSize"
          :total="pagination.total"
          @currentChange="currentChange"
          @sizeChange="sizeChange"
        />
      </div>
    </div>

    <editStatus :visible.sync="isEditStatus" :formData="editFormData" @success="handleEditSuccess" />
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import editStatus from '@/views/order/components/orderList/handleEditStatus'
import { getOrderList, payFinish } from '@/api/order'
import { getOrderStatus } from '@/filters/transform'
export default {
  name: '',
  data() {
    return {
      isEditStatus: false,
      editFormData: { status: '', id: '' },
      searchData: {
        userId: '',
        orderNo: '',
        orderItemNo: '',
        status: '',
        startDate: '',
        endDate: ''
      },
      tableList: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      formOptions: [
        {
          label: '用户ID',
          prop: 'userId',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入下单用户ID'
        },
        {
          label: '主订单编号',
          prop: 'orderNo',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入主订单编号'
        },
        {
          label: '子订单编号',
          prop: 'orderItemNo',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入子订单编号'
        },
        {
          label: '订单状态',
          prop: 'status',
          element: 'el-select',
          options: getOrderStatus(),
          initValue: '',
          placeholder: ''
        },
        {
          label: '日期',
          prop: 'times',
          element: 'el-date-picker',
          initValue: '',
          placeholder: ''
        }
      ]
    }
  },
  computed: {},
  created() {
    // TODO: 订单状态 1 待付款；2待发货；3已发货；4已签收
    this.getData()
  },
  mounted() {},
  methods: {
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onSearch(data) {
      console.log('-search-', data)
      console.log(data.userId)
      // int 类型 取值有限制 -2147483648到2147483647
      if (data.userId > 2147483647) {
        this.$message({
          message: '用户ID输入有误！',
          type: 'warning'
        })
        return
      }
      this.searchData.userId = data.userId
      this.searchData.orderNo = data.orderNo
      this.searchData.orderItemNo = data.orderItemNo
      this.searchData.status = data.status
      this.searchData.startDate = data.times ? data.times[0] : ''
      this.searchData.endDate = data.times ? data.times[1] : ''
      this.getInitData()
    },
    onConfirm(row, index) {
      console.log('-confirm-', row, index)
      this.$confirm('确认支付完成！', '提示', {
        center: true,
        type: 'warning'
      })
        .then(() => {
          const params = { id: row.orderId }
          payFinish(params).then(res => {
            console.log('-res-', res)
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
            this.getData()
          })
        })
        .catch(() => {})
    },
    onEdit(row, index) {
      console.log('-edit-', row, index)
      this.isEditStatus = true
      this.editFormData = { status: row.status + 1, id: row.id }
    },
    handleEditSuccess() {
      console.log('编辑成功回调')
      this.getInitData(this.pagination.currentPage, this.pagination.pageSize)
    },
    currentChange(pageNum) {
      this.getInitData(pageNum, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      console.log('-params-', params)
      getOrderList(params).then(res => {
        console.log('-res-', res)
        const { count, list } = res.data
        this.pagination.total = count
        this.tableList = list
        console.log('-list-', this.tableList)
      })
    }
  },
  components: { searchForm, pagination, editStatus }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

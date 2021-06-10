<!--
 * @Author: wangshengxian
 * @Date: 2020-10-09 18:25:11
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-08 14:08:43
 * @Desc: 订单管理 - 编辑订单状态 - components
-->
<template>
  <div class="dialog-components">
    <el-dialog title="修改订单状态" width="600px" center :visible.sync="dialogVisible" @closed="handleClosed">
      <el-form :model="formData" ref="formRef" label-width="120px">
        <el-form-item label="订单状态:" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="3" v-if="isShow">已发货</el-radio>
            <el-radio :label="4">已签收</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateOrderStatus } from '@/api/order'
export default {
  name: '',
  data() {
    return {
      isShow: true,
      isInit: true
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    formData: {
      handler(data) {
        // console.log('-watch-edit-', data)
        if (this.isInit) {
          this.isInit = false
          this.isShow = this.formData.status !== 4
        }
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    initData() {
      this.isShow = true
      this.isInit = true
    },
    handleClosed() {
      console.log('-closed-')
      this.initData()
    },

    onSave() {
      console.log('-save-')
      this.$refs.formRef.validate(valid => {
        if (valid) {
          console.log(this.formData)
          // TODO: 订单状态 1 待付款；2待发货；3已发货；4已签收
          updateOrderStatus(this.formData).then(res => {
            console.log('-res-', res)
            this.dialogVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$emit('success')
            this.initData()
          })
        } else {
          return false
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.el-input {
  width: 160px;
}
</style>

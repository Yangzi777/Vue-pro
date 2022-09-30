<template>
  <div class="banneradd-container">
    <el-form
      ref="elForm"
      :rules="rules"
      label-position="right"
      label-width="60px"
      :model="ruleForm"
    >
      <el-form-item
        label="alt"
        prop="alt"
      >
        <el-input
          v-model="ruleForm.alt"
          placeholder="请输入alt..."
        />
      </el-form-item>
      <el-form-item
        label="link"
        prop="link"
      >
        <el-input
          v-model="ruleForm.link"
          placeholder="请输入link..."
        />
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :http-request="httpRequest"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
          >
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="base64"
        prop="img"
      >
        <el-input
          v-model="ruleForm.img"
          disabled
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
        >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { bannerAdd } from '@/api/banner'
import { Plus } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Plus
  },
  methods: {
    submitForm (formEl) {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          bannerAdd(this.ruleForm).then(() => {
            this.$router.push({ name: 'bannerlist' })
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    httpRequest (data) {
      console.log('httprequest-data', data.file)
      //  限制文件类型，必须是图片类型
      const typeRight = ['image/jpeg', 'image/jpg', 'image/png'].includes(
        data.file.type
      )
      //  限制图片大小
      const sizeRigtht = data.file.size / 1024 / 1024 < 2
      if (!typeRight) {
        ElMessage.error('文件类型不正确')
        return false
      } else if (!sizeRigtht) {
        ElMessage.error('图片大小不能大于2M')
        return false
      }
      //  根据上传的file生成一个可以看到的图片的imgUrl,用于展示
      this.imageUrl = URL.createObjectURL(data.file)
      //  获取文件的base64地址
      this.getBase64(data.file)
        .then((base64Res) => {
          this.ruleForm.img = base64Res
        })
        .catch((err) => console.log(err))
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        reader.onload = () => {
          fileResult = reader.result
        }
        reader.onerror = (err) => {
          reject(err)
        }
        reader.onloadend = () => {
          resolve(fileResult)
        }
      })
    }
  },
  mounted () {
    this.ruleFormRef = this.$refs.elForm
  },
  data () {
    return {
      ruleFormRef: null,
      imageUrl: '',
      ruleForm: {
        img: '',
        alt: '',
        link: ''
      },
      rules: {
        link: [{ required: true, message: '必须要输入link', blur }],
        alt: [{ required: true, message: '必须要输入alt', blur }],
        img: [{ required: true, message: '必须要输入选择上传的图片', blur }]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-upload {
  .el-icon {
    width: 46px;
    height: 46px;
    background: #fff;
  }
}

.banneradd-container {
  width: 400px;
  height: 100%;
}
</style>

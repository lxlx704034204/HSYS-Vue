<template>
  <div
    >
    <quill-editor
      ref="newEditor"
      :options="newOption"
      v-model="editorContent"
      @change="editorChange">
    </quill-editor>
    <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
      <input style="display: none" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg('uploadFormMulti')"><!--style="display: none"-->
    </form>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  import Quill from 'quill'
  import { ImageImport } from './modules/ImageImport.js'
  import { ImageResize } from './modules/ImageResize.js'
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)

  export default {
    props: ['text', 'editorId'],
    components: {quillEditor},
    data(){
      return {
        editorContent: '',
        uniqueId: '',
        imgPercent: 0,
        imageLoading: false,
        newOption: {
          placeholder: '请输入内容',
          history: {
            delay: 100,
            maxStack: 100,
            userOnly: false
          },
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            imageImport: true,
            imageResize: {
              displaySize: true
            },
          },
          strict: false,//should be false for ignore unexpected update
        },
        addImgRange: '',//全局参数，每次添加图片时记录当前索引和长度
      }
    },
    computed: {
    },
    methods: {
      editorChange({ editor, html, text }) {
        var vm = this
        vm.$emit('editorChange', html)
      },
      uploadImg: async function(id) {
        var vm = this
        vm.imageLoading = true
        var formData = new FormData($('#' + id)[0]);
        // console.log(id);
        // console.log(formData)
        // console.log('uploadImg');
        console.log(document.getElementById(vm.uniqueId).files[0]);
            

        try {
          // let url = 'http://dongcaicai.oss-cn-beijing.aliyuncs.com/20180122/ce743d580b2f4b5883e36eacc4b442a5.png';
          var fd = new FormData();
          var files = document.getElementById(vm.uniqueId).files[0];
          fd.append('file', files);
          var xhr = new XMLHttpRequest();
          xhr.addEventListener("load", (evt)=>{ 
            
            console.log(JSON.parse(evt.target.responseText));
            let response = JSON.parse(evt.target.responseText);
            let url = response.data.url;
            if (url != null && url.length > 0) {
            var value = url
            value = value.indexOf('http') != -1 ? value : 'http:' + value //返回图片网址中如果没有http自动拼接
            let index = vm.addImgRange != null?vm.addImgRange.index:0 // 获取插入时的位置索引，如果获取失败，则插入到最前面
            vm.$refs.newEditor.quill.insertEmbed(index , 'image', value, Quill.sources.USER)
            var img = new Image()
            img.src = value
            vm.$refs.newEditor.quill.formatText(index, index + 1);
          } else {

          }
          document.getElementById(vm.uniqueId).value=''
            }, false);
          xhr.open("POST", this.axios.defaults.baseURL + '/upload');//修改成自己的接口
          xhr.send(fd);
          // url = await vm.uploadImgReq(123)
          // console.log(url)
          // if (url != null && url.length > 0) {
          //   var value = url
          //   value = value.indexOf('http') != -1 ? value : 'http:' + value //返回图片网址中如果没有http自动拼接
          //   let index = vm.addImgRange != null?vm.addImgRange.index:0 // 获取插入时的位置索引，如果获取失败，则插入到最前面
          //   vm.$refs.newEditor.quill.insertEmbed(index , 'image', value, Quill.sources.USER)
          //   var img = new Image()
          //   img.src = value
          //   vm.$refs.newEditor.quill.formatText(index, index + 1);
          // } else {

          // }
          // document.getElementById(vm.uniqueId).value=''


        } catch ({message: msg}) {
          document.getElementById(vm.uniqueId).value=''

        }
        vm.imageLoading = false
      },
      uploadImgReq (evt) {
        console.log(evt);
        // console.log(JSON.parse(evt.target.responseText));
        // console.log(1213123);
        // 这里实现你自己的图片上传
        return new Promise((resolve, reject) => {
          if (true) {
            resolve("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514179021485&di=fae56d93e493b0a50f550ed16a8c5f9d&imgtype=0&src=http%3A%2F%2Fpic.92to.com%2F201612%2F11%2Faceb0f89128a4554a33d5a735e165ca9_th.jpg")
          } else {
            reject({message: '图片上传失败'})
          }
        })
      },
    },
    created: function () {
      var vm = this
      vm.imgPercent = 0
      vm.editorContent = vm.text
        vm.uniqueId = vm.editorId?vm.editorId:'inputImg'
    },
    watch:{
      text: function () {
        var vm = this
        vm.editorContent = vm.text
      }
    },
    mounted() {
      var vm =this
      // you can use current editor object to do something(quill methods)

      var imgHandler = async function(image) {
        vm.addImgRange = vm.$refs.newEditor.quill.getSelection()
        if (image) {
          var fileInput = document.getElementById(vm.uniqueId) //隐藏的file文本ID
          fileInput.click() //加一个触发事件
        }
      }

      vm.$refs.newEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
    }

  }
</script>
<style scoped>

</style>

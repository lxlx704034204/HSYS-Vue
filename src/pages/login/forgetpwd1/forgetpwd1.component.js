import axios from '../../../http'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.length < 4 || value.length > 15) {
        callback(new Error('请输入正确账号'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
        document.getElementById('cz').style.display = 'none';
      }
    };
    var validatePass2 = (rule, value, callback) => {
      var t = document.getElementById('te').style.display
      if (t !== 'block') {
        callback(new Error('请拖动滑块验证！'));
      } else {
        callback();
      }
    };
    return {
      msg: '',
      ruleForm2: {
        pass: '',
        checkPass: '',
      },
      rules2: {
        pass: [
          { validator: validatePass, }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],

      },
      names: false,
      namea: "",
      verif: false,
      verifs: ""
    };
  },
  created() {
    var urlId = this.$route.path;
    this.$store.commit("switchHeaderType", 3);
    this.namea = "";
  },
  mounted() {
  },

  methods: {
    open() {
      this.$alert('请先输入账号', '提示', {
        confirmButtonText: '确定',
        type: 'error',
      });
    },
    submitForm(formName) {
      var that = this;
      if (that.ruleForm2.pass == " ") {

      } else {
        this.axios.post('updatepaw/checkPhone?phone=' + this.ruleForm2.pass + '&captcha=' + $('.captcha').val()).then((res) => {
          if (res && res.code.toString() !== "0") {
            that.names = true;
            that.ruleForm2.pass = ""
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'error',
            });
            $(".move").removeClass("moveSuccess");
            $(".move").addClass("moveBefore");
            $('.movego').css({
              width: 0
            }).siblings('.move').css({
              left: -1
            }).siblings('.txt').html('拖动滑块验证');
          } else {
            that.$router.push('/forgetpwd2')
          }
        });
      }

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  directives: {
    move(el, ...args) {
      el.onmousedown = function (e) {
        var X = e.clientX - el.offsetLeft
        document.onmousemove = function (e) {
          var endx = e.clientX - X
          el.className = 'move moveBefore'
          el.style.left = endx + 'px'
          var width = $('.movebox').width() - $('.move').width()
          el.parentNode.children[0].style.width = endx + 'px'
          el.parentNode.children[1].innerHTML = '拖动滑块验证'
          //临界值小于
          if (endx <= 0) {
            el.style.left = -1 + 'px'
            el.parentNode.children[0].style.width = 0 + 'px'
          }
          //滑块在中间位置停下
          document.onclick = function (e) {
            if (parseInt(el.style.left) < width) {
              el.style.left = -1 + 'px'
              el.parentNode.children[0].style.width = 0 + 'px'
            }
          }
          //临界值大于
          if (parseInt(el.style.left) >= width) {
            el.style.left = width + 'px'
            el.parentNode.children[0].style.width = width + 'px'
            el.parentNode.children[1].innerHTML = '验证通过'
            el.className = 'move moveSuccess'
            el.onmousedown = null
            document.getElementById('te').style.display = 'block';
            axios.get('updatepaw/captcha').then((res) => {
              console.log(res);
              $(el).siblings('.captcha').val(res);
            });
          }
        }

      }
      document.onmouseup = function () {
        document.onmousemove = null
      }

    }

  }
}
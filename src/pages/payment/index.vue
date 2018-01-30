<template src="./payment.component.html"></template>
<script src="./payment.component.js"></script>
<style src="./payment.component.scss" scoped lang="scss"></style>

<style>
.payment .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.payment .avatar-uploader .el-upload:hover {
    border-color: #009FE2;
  }
.payment .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
.payment .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.payment .payment_btn .el-button--primary:hover {
    color: #fff;
    background-color: #009FE2;
    border-color: #009FE2;
}
</style>

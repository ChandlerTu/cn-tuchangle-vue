<template>
  <div id="AddFood">
    <el-button @click="dialogFormVisible = true">增加</el-button>

    <el-dialog title="增加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="食物 " :label-width="formLabelWidth ">
          <el-input v-model="form.food"></el-input>
        </el-form-item>
        <el-form-item label="克 " :label-width="formLabelWidth ">
          <el-input v-model="form.gram"></el-input>
        </el-form-item>
        <el-form-item label="日期 " :label-width="formLabelWidth ">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" v-on:click="addFood">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        food: "梨",
        gram: 100,
        date: new Date()
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    addFood() {
      this.dialogFormVisible = false;
      let self = this;
      axios
        .post("/api/foodDiaries", this.form)
        .then(function(response) {
          console.log(response);
          self.$emit("enlarge-text");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
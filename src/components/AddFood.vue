<template>
  <div id="AddFood">
    <el-button @click="dialogFormVisible = true">增加</el-button>

    <el-dialog title="增加" width="80%" :center="true" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="text-align:center">
        <el-form-item>
          <el-input v-model="form.food" placeholder="食物" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.gram" placeholder="克" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" :editable="false" :clearable="false" v-model="form.date">
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
        food: "水",
        gram: 100,
        date: new Date(new Date().toLocaleDateString())
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
          this.console.log(response);
          self.$emit("enlarge-text");
        })
        .catch(function(error) {
          this.console.log(error);
        });
    }
  }
};
</script>
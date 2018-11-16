  <template>
  <div id="DietaryGuidelines">
    <el-row>
      <el-col :span="12">
        <el-date-picker type="date" :editable="false" :clearable="false" v-model="date" @change="findFoodDiaries">
        </el-date-picker>
      </el-col>

      <el-col :span="12">
        <AddFood style="float: right" @enlarge-text="findFoodDiaries"></AddFood>
      </el-col>

    </el-row>
    <el-table :data="foodDiaries">
      <el-table-column prop="food" label="食物">
      </el-table-column>
      <el-table-column prop="gram" label="克">
      </el-table-column>
      <el-table-column prop="date" :formatter="tableColumnFormat" label="日期">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, foodDiaries)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import axios from "axios";

import AddFood from "./AddFood";

export default {
  methods: {
    deleteRow(index, rows) {
      let foodDiary = this.foodDiaries[index];
      axios.delete(foodDiary._links.self.href).catch(function(error) {
        console.log(error);
      });
      rows.splice(index, 1);
    },
    findFoodDiaries() {
      console.log("findFoodDiaries");
      axios
        .get("/api/foodDiaries/search/findByDate?date=" + this.date.toJSON())
        .then(
          response => (this.foodDiaries = response.data._embedded.foodDiaries)
        );
    },
    tableColumnFormat(row, column, cellValue, index) {
      return this.dateFormat(this.toDate(cellValue));
    },
    dateFormat(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    toDate(s) {
      let date = new Date(
        s.substring(0, 4),
        s.substring(5, 7) - 1,
        s.substring(8, 10),
        s.substring(11, 13),
        s.substring(14, 16),
        s.substring(17, 19),
        s.substring(20, 23)
      );
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return date;
    }
  },
  components: { AddFood },
  data() {
    return {
      date: new Date(new Date().toLocaleDateString()),
      foodDiaries: []
    };
  },
  mounted() {
    console.log("mounted");
    this.findFoodDiaries();
  }
};
</script>

<style>
#DietaryGuidelines {
  margin-top: 30px;
}
</style>
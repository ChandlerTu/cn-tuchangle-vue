<template>
  <!-- 膳食指南 -->
  <div id="dietaryGuidelines">
    <el-row>
      <el-date-picker :editable="false" :clearable="false" v-model="date" @change="findFoodDiaries">
      </el-date-picker>
      <AddFood style="float: right" @enlarge-text="findFoodDiaries"></AddFood>
    </el-row>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="膳食日记">
          <el-table :data="foodDiaries">
            <el-table-column label="食物" prop="food">
            </el-table-column>
            <el-table-column label="克" prop="gram">
            </el-table-column>
            <el-table-column label="日期" prop="date" :formatter="columnFormatter">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click.native.prevent="deleteRow(scope.$index, foodDiaries)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="膳食平衡">
          <el-table :data="dietaryBalance">
            <el-table-column label="种类" prop="group">
            </el-table-column>
            <el-table-column label="克" prop="gram">
            </el-table-column>
            <el-table-column label="已摄入" prop="intake">
            </el-table-column>
            <el-table-column label="还需" prop="need">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-row>
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
          response =>
            (this.foodDiaries = response.data._embedded.foodDiaries.reverse())
        );
    },
    columnFormatter(row, column, cellValue) {
      return this.toDateString(this.toDate(cellValue));
    },
    toDateString(date) {
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
    toDate(dateJson) {
      let date = new Date(
        dateJson.substring(0, 4),
        dateJson.substring(5, 7) - 1,
        dateJson.substring(8, 10),
        dateJson.substring(11, 13),
        dateJson.substring(14, 16),
        dateJson.substring(17, 19),
        dateJson.substring(20, 23)
      );
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return date;
    }
  },
  computed: {
    gramsOfGroup: function() {
      const data = this.foodDiaries;
      var a = {};
      for (var i = 0; i < data.length; i++) {
        let food = data[i].food;
        var x = this.group.get(food) || food;
        var n = data[i].gram;
        var num = a[x] ? a[x] : 0;
        a[x] = num + n;
      }
      return a;
    },
    dietaryBalance: function() {
      return this.dailyFoodRecommendations.map(x => {
        x.intake = this.gramsOfGroup[x.group] || 0;
        x.need = x.gram - x.intake;
        return x;
      });
    }
  },
  components: { AddFood },
  data() {
    return {
      date: new Date(new Date().toLocaleDateString()),
      foodDiaries: [],
      group: new Map([["苹果", "水果"], ["香蕉", "水果"], ["葡萄", "水果"]]),
      dailyFoodRecommendations: [
        {
          group: "大米",
          gram: 100
        },
        {
          group: "全谷物及杂豆",
          gram: 100
        },
        {
          group: "薯类",
          gram: 75
        },
        {
          group: "浅色蔬菜",
          gram: 225
        },
        {
          group: "深色蔬菜",
          gram: 225
        },
        {
          group: "水果",
          gram: 300
        },
        {
          group: "畜禽肉类",
          gram: 75
        },
        {
          group: "蛋类",
          gram: 50
        },
        {
          group: "水产品",
          gram: 75
        },
        {
          group: "乳制品",
          gram: 300
        },
        {
          group: "大豆",
          gram: 25
        },
        {
          group: "坚果",
          gram: 10
        },
        {
          group: "烹调油",
          gram: 25
        },
        {
          group: "食盐",
          gram: 5
        },
        {
          group: "水",
          gram: 1600
        }
      ]
    };
  },
  mounted() {
    console.log("mounted");
    this.findFoodDiaries();
  }
};
</script>

<style>
#dietaryGuidelines {
  margin-top: 30px;
}
.el-row {
  margin-bottom: 20px;
}
</style>
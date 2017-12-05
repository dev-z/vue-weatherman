<template>
  <div>
    <div class="content-area">
      <div class="bg-info">
        {{ cities.length}} Cities Found
        <el-button type="primary" icon="el-icon-circle-plus" @click="cityFormVisible = true">Add City</el-button>
      </div>
      <el-table :data="cities" style="width: 100%" stripe>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name">
        </el-table-column>
        <el-table-column
          prop="country"
          label="Country"
          width="250">
        </el-table-column>
        <el-table-column
          label="Operations"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-view" title="View Weather"
              @click="viewWeather(scope.$index, scope.row)">
            </el-button>
            <el-button type="danger"  size="mini" icon="el-icon-close" title="Remove" 
              @click.native.prevent="removeCity(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Dialog -->
      <el-dialog title="Add new City" :visible.sync="cityFormVisible">
        <el-form :model="newCity">
          <el-form-item label="City name">
            <el-input v-model="newCity.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Country">
            <el-input v-model="newCity.country" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cityFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addCity">Confirm</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// unique id gen func
function generateId(n) {
  let length = 6;
  if (n && n > 3) {
    length = n;
  }
  let id = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
}
export default {
  name: 'Cities',
  data() {
    return {
      newCity: {},
      cityFormVisible: false,
    };
  },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
  },
  methods: {
    removeCity(index, city) {
      // console.log(city.name);
      this.$store.commit('removeCity', city);
      this.$message({
        showClose: true,
        message: 'City removed successfully.',
        type: 'success',
        center: true,
      });
    },
    addCity() {
      // TODO Validate new city
      // add id to new city
      this.newCity.id = generateId();
      this.$store.commit('addCity', this.newCity);
      this.cityFormVisible = false;
      this.newCity = {};
      this.$message({
        showClose: true,
        message: 'City added successfully.',
        type: 'success',
        center: true,
      });
    },
    viewWeather(index, city) {
      // console.log(city);
      this.$router.push({ name: 'city-weather', params: { id: city.id } });
    },
  },
};
</script>

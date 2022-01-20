<template>
  <div class="hello">

 <div class="searchbox">
<el-input  v-model="from.roleName"   style="width: 200px;" size="medium" placeholder="身份搜索" clearable/>
        
<template>
  <el-select v-model="from.state" placeholder="请选择"  style="padding:50px">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
  
        <el-button
          class="searchbtn"
          size="small"
          icon="el-icon-search"
          @click="getPage()"
        >查询</el-button>

        <el-button
          class="searchbtn"
          size="small"
          icon="el-icon-download"
          @click="exportAll()"
        >导出</el-button>
      </div>

 <el-table :data="page">
        <el-table-column  label="身份" prop="roleName" width="700"></el-table-column>
        <el-table-column  label="状态" prop="state" width="700" show-overflow-tooltip>
        <template slot-scope="scope">
						<span v-if="scope.row.state == 1">正常</span>
						<span v-else>异常</span>
					</template>
        </el-table-column>
<el-table-column label="操作"  width="700">
					<template slot-scope="scope">
						<el-button-group>
							<template v-if="scope.row.state == 1">
									<el-button size="small" @click="disableOrRenew(scope)" icon="el-icon-close">禁用</el-button>
							</template>
              <template v-if="scope.row.state == 2">
									<el-button size="small" @click="disableOrRenew(scope)" icon="el-icon-check">恢复</el-button>
							</template>

						</el-button-group>
					</template>
				</el-table-column>


      </el-table>

<el-pagination
        background
        class="paginationbox"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="from.current"
        :page-sizes="[5,10, 15, 20]"
        :page-size="from.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

  </div>
</template>

<script>
import { getRoleList ,reNewOrDisable,exportRole } from "@/utils/api";

export default {
  data () {
    return {
 options: [{
          value: '',
          label: '请选择'
        }, {
          value: 1,
          label: '正常'
        }, {
          value: 2,
          label: '异常'
        }
        ],

      from:{
       size:5,
       current:1,
       state: '',
       roleName:'' 
      },
      total:0,
     page:[]
    }
  },
    created() {
    this.getPage();
  },

  methods: {

 exportAll() {
   window.open('/user_stream/role/export')
    },

    getPage() {
        var that = this;
      getRoleList(that.from).then(function(res) {
        if(200 == res.status) {
        that.page = res.data.data.records;
        that.total=res.data.data.total;
        }
      });
    },
    	//操作
			disableOrRenew(scope) {
				var that = this;
        var adj={roleId: scope.row.roleId,state: scope.row.state}
				reNewOrDisable(adj).then(function(isnot) {
          console.log(isnot);
					if (isnot.data.code == 200) {
						that.getPage();
						that.$message.info("操作成功");
					} else {
						that.$message.error(isnot.data.message);
					}
				});
			},
    
   handleSizeChange(e) {
      this.from.size = e;
      this.getPage();
    },
    handleCurrentChange(e) {
      this.from.current = e;
      this.getPage();
    }

    }
}
</script>


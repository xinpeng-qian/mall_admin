<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search @submit="searchSubmit" :data="categoryLists" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">产品添加</router-link>
    </a-button>
    <!-- 表格 -->
    <productsTable
      :data="tableData"
      :page="page"
      @change="changePage"
      @edit="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import search from '@/components/search.vue';
import productsTable from '@/components/productsTable.vue';
import apiProduct from '@/api/product';
import apiCategory from '@/api/category';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryLists: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true, // 是否可以改变 pageSize
        total: 1,
      },
      categoryObj: {},
    };
  },
  created() {
    this.categoryList(); // 商品类别渲染
    this.getTableData(); // 产品类目渲染
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    categoryList() {
      apiCategory.list().then((res) => {
        this.categoryLists = res.data;
        res.data.forEach((item) => {
          this.categoryObj[item.id] = item.name;
        });
      });
    },
    getTableData() {
      apiProduct
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category],
          }));
          this.page.total = res.total;
        });
    },
    // 子组件翻页数据更新方法
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除：',
        content: () => (
          <div style="color:red;">{`标题为：'${record.title}' 的商品吗？`}</div>
        ),
        onOk: () => {
          apiProduct
            .remove({
              id: record.id,
            })
            .then(() => {
              this.getTableData();
            });
        },
        onCancel() {
        },
        class: 'confirm-box',
      });
    },
  },
  components: {
    search,
    productsTable,
  },
};
</script>

<style lang="less">
.product-list {
  position: relative;
  min-width: 865px;
  .product-add-btn {
    position: absolute;
    top: 20px;
    right: 100px;
  }
}
</style>

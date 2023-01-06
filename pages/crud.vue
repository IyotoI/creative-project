<template>
  <v-row>
    <!-- Formulario -->
    <v-col cols="12">
      <Form :key="key" />
    </v-col>
    <!-- Tabla -->
    <v-col cols="12">
      <div class="container-table">
        <v-data-table
          :headers="table.headers"
          :items="table.items"
          item-key="id"
          :items-per-page="-1"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="selectItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      key: 0,
      table: {
        headers: [
          {
            text: "Nombre",
            align: "start",
            sortable: false,
            value: "name",
          },
          { text: "Correo", value: "email" },
          { text: "Pais", value: "country" },
          { text: "Confirmacion de pais", value: "isTraveler" },
          { text: "Acciones", value: "actions" },
        ],
        items: [],
      },
    };
  },
  methods: {
    selectItem(item) {
      $nuxt.$emit("selectItem", item);
    },
  },
  created() {
    $nuxt.$on("itemTable", (val) => {
      if (this.key === 0) {
        this.key = 1;
      } else {
        this.key = 0;
      }
      if (val.id) {
        // console.log("🚀 ~ file: crud.vue:65 ~ $nuxt.$on ~ val.id", val.id);
        const id = val.id;
        this.table.items.filter((item) => {
          if (item.id === id) {
            console.log(item);
            // item = val;
          }
        });
      } else {
        val.id = this.table.items.length + 1;
        this.table.items.push(val);
      }
    });
    $nuxt.$on("itemUpdate", (val) => {
      this.table.items.forEach((element) => {
        if (element.id === val.id) {
          element.id = val.id;
          element.name = val.name;
          element.email = val.email;
          element.country = val.country;
          element.isTraveler = val.isTraveler;
        }
      });
      // this.table.items.id = val.id
      // this.table.items.name = val.name
      // this.table.items.email = val.email
      // this.table.items.country = val.country
      // this.table.items.isTraveler = val.isTraveler
      // console.log(val);
      // console.log(this.table.items);
    });
  },
};
</script>

<style>
.container-table {
  height: 10px;
  height: 456px;
  overflow: auto;
}
</style>

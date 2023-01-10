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
            <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { CrudController } from "~/controllers/crud.controller";

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
    postCrud: CrudController.post.crud,
    getCrud: CrudController.get.crud,
    putCrud: CrudController.put.crud,
    deleteCrud: CrudController.delete.crud,

    selectItem(item) {
      $nuxt.$emit("selectItem", item);
    },
    deleteItem(id) {
      this.deleteCrud(id);
      this.getData();
    },
    refreshComponent() {
      if (this.key === 0) {
        this.key = 1;
      } else {
        this.key = 0;
      }
    },
    getData() {
      this.table.items = this.getCrud();
    },
  },
  created() {
    this.getData();

    /* Guardar registro */
    $nuxt.$on("itemTable", (val) => {
      this.refreshComponent();
      this.postCrud(val);
      this.table.items = [];
      this.getData();
    });

    /* Actualizar registro*/
    $nuxt.$on("itemUpdate", (val) => {
      this.refreshComponent();
      this.putCrud(val);
      this.getData();
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

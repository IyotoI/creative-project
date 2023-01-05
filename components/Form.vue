<template>
  <v-form ref="form" v-model="isFormValid" @submit.prevent="sendForm(payload)">
    <v-text-field
      v-model="payload.name"
      :counter="10"
      :rules="rules.name"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="payload.email"
      :rules="rules.email"
      label="Correo"
      required
    ></v-text-field>

    <v-select
      v-model="payload.country"
      :items="items.countrys"
      :rules="rules.country"
      label="Pais"
      required
    ></v-select>

    <v-checkbox
      v-model="payload.isTraveler"
      :rules="rules.isTraveler"
      label="¿Selecciono el pais?"
      required
    ></v-checkbox>

    <v-btn :disabled="!isFormValid" color="success" class="mr-4" type="submit">
      Guardar
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: true,
      payload: {
        name: "",
        email: "",
        isTraveler: false,
        country: null,
      },
      items: {
        countrys: ["Colombia", "Argentina", "Peru", "Mexico", "España"],
      },
      rules: {
        name: [
          (v) => !!v || "El nombre es requerido",
          (v) =>
            (v && v.length <= 10) ||
            "El nombre debe tener menos de 10 caracteres",
        ],
        email: [
          (v) => !!v || "El correo es requerido",
          (v) => /.+@.+\..+/.test(v) || "El correo es invalido",
        ],
        isTraveler: [(v) => !!v || "Es necesario llenar la casilla"],
        country: [(v) => !!v || "El pais es requerido"],
      },
    };
  },
  methods: {
    sendForm(payload) {
      $nuxt.$emit("itemTable", payload);
      this.payload = {};
    },
  },
  created() {
    $nuxt.$on("selectItem", (val) => {
      this.payload = val;
    });
  },
};
</script>

<style></style>

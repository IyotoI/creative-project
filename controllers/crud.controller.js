export const CrudController = {
  get: {
    crud: () => {
      const { data } = $nuxt.$store.state.localStorage;
      return data;
    },
  },
  post: {
    crud: (payload) => {
      const { data } = $nuxt.$store.state.localStorage;
      const dataClone = [...data];
      const id = data.length;
      payload.id = id + 1;

      dataClone.push(payload);

      $nuxt.$store.dispatch("localStorage/actUpdateValue", {
        key: "data",
        value: dataClone,
      });

      alert("Registro creado");
    },
  },
  put: {
    crud: (payload) => {
      const { data } = $nuxt.$store.state.localStorage;

      const res = data.map((val) => {
        if (val.id === payload.id) {
          val = payload;
        }

        return val;
      });

      $nuxt.$store.dispatch("localStorage/actUpdateValue", {
        key: "data",
        value: res,
      });

      alert("Registro actualizado");
    },
  },
  delete: {
    crud: (id) => {
      const { data } = $nuxt.$store.state.localStorage;

      if (confirm("Desea eliminar el registro")) {
        const res = data.filter((val) => val.id !== id);

        $nuxt.$store.dispatch("localStorage/actUpdateValue", {
          key: "data",
          value: res,
        });

        alert("Registro eliminado");
      }
    },
  },
};

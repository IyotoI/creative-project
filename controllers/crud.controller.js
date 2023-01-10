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
    },
  },
  put: {
    crud: () => {
      console.log("put crud");
    },
  },
  delete: {
    crud: () => {
      console.log("delete crud");
    },
  },
};

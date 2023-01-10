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
    },
  },
  delete: {
    crud: () => {
      console.log("delete crud");
    },
  },
};

import createStore from "./stateManager.js";

createStore({
  variables: {
    counter: 0,
    name: "Maxim",
  },
  reducers: {
    counter: {
      increment: (value) => value + 1,
      decrement: (value) => value - 1,
    },
    name: {
      setName: (value) => value,
    },
  },
});

Store.counter.onUpdate(
  (v: number) =>
    (document.querySelector("h1").innerHTML =
      `Hi ${Store.name.value} \n value: ${v}`)
);
Store.name.onUpdate(
  (v: number) =>
    (document.querySelector("h1").innerHTML =
      `Hi ${v} \n value: ${Store.counter.value}`)
);

document.querySelector("#a").addEventListener("click", () => {
  Store.counter.increment();
});
document.querySelector("#m").addEventListener("click", () => {
  Store.counter.decrement();
});
document.querySelector("input").addEventListener("input", (e) => {
  Store.name.setName(e.target.value);
});

export default function createStore<T extends ICreateStore>(props: T) {
  const $this: { [key: string | symbol]: any } = window;
  var VariablesKeys = Object.keys(props.variables);
  var ReducersKeys = Object.keys(props.reducers);
  for (let i = 0; i < ReducersKeys.length; i++) {
    if (ReducersKeys[i] !== VariablesKeys[i]) {
      throw new Error(`Undefined reducer: ${ReducersKeys[i]}`);
    }
  }
  Object.defineProperty($this, "Store", {
    value: (function () {
      var obj: { [key: string | symbol]: any } = {};
      VariablesKeys.forEach((key) => {
        obj[key] = {
          value: props.variables[key],
          subs: [],
          onUpdate: function (callback: any) {
            callback($this["Store"][key].value);
            $this["Store"][key].subs.push(callback);
          },
          update: function () {
            if ($this["Store"][key].subs.length > 0) {
              $this["Store"][key].subs.forEach(
                (callback: (args: any) => any) => {
                  callback($this["Store"][key].value);
                }
              );
            }
          },
        };
        Object.keys(props.reducers[key]).forEach((funName) => {
          obj[key][funName] = (args = $this["Store"][key].value) => {
            $this["Store"][key].value = props.reducers[key][funName](args);
            $this["Store"][key].update();
          };
        });
      });

      return obj;
    })(),
    writable: false,
    enumerable: true,
    configurable: false,
  });
}

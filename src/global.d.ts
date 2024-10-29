export {};

// Глобальная переменная Store с типом Record для хранения переменных и их функций
declare global {
  var Store: Record<string | symbol, StoreType<ICreateStore>>;

  // Интерфейс для создания хранилища
  interface ICreateStore {
    variables: { [key: string | symbol]: any };
    reducers: {
      [key in keyof ICreateStore["variables"]]: {
        [action: string]: (
          value: ICreateStore["variables"][key]
        ) => ICreateStore["variables"][key];
      };
    };
  }

  // Тип, описывающий элемент хранилища
  type StoreItem<T = any> = {
    value: T; // Хранимая переменная
    onUpdate: (callback: (value: T) => void) => void; // Функция для обновления значения
    update: () => void; // Обновление всех подписчиков
  };

  // Тип хранилища, связывающий переменные с их редьюсерами
  type StoreType<T extends ICreateStore> = {
    [K in keyof T["variables"]]: StoreItem<T["variables"][K]> & {
      // Функции редьюсера, доступные для каждой переменной
      [A in keyof T["reducers"][K]]: (
        args: T["variables"][K]
      ) => T["variables"][K]; // Убедитесь, что возвращается тип переменной
    };
  };
}

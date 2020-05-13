/**
 * Copia as propriedades de @origin para @destiny que existam
 * nos dois objetos com o mesmo nome.
 * @param origin objeto de origem
 * @param destiny objeto de destino
 */
export function copy<O extends Object, D extends Object> (
  origin: Partial<O>,
  destiny?: D
): void {
  if (!destiny) {
    destiny = {} as D
  }
  const originKeys = Object.getOwnPropertyNames(origin)
  for (let ok of originKeys) {
    if (Reflect.has(destiny, ok)) {
      Reflect.set(destiny, ok, Reflect.get(origin, ok))
    }
  }
}

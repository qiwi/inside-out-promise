export const noop = () => { /* noop */ }

export const alias = (target: any, origin: string, alias: string) => {
  Object.defineProperty(target, alias, {
    get() {
      return target[origin]
    },
  })
}

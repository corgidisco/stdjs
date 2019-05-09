import { ConstructType, MaybePromise } from "./common"

export interface Containable {
  instance<P>(name: PropertyKey, instance: P|Promise<P>): void
  factory<P>(name: PropertyKey, factory: () => P|Promise<P>): ContainerFluent<P>
  bind<P>(name: PropertyKey, constructor: ConstructType<P>): ContainerFluent<P>
  get<P>(name: PropertyKey): Promise<P>
  register(provider: Provider): void
  create<P>(ctor: ConstructType<P>): Promise<P>
  invoke<P, R = any>(instance: P, method: keyof P): Promise<R>
}

export interface ContainerFluent<P> {
  freeze(): ContainerFluent<P>
  singleton(): ContainerFluent<P>
  after(handler: (context: P) => MaybePromise<P>): ContainerFluent<P>
}

export interface Provider {
  register(app: Containable): any
  boot?(app: Containable): any
  close?(app: Containable): any
}

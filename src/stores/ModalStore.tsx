import { makeAutoObservable } from "mobx";
import { BaseStore } from "./BaseStore";

export default class ModalStore {
    baseStore: BaseStore;
    constructor(baseStore: BaseStore) {
        makeAutoObservable(this);
        this.baseStore = baseStore;
    }

    isShowing: boolean = false;

    setShow = (state: boolean) => {
        this.isShowing = state;
    };
}

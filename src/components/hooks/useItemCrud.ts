import { reactive, toRefs } from "vue";
import { useOpenState } from "@/components/hooks/useOpenState";

const { isOpenSlider } = useOpenState();

const state = reactive({
  items: [] as any,
  editedIndex: -1,
  editedItem: {} as any,
  originItem: {} as any,
  editFunction: Function as any,
  deleteFunction: Function as any,
});

function _done() {
  isOpenSlider.value = false;
  state.editedIndex = -1;
  state.editedItem = Object.assign({}, Object);
  state.originItem = Object.assign({}, Object);
}

function processEditItem() {
  if (state.editFunction) {
    state.editFunction(state.editedItem).then(
      (data: any) => {
        if (state.editedIndex === -1) {
          state.items.unshift(data);
        } else {
          Object.assign(state.items[state.editedIndex], data);
        }
        _done();
      },
      (err: any) => {
        console.log(err);
        _done();
      }
    );
  }
}

function processDeleteItem() {
  if (state.deleteFunction) {
    state.deleteFunction(state.editedItem).then(
      () => {
        state.items.splice(state.editedIndex, 1);
        _done();
      },
      (err: any) => {
        console.log(err);
        _done();
      }
    );
  }
}

function startEditItem(item: any, editFunction: Function) {
  state.editedIndex = state.items.indexOf(item);
  state.editedItem = Object.assign({}, item);
  state.originItem = Object.assign({}, item);
  state.editFunction = editFunction;
  isOpenSlider.value = true;
}

function startDeleteItem(item: any, deleteFunction: Function) {
  state.editedIndex = state.items.indexOf(item);
  state.editedItem = Object.assign({}, item);
  state.deleteFunction = deleteFunction;
  processDeleteItem();
}

export function useItemCrud<T>() {
  return {
    ...toRefs(state),
    startEditItem,
    startDeleteItem,
    processEditItem,
    processDeleteItem,
  };
}

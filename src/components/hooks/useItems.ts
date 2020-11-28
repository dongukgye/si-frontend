import { reactive, toRefs } from "vue";
import { useOpenState } from "@/components/hooks/useOpenState";

const { isOpenSlider } = useOpenState();

const state = reactive({
  items: [] as any,
  editedIndex: -1,
  editedItem: {},
  originItem: {},
});

function _closeSlider() {
  isOpenSlider.value = false;
}

function editItem(item: any) {
  state.editedIndex = state.items.indexOf(item);
  state.editedItem = Object.assign({}, item);
  state.originItem = Object.assign({}, item);
  isOpenSlider.value = true;
}

function deleteItem(item: any) {
  // delete item
}

function createSuccess(data: any) {
  state.items.unshift(data);
  // state.items.unshift(response.data)
  // init editedItem and originItem
}

function createFailed() {
  // notice user about create fail
  // restore editedItem to originItem
}

function editSuccess(data: any) {
  Object.assign(state.items[state.editedIndex], data);
  _closeSlider();
  // init editedItem and originItem
}

function editFailed() {
  // notice user about edit fail
  // restore editedItem to originItem
}

function deleteSuccess() {
  // remve editedItem from items
  // init editedItem and originItem
}

function deleteFailed() {
  // notice user about delete fail
  // restore editedItem to originItem
}

export function useItems<T>() {
  return {
    ...toRefs(state),
    editItem,
    deleteItem,
    createSuccess,
    createFailed,
    editSuccess,
    editFailed,
    deleteSuccess,
    deleteFailed,
  };
}

import { reactive, toRefs } from "vue";
import { useOpenState } from "@/components/hooks/useOpenState";

const { isOpenSlider } = useOpenState();

const state = reactive({
  items: [] as any,
  editedIndex: -1,
  editedItem: {},
  originItem: {},
});

function editItem(item: any) {
  state.editedIndex = state.items.indexOf(item);
  state.editedItem = Object.assign({}, item);
  state.originItem = Object.assign({}, item);
  isOpenSlider.value = true;
}

function deleteItem(item: any) {
  // delete item
}

function createSuccess() {
  // state.items.unshift(response.data)
  // init editedItem and originItem
}

function createFailed() {
  // notice user about create fail
  // restore editedItem to originItem
}

function editSuccess(data: any) {
  Object.assign(state.items[state.editedIndex], data);
  isOpenSlider.value = false;
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

export function useItems() {
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

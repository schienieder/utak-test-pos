import { create } from 'zustand';
import app from '../lib/firebaseConfig';
import {
  getDatabase,
  push,
  ref,
  set as setDoc,
  get as getDocs,
  remove as removeDoc,
  onValue,
} from 'firebase/database';
import _ from 'lodash';
import { toast, ToastOptions } from 'react-toastify';

export interface ItemShape {
  itemId?: string;
  itemCategory: string;
  itemName: string;
  itemOptions: string;
  itemPrice: string;
  itemCost: string;
  itemStock: number;
}

export interface ItemStoreShape {
  posItems: ItemShape[];
  filteredItems: ItemShape[];
  currentItem: ItemShape;
  isItemsLoading: boolean;
  isEditing: boolean;
  editItemId: string;
  setCurrentItem(item: ItemShape): void;
  onChangeItemValue(name: string, value: string): void;
  getItems(): Promise<void>;
  createNewItem(): void;
  cancelEditItem(): void;
  updateItem(): void;
  deleteItem(itemId: string): void;
  subscribeItems(): void;
  searchItems(itemText: string): void;
}

const initialCurrentItem = {
  itemCategory: '',
  itemName: '',
  itemOptions: '',
  itemPrice: '',
  itemCost: '',
  itemStock: 0,
};

const toastOptions: ToastOptions = {
  position: 'bottom-left',
};

const useItemStore = create<ItemStoreShape>((set, get) => ({
  posItems: [],
  filteredItems: [],
  currentItem: {
    ...initialCurrentItem,
  },
  isItemsLoading: false,
  isEditing: false,
  editItemId: '',
  setCurrentItem: (item: ItemShape) => {
    const { itemId, ...itemData } = item;

    set({ currentItem: itemData, isEditing: true, editItemId: itemId });
  },
  onChangeItemValue: (name: string, value: string) => {
    const currItem = get().currentItem;

    set({
      currentItem: {
        ...currItem,
        [name]: value,
      },
    });
  },
  getItems: async () => {
    set({ isItemsLoading: true });

    try {
      const db = getDatabase(app);
      const dbRef = ref(db, 'items');
      const snapShot = await getDocs(dbRef);

      if (snapShot.exists()) {
        const items = snapShot.val();
        const formattedItems = Object.keys(items).map((itemId: string) => {
          return {
            ...items[itemId],
            itemId,
          };
        });

        set({
          posItems: formattedItems,
          filteredItems: formattedItems,
          isItemsLoading: false,
        });
        return;
      }

      set({ posItems: [], isItemsLoading: false });
    } catch (e) {
      set({ posItems: [], isItemsLoading: false });
    }
  },
  createNewItem: () => {
    const newItem = get().currentItem;
    const db = getDatabase(app);
    const newItemRef = push(ref(db, 'items'));
    setDoc(newItemRef, newItem)
      .then(() => {
        set({
          currentItem: initialCurrentItem,
        });
        toast.success('Item successfully created', toastOptions);
      })
      .catch(() => {
        toast.error('There was an error creating item', toastOptions);
      });
  },
  cancelEditItem: () =>
    set({ currentItem: initialCurrentItem, isEditing: false, editItemId: '' }),
  updateItem: () => {
    const db = getDatabase(app);
    const updateItemRef = ref(db, 'items/' + get().editItemId);
    setDoc(updateItemRef, {
      ...get().currentItem,
    })
      .then(() => {
        set({
          currentItem: initialCurrentItem,
          isEditing: false,
          editItemId: '',
        });
        toast.success('Item successfully updated', toastOptions);
      })
      .catch(() => {
        toast.error('There was an error updating item', toastOptions);
      });
  },
  deleteItem: (itemId: string) => {
    const db = getDatabase(app);
    const deleteItemRef = ref(db, 'items/' + itemId);
    removeDoc(deleteItemRef)
      .then(() => {
        set({ isEditing: false, currentItem: initialCurrentItem });
        toast.info('Item successfully deleted', toastOptions);
      })
      .catch(() => {
        toast.error('There was an error deleting item', toastOptions);
      });
  },
  subscribeItems: () => {
    const db = getDatabase(app);
    const itemsRef = ref(db, 'items');

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const itemsList = data
        ? Object.keys(data).map((itemId: string) => ({
            ...data[itemId],
            itemId,
          }))
        : [];
      set({ posItems: itemsList, filteredItems: itemsList });
    });
  },
  searchItems: (itemText: string) => {
    const filteredArr = _.filter(get().posItems, (item: ItemShape) => {
      return _.some(_.omit(item, 'itemId'), (value: any) => {
        return _.includes(String(value).toLowerCase(), itemText.toLowerCase());
      });
    });
    set({ filteredItems: filteredArr });
  },
}));

export default useItemStore;

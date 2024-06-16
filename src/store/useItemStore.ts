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
}

const initialCurrentItem = {
  itemCategory: '',
  itemName: '',
  itemOptions: '',
  itemPrice: '',
  itemCost: '',
  itemStock: 0,
};

const useItemStore = create<ItemStoreShape>((set, get) => ({
  posItems: [],
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
      })
      .catch(() => {
        console.log('There was an error creating item');
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
      })
      .catch(() => {
        console.log('There was an error updating item');
      });
  },
  deleteItem: (itemId: string) => {
    const db = getDatabase(app);
    const deleteItemRef = ref(db, 'items/' + itemId);
    removeDoc(deleteItemRef);
    set({ isEditing: false, currentItem: initialCurrentItem });
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
      set({ posItems: itemsList });
    });
  },
}));

export default useItemStore;

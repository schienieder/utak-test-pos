import { create } from 'zustand';
import app from '../lib/firebaseConfig';
import {
  getDatabase,
  push,
  ref,
  set as setDoc,
  get as getDocs,
} from 'firebase/database';

export interface ItemShape {
  itemCategory: string;
  itemName: string;
  itemOptions: string;
  itemPrice: string;
  itemCost: string;
  itemStock: string;
}

export interface ItemStoreShape {
  posItems: ItemShape[];
  currentItem: ItemShape;
  isItemsLoading: boolean;
  setCurrentItem(item: ItemShape): void;
  onChangeItemValue(name: string, value: string): void;
  createNewItem(): void;
  getItems(): Promise<void>;
}

const useItemStore = create<ItemStoreShape>((set, get) => ({
  posItems: [],
  currentItem: {
    itemCategory: '',
    itemName: '',
    itemOptions: '',
    itemPrice: '',
    itemCost: '',
    itemStock: '',
  },
  isItemsLoading: false,
  setCurrentItem: (item: ItemShape) => set({ currentItem: item }),
  onChangeItemValue: (name: string, value: string) => {
    const currItem = get().currentItem;

    set({
      currentItem: {
        ...currItem,
        [name]: value,
      },
    });
  },
  createNewItem: () => {
    const newItem = get().currentItem;
    const db = getDatabase(app);
    const newItemRef = push(ref(db, 'items'));
    setDoc(newItemRef, newItem)
      .then(() => {
        console.log('Successfully created item');
      })
      .catch(() => {
        console.log('There was an error creating item');
      });
  },
  getItems: async () => {
    set({ isItemsLoading: true });

    try {
      const db = getDatabase(app);
      const dbRef = ref(db, 'items');
      const snapShot = await getDocs(dbRef);

      if (snapShot.exists()) {
        set({
          posItems: Object.values(snapShot.val()),
          isItemsLoading: false,
        });
        return;
      }

      set({ posItems: [], isItemsLoading: false });
    } catch (e) {
      set({ posItems: [], isItemsLoading: false });
    }
  },
}));

export default useItemStore;

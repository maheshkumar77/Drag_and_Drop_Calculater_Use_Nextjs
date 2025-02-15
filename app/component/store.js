import { create } from 'zustand';

const useStore = create((set) => ({
  components: [
    { id: '1', value: '7' },
    { id: '2', value: '8' },
    { id: '3', value: '9' },
    { id: '4', value: '/' },
    { id: '5', value: '4' },
    { id: '6', value: '5' },
    { id: '7', value: '6' },
    { id: '8', value: '*' },
    { id: '9', value: '1' },
    { id: '10', value: '2' },
    { id: '11', value: '3' },
    { id: '12', value: '-' },
    { id: '13', value: '0' },
    { id: '14', value: '.' },
    { id: '15', value: '=' },
    { id: '16', value: '+' },
  ],
  addComponent: (component) =>
    set((state) => ({ components: [...state.components, component] })),
  removeComponent: (id) =>
    set((state) => ({ components: state.components.filter((c) => c.id !== id) })),
  reorderComponents: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.components);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { components: result };
    }),
}));

export default useStore;
"use client"
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useStore from './store';

export default function Calculator() {
  const components = useStore((state) => state.components);
  const addComponent = useStore((state) => state.addComponent);
  const removeComponent = useStore((state) => state.removeComponent);
  const reorderComponents = useStore((state) => state.reorderComponents);
  const [display, setDisplay] = useState('');

  const handleButtonClick = (value) => {
    setDisplay(display + value);
  };

  const calculateResult = () => {
    try {
      setDisplay(eval(display).toString());
    } catch {
      setDisplay('Error');
    }
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderComponents(result.source.index, result.destination.index);
  };

  const availableComponents = [
    { id: '17', value: '7' },
    { id: '18', value: '8' },
    { id: '19', value: '9' },
    { id: '20', value: '/' },
    { id: '21', value: '4' },
    { id: '22', value: '5' },
    { id: '23', value: '6' },
    { id: '24', value: '*' },
    { id: '25', value: '1' },
    { id: '26', value: '2' },
    { id: '27', value: '3' },
    { id: '28', value: '-' },
    { id: '29', value: '0' },
    { id: '30', value: '.' },
    { id: '31', value: '=' },
    { id: '32', value: '+' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Calculator Builder</h1>
        <input
          type="text"
          value={display}
          readOnly
          className="w-full p-3 text-right text-2xl bg-gray-100 rounded-lg mb-4"
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="components" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-4 gap-2"
              >
                {components.map((component, index) => (
                  <Draggable key={component.id} draggableId={component.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <button
                          onClick={() => handleButtonClick(component.value)}
                          className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          {component.value}
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          onClick={clearDisplay}
          className="w-full p-3 bg-red-500 text-white rounded-lg mt-4 hover:bg-red-600 transition duration-200"
        >
          Clear
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Add Components</h2>
          <div className="grid grid-cols-4 gap-2">
            {availableComponents.map((component) => (
              <button
                key={component.id}
                onClick={() => addComponent(component)}
                className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
              >
                {component.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
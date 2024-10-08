{
  type Todo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return {
      ...todo,
      ...fieldsToUpdate,
    };
  }

  const todo: Todo = {
    title: 'learn Typescript',
    description: 'study hard',
    label: 'study',
    priority: 'high',
  };

  const updated = updateTodo(todo, {
    description: 'study easy',
    label: 'joy',
  });

  console.log(updated);
}

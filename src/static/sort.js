import axios from 'axios';

export const reorderList = (reorderProps, setListState) => {
	const { route, currentList, result, allLists, listItems, reorderSource } =
		reorderProps;

	const { destination, source, draggableId } = result;

	const listIndex = allLists.findIndex((x) => x.id === currentList.id);

	const movedItemIndex = listItems.findIndex((x) => x.id === draggableId);

	if (!destination) {
		return;
	}
	if (
		destination.droppableId === source.droppableId &&
		destination.index === source.index
	) {
		return;
	}

	const newListOrder = Array.from(listItems);
	newListOrder.splice(source.index, 1);
	newListOrder.splice(destination.index, 0, listItems[movedItemIndex]);

	const reorderedList = {
		...currentList,
		[reorderSource]: newListOrder,
	};

	const newAllList = [...allLists];
	newAllList[listIndex] = reorderedList;
	setListState(newAllList);

	setNewList(reorderedList, route, setListState);
};

export const setNewList = (newList, route, setListState) => {
	axios
		.put(route, newList)
		.then((res) => setListState(res.data))
		.catch((err) => console.error(err));
};

export const alphabetSort = (sortProps, setListState) => {
	const { route, currentList, reorderSource } = sortProps;

	const listItems = [...currentList.games];
	listItems.sort((a, b) => (a.igdbGame.name > b.igdbGame.name ? 1 : -1));
	listItems.forEach((game, i) => (listItems[i].listPosition = i));

	const reorderedList = {
		...currentList,
		[reorderSource]: listItems,
	};

	setNewList(reorderedList, route, setListState);
};

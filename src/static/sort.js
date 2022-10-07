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
	const data = {
		reorderedList: reorderedList,
		parentGameId: reorderedList.parentGameId,
	};

	const newAllList = [...allLists];
	newAllList[listIndex] = reorderedList;
	setListState(newAllList);

	setNewList(data, route, setListState);
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

	const data = {
		reorderedList: reorderedList,
	};

	setNewList(data, route, setListState);
};

export const alphabetCompletedSort = (sortProps, setListState) => {
	const {
		route,
		currentList,
		completedGames,
		incompleteGames,
		reorderSource,
	} = sortProps;
	const listItems = [...incompleteGames];
	listItems.sort((a, b) => (a.igdbGame.name > b.igdbGame.name ? 1 : -1));
	listItems.forEach((game, i) => (listItems[i].listPosition = i));

	const completedItems = [...completedGames];
	completedItems.sort((a, b) => (a.igdbGame.name > b.igdbGame.name ? 1 : -1));
	completedItems.forEach((game, i) => (completedItems[i].listPosition = i));

	const reorderedList = {
		...currentList,
		[reorderSource]: listItems.concat(completedItems),
	};

	const data = {
		reorderedList: reorderedList,
	};

	setNewList(data, route, setListState);
};

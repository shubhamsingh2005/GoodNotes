export const noteColors = [
    { name: 'default', value: 'default', bg: 'bg-white', darkBg: 'dark:bg-gray-800' },
    { name: 'red', value: 'red', bg: 'bg-red-200', darkBg: 'dark:bg-red-900' },
    { name: 'orange', value: 'orange', bg: 'bg-orange-200', darkBg: 'dark:bg-orange-900' },
    { name: 'yellow', value: 'yellow', bg: 'bg-yellow-200', darkBg: 'dark:bg-yellow-900' },
    { name: 'green', value: 'green', bg: 'bg-green-200', darkBg: 'dark:bg-green-900' },
    { name: 'teal', value: 'teal', bg: 'bg-teal-200', darkBg: 'dark:bg-teal-900' },
    { name: 'blue', value: 'blue', bg: 'bg-blue-200', darkBg: 'dark:bg-blue-900' },
    { name: 'purple', value: 'purple', bg: 'bg-purple-200', darkBg: 'dark:bg-purple-900' },
    { name: 'pink', value: 'pink', bg: 'bg-pink-200', darkBg: 'dark:bg-pink-900' },
    { name: 'gray', value: 'gray', bg: 'bg-gray-200', darkBg: 'dark:bg-gray-700' },
];

export const getNoteColorClass = (colorName: string) => {
    const color = noteColors.find(c => c.value === colorName);
    if (!color) return 'bg-white dark:bg-gray-800'; // Default
    return `${color.bg} ${color.darkBg}`;
};

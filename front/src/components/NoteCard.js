import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NoteCard = ({ note, onDelete, onEdit }) => {
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between", children: [_jsx("p", { className: "text-gray-800 dark:text-gray-200", children: note.text }), _jsxs("div", { className: "flex justify-end mt-4 space-x-2", children: [_jsx("button", { className: "bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm", onClick: () => onEdit(note.id, note.text), children: "Edit" }), _jsx("button", { className: "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm", onClick: () => onDelete(note.id), children: "Delete" })] })] }));
};
export default NoteCard;

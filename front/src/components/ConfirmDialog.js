import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ConfirmDialog = ({ open, onClose, onConfirm }) => {
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center", children: [_jsx("h2", { className: "text-xl mb-4 text-gray-800 dark:text-gray-200", children: "Are you sure?" }), _jsxs("div", { className: "flex justify-center space-x-4", children: [_jsx("button", { className: "bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md", onClick: onClose, children: "Cancel" }), _jsx("button", { className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md", onClick: onConfirm, children: "Delete" })] })] }) }));
};
export default ConfirmDialog;
